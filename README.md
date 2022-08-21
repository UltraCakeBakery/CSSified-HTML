# [html-css-attributes](https://just-html.dev) &middot; [![GitHub license](https://img.shields.io/github/license/UltraCakeBakery/html-css-attributes.svg)](#LICENSE) [![npm version](https://img.shields.io/npm/v/html-css-attributes.svg?style=flat)](https://www.npmjs.com/package/html-css-attributes) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

`html-css-attributes` - Add every CSS properties as individual attributes on to your html elements

## Example
```html
<html font-family="Times New Roman", Times, serif">
    <head>
        <title>Example website html</title>
    </head>
    <body padding="0px" margin="0px" background-image="url('./background.png')">
        <nav display="flex" justify-content="space-between" flex-direction="row" width="100%" height="50px">
            <div>
                <a href="/home" display="inline-block">HOME</a>
                <a href="/about" display="inline-block">ABOUT</a>
                <a href="/contact" display="inline-block">CONTACT</a>
            </div>
            <div>
                <button border-radius="5px" hover:background-color="purple">CALL ME</button>
            </div>
        </nav>
    </body>
</html>
```
```
generated css (0.232ms):
[padding="0px"]{padding:0px}[margin="0px"]{margin:0px}[background-image="url('./background')"]{background-image:url(}[display="flex"]{display:flex}[justify-content="space-between"]{justify-content:space-between}[flex-direction="row"]{flex-direction:row}[width="100%"]{width:100%}[height="50px"]{height:50px}[display="block"]{display:block}[border-radius="5px"]{border-radius:5px}[hover\:background-color="purple"]:hover{background-color:purple}
```

## Features

Inspired by [UnoCSS](http://github.com/unocss/unocss)

- 🏎️ No parsing, no AST, no scanning, it's **PRACTICALLY INSTANT** (0.617ms generation time on really large components).
- 🤏 ~2kb min+gzip - Zero dependencies and browser friendly.
- 🦾 Added variants to the `style=""` attribute. Now you can do stuff like `@dark-theme:hover:style="background: red; transform: scale(0.98)"
- 📇 Named groups - For more complex UI's
<!-- - [100.000+ CSS Icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons/) - easily and performantly add icons to your website  -->
<!-- - [Shortcuts](#shortcuts) - Add your own boolean attributes for quick prototyping -->

###### Disclaimer
> 🧪 `html-css-attributes` is not yet **production-ready** Expect breaking changes and complete redesigns in the near future.
> We will update this note once we get closer to a stable v1.0 release.

<!-- 
###### Benchmark

```
2022/7/2 08:38:12 PM
1656 utilities | x50 runs (min build time)

none                              5.87 ms / delta.      0.00 ms 
unocss       v0.43.0              9.17 ms / delta.      3.30 ms (x1.00)
tailwindcss  v3.1.4             497.24 ms / delta.    491.37 ms (x148.70)
windicss     v3.5.5             869.47 ms / delta.    863.60 ms (x261.35)
``` -->

## Installation

### CDN
TODO

### Vite

```bash
npm install @html-css-attributes/vite --save-dev
yarn add @html-css-attributes/vite --save-dev
pnpm install @html-css-attributes/vite --save-dev
```

```ts
// vite.config.ts
import HTML_CSS_Attributes from '@html-css-attributes/vite'

export default {
  plugins: [
    HTML_CSS_Attributes(),
  ]
}
```

Add `<style html-css-attributes></style>` to your frameworks components for which you want to generate css:

## Syntactic sugar

TODO: document `:var`
TODO: document `:url`
TODO: document `<variants>:style`

## Configurations

TODO

## Acknowledgement

> in alphabet order

- [ACSS](https://acss.io/)
- [Bootstrap Utilities](https://getbootstrap.com/docs/5.1/utilities/flex/)
- [Chakra UI Style Props](https://chakra-ui.com/docs/features/style-props)
- [Semantic UI](https://semantic-ui.com/)
- [Tachyons](https://tachyons.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Twind](https://github.com/tw-in-js/twind)
- [UnoCSS](http://github.com/unocss/unocss)
- [Windi CSS](http://windicss.org/)


## License

[MIT](./LICENSE) License &copy; 2022 [Jack van der Bilt](https://github.com/ultracakebakery)
