import generate from "cssified-html"

const toMatch = /(<style cssified-html[^>]*>)/

export default function plugin() {
    return {
        name: 'cssified-html',
        enforce: 'pre',
        transform(code: string, id: string )
        {
            if ( !toMatch.test( code ) ) return 
            const css = generate(code)
            if (css) return code.replace( toMatch, `$1${css}` )
        }
    }
}