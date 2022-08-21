import generate from "html-css-attributes"

const css = generate( document.documentElement.outerHTML )
const styleNode = document.createElement('STYLE')
styleNode.innerText = css
document.querySelector('html > head')?.append(styleNode)