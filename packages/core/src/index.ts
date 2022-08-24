import type { Map, ValidatedElement, ValidatedAttribute } from './types'
import propertyWhitelist from './propertyWhitelist.json'

// TODO: implement https://stackoverflow.com/questions/37003623/how-to-capture-multiple-repeated-groups

export const elementsRegex = /<(?![\/!])(?:([\w:]*)[ ]?(.*?))>/gm
export const attributeRegex = /([a-zA-Z0-9-_@:]*?)=["]([^"]*)/gm

export function escapeSelector( value: string ) {
    return value.replaceAll(':', '\\:').replaceAll('@', '\\@')
}

export function validateElement( [_, tag, attributes ] : RegExpMatchArray ) : ValidatedElement | false
{    
    if( !attributes.length ) return false
    
    return { 
        tag, 
        attributes: [...attributes.matchAll(attributeRegex)].map(validateAttribute).filter(Boolean) as ValidatedAttribute[]
    }
}

export function validateAttribute( [_, name, value ]: RegExpMatchArray ) : ValidatedAttribute | false
{
    if ( !value.length || name === 'content' ) return false
    
    const prefixes = name.split( ':' )
    let suffix = null
    let property = prefixes.pop() as string
    
    // Is `name` is suffixed? update `suffix` and `property` accordingly.
    if ( prefixes.length > 0 && propertyWhitelist.indexOf( property ) === -1 && property[0] !== '-' )
    {
        suffix = property 
        property = prefixes.pop() as string
    }
    
    if ( suffix === 'var' ) value = `var(--${value})`
    else if ( suffix === 'url' ) value = `url('${value}')`
    else if ( property === 'content' ) value = `'${value}'`
    else if ( suffix && suffix !== 'google' ) value = `${suffix}(${value})`

    return { 
        name, 
        value, 
        property, 
        suffix, 
        prefixes 
    }
}

// TODO:
export function registerFontInMap( attributeMeta: any )
{

}

// TODO:
export function generateSelector( attributeMeta: any )
{

}

