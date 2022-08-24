import generate from "html-css-attributes"

const toMatch = /(<style additional-attributes[^>]*>)/

export default function plugin() {
    return {
        name: 'html-css-attributes',
        enforce: 'pre',
        transform(code: string, id: string )
        {
            if ( !toMatch.test(code) ) return 
            const css = generate(code)
            if (css) return code.replace( toMatch, `$1${css}` )
        }
    }
}