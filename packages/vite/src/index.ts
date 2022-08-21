import generate from "html-css-attributes"

const toMatch = /(<style additional-attributes[^>]*>)/

export default function plugin() {
    return {
        name: 'additional-css-attributes-for-html-elements',
        enforce: 'pre',
        transform(code: string, id: string )
        {
            if ( !toMatch.test(code) ) return 
            console.time('generated css')
            const css = generate(code)
            console.timeEnd('generated css')
            if (css) return code.replace( toMatch, `$1${css}` )
        }
    }
}