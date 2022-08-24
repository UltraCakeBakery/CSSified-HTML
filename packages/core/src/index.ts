import type { Map } from './types'
import propertyWhitelist from './propertyWhitelist.json'

// TODO: implement https://stackoverflow.com/questions/37003623/how-to-capture-multiple-repeated-groups

export const elementsRegex = /<(?![\/!])(?:([\w:]*)[ ]?(.*?))>/gm
export const attributeRegex = /([a-zA-Z0-9-_@:]*?)=["]([^"]*)/gm

export function escapeSelector( value: string ) {
    return value.replaceAll(':', '\\:').replaceAll('@', '\\@')
}

export function getMap( html: string, map: Map = {} )
{
    // Populate `map` instead of initializing a new map so users can pass their own object
    map.imports ??= []
    map.fonts ??= {}
    map.medias ??= {}
    map.propertyCounts ??= {}

    // Iterate over every html element in the html string
    for ( let element of html.matchAll(elementsRegex) )
    {
        let [ elementMatch, tag, attributes ] = element

        if( !attributes.length ) continue
        
        const elementAttributes = attributes.matchAll(attributeRegex)

        if( tag !== 'animation')
        {
            for ( let [_attributeMatch, attributeName, attributeValue] of elementAttributes )
            {
                if ( !attributeValue || attributeName === 'content' ) continue
                
                const prefixes = attributeName.split( ':' )
                let suffix = null
                let property = prefixes.pop() as string
                let propertyValue = attributeValue
                
                // Check attributeName is suffixed, and if so update `suffix` and `property` accordingly
                if ( prefixes.length > 0 && propertyWhitelist.indexOf( property ) === -1 && property[0] !== '-' )
                {
                    suffix = property 
                    property = prefixes.pop() as string
                }
                
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
                        map.fonts[propertyValue.substring(0, propertyValue.indexOf(',')).replaceAll(' ', '+')] = { 
                            weights: new Set(), 
                            styles: new Set()
                        }
                        suffix = null
                    }
                    else if( Object.keys(map.fonts).length )
                    {
                        for( const key of Object.keys(map.fonts)) map.fonts[key]?.[property.substring(5)+'s']?.add( propertyValue )
                    }
                }
    
                // Wrap the value based on suffix
                if ( suffix !== null )
                {
                    if ( suffix === 'url' ) propertyValue = `url('${propertyValue}')`
                    else if ( suffix === 'var' ) propertyValue = `var(--${propertyValue})`
                    else propertyValue = `${suffix}(${propertyValue})`
                } else if ( property === 'content' ) propertyValue = `'${propertyValue}'`
                
                // TODO: improve escapeSelector performance (twice as slow as it needs to be)
                // Create object representing a css rule for `map`
                const rule = {
                    wrappingMediaQuery: { display: null, conditions: '' } as { [key: string]: null | string },
                    selector: `[${escapeSelector(attributeName)}${map.propertyCounts[property] > 0 ? `="${attributeValue}"` : ''}]`
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
                
                const key = property !== 'style' ? `${property}:${propertyValue}` : propertyValue
                
                // Populate map
                map.medias[mediaQueryString] ??= {}
                map.medias[mediaQueryString][key] ??= []
                map.medias[mediaQueryString][key].push(rule.selector)
                map.propertyCounts[property] = map.propertyCounts[property] || 0 + 1
            }
        }
        else // <animation> element handler
        {
            let animationElement = element.input?.substring(element.index ?? 0 + elementMatch.length)
            animationElement = animationElement?.substring(0, animationElement.indexOf('</animation>'))
        }
    }

    return map
}

export function getCSS( map: Map = {} )
{
    let css = ''

    for( const _import of map.imports || [] ) css += `@import '${_import}';`

    for( let [font, { styles, weights }] of Object.entries( map.fonts|| [] ) )
    {
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