export function getMap( html: string, map: Map = {} )
{
    // Populate `map` instead of initializing a new map so users can pass their own object
    map.imports ??= []
    map.medias ??= {}
    map.animations ??= {}
    map.fonts ??= {}
    map.propertyCounts ??= {}

    // Iterate over every html element in the html string
    let lastAnimation = null 
    for ( let element of [...html.matchAll(elementsRegex)].map(validateElement).filter(Boolean) as ValidatedElement[] )
    {        
        const { tag: elementTag, attributes: elementAttributes } = element
        
        if( elementTag === 'animation' )
        {
            lastAnimation = element

            map.medias['']['display:none'] ??= []
            if (map.medias['']['display:none'].indexOf('animation') === -1) map.medias['']['display:none'].push('animation')
        }

        for ( let { name, value, property,  prefixes, suffix } of elementAttributes )
        {            
            // Continue if regular style (<div style="">) attribute
            if ( property === 'style' && !prefixes.length ) continue
            
            // Continue if property is not on the whitelist
            // AND if it is also not a custom css property or prefixed property 
            if ( propertyWhitelist.indexOf( property ) === -1 && property[0] !== '-' ) continue
            
            // Special mapping procedure for fonts to allow importing from CDN in in `getCss` function
            if( property.startsWith('font'))
            {
                if ( property === 'font-family' )
                {
                    property = property.substring(0, 11)
                    map.fonts[value.substring(0, value.indexOf(',')).replaceAll(' ', '+')] = { 
                        weights: new Set(), 
                        styles: new Set(),
                        cdn: suffix ?? ''
                    }
                }
                else if( Object.keys(map.fonts).length )
                {
                    for( const key of Object.keys(map.fonts)) (map.fonts[key]?.[property.substring(5)+'s'] as Set<string>)?.add( value )
                }
            }

            // TODO: improve escapeSelector performance (twice as slow as it needs to be)
            // Create object representing a css rule for `map`
            const rule = {
                wrappingMediaQuery: { display: null, conditions: '' } as { [key: string]: null | string },
                selector: `[${escapeSelector(name)}${map.propertyCounts[property] > 0 ? `="${value}"` : ''}]`
            }
            
            // Iterate over every `prefixes` to populate `rule`
            let addToSelectorAfterwards = null
            for ( const prefix of prefixes )
            {
                if ( prefix[0] === '@' )
                {
                    if ( prefix === '@screen' ) rule.wrappingMediaQuery.display = 'screen'
                    else if ( prefix === '@print' ) rule.wrappingMediaQuery.display = 'print'
                    else if ( prefix === '@dark' ) rule.wrappingMediaQuery.conditions += '(prefers-color-scheme: dark)'
                    else if ( prefix === '@light' ) rule.wrappingMediaQuery.conditions += '(prefers-color-scheme: light)'
                    else if ( prefix.startsWith('@only-') ) rule.wrappingMediaQuery.display = 'only ' + prefix.substring(6)
                    else 
                    {
                        const lastDashIndex = prefix.lastIndexOf('-')
                        rule.wrappingMediaQuery.conditions += `(${prefix.substring(1, lastDashIndex)}: ${prefix.substring(lastDashIndex + 1)})`
                    }
                }
                else if ( prefix.startsWith('nth-child') ) rule.selector += ':nth-child-' + prefix.substring(9)
                else if ( prefix.startsWith('nth-of-type') ) rule.selector += ':nth-of-type-' + prefix.substring(12)
                else if ( prefix === 'children' ) rule.selector += ' > *'
                else if ( prefix === 'sibling' ) rule.selector += ' + *'
                else if ( prefix === 'siblings' ) rule.selector += ' ~ *'
                else if ( prefix.startsWith( 'group-' ) )
                {
                    addToSelectorAfterwards = rule.selector
                    rule.selector = `[group="${prefix.substring(6)}"]`
                }
                else rule.selector += `:${prefix}`
            }
            if ( addToSelectorAfterwards ) rule.selector += ` ${addToSelectorAfterwards}`
    
            // pre-build mediaQuery for easier mapping
            // TODO: move this to `getCss`
            let mediaQueryString;
            if ( rule.wrappingMediaQuery.display )
            {
                mediaQueryString = rule.wrappingMediaQuery.display as string
                if ( (rule.wrappingMediaQuery.conditions as string).length ) mediaQueryString += ` and ${rule.wrappingMediaQuery.conditions}`
            }
            else mediaQueryString = rule.wrappingMediaQuery.conditions as string || ''
            
            const key = property !== 'style' ? `${property}:${value}` : value
            
            // Populate map
            map.medias[mediaQueryString] ??= {}
            map.medias[mediaQueryString][key] ??= []
            map.medias[mediaQueryString][key].push(rule.selector)
            map.propertyCounts[property] = map.propertyCounts[property] || 0 + 1
        }
    }

    return map
}

export function getCSS( map: Map = {} )
{
    let css = ''

    for( const _import of map.imports || [] ) css += `@import '${_import}';`

    for( let [font, { styles, weights, cdn }] of Object.entries( map.fonts|| [] ) )
    {
        if ( cdn !== 'google' ) continue
        let _styles: string[] = Array.from(styles as Set<string>)
        let _weights: string[] = Array.from(weights as Set<string>)
        css += `@import 'https://fonts.googleapis.com/css2?family=${font}${_styles.length ? ':' + _styles.join(',') + ',' : ''}${_weights.length ? `:wght@${_weights.join(';')}` : ''}&display=swap';`.replaceAll('::', ':')
    }

    for ( const [ media, valuesAndTheirSelectors ] of Object.entries( map.medias|| [] ) )
    {
        if ( media ) css += `@media ${media}{`

        for ( const [ value, selectors ] of Object.entries( valuesAndTheirSelectors as {}) ) css += `${[ ...new Set( selectors as [] ) ]}{${value}}`

        if ( media ) css += '}'
    }

    return css
}

export default function generate( html: string )
{    
    const map = getMap( html )
    return getCSS( map )

}