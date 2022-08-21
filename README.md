# [html-css-attributes](https://just-html.dev) &middot; [![GitHub license](https://img.shields.io/github/license/UltraCakeBakery/html-css-attributes.svg)](#LICENSE) [![npm version](https://img.shields.io/npm/v/html-css-attributes.svg?style=flat)](https://www.npmjs.com/package/html-css-attributes) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

`html-css-attributes` - Don't write CSS. Simply add attributes to your HTML elements instead. With this library / vite-plugin you can add every CSS property to your html elements through their own unique attributes. We've also upgraded the `style=""` attribute allowing you to style based on state and media queries like so: `@dark:hover:style="background: red;"`. In other words; you can now style your pages without _truely_ never leaving your html.

## Features

- 🏎️ No parsing, no AST, no scanning, it's **PRACTICALLY INSTANT** (0.617ms generation time on really large components).
- 🤏 ~2kb min+gzip - Zero dependencies and browser friendly.
- 🦾 Added variants to the `style=""` attribute. Now you can do stuff like `@dark-theme:hover:style="background: red; transform: scale(0.98)"
- 📇 Named groups - For more complex UI's
- 🔌Vite plugin for every framework (W.I.P)
<!-- - [100.000+ CSS Icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons/) - easily and performantly add icons to your website  -->
<!-- - [Shortcuts](#shortcuts) - Add your own boolean attributes for quick prototyping -->


## Example
```vue
<html font-family="'Times New Roman', Times, serif">
    <head>
        <title>Example website html</title>
    </head>
    <body margin="0px" background-color="#F0F0F0" @dark:background-color="#020202" @dark:@high-contrast:background-color="black">
        <nav display="flex" justify-content="space-between" flex-direction="row" width="100%" height="50px" @print:display="none">
            <div hover:children:text-decoration="underline">
                <a href="/home" display="inline-block">HOME</a>
                <a href="/about" display="inline-block">ABOUT</a>
                <a href="/contact" display="inline-block">CONTACT</a>
            </div>
            <div>
                <button border-radius="2rem" hover:background-color="purple" border="none">CALL ME</button>
            </div>
        </nav>
    </body>
</html>
```
```
generated css in 0.0385 milliseconds (average of 1_000_000 total runs):
[font-family="Times New Roman, Times, serif"]{font-family:Times New Roman, Times, serif}[padding="0px"]{padding:0px}[margin="0px"]{margin:0px}[background-image="url('./background.png')"]{background-image:url('./background.png')}[\:width="123px"],[group="apple"] [group-apple\:width="123px"]{width:123px}[display="flex"]{display:flex}[justify-content="space-between"]{justify-content:space-between}[flex-direction="row"]{flex-direction:row}[width="100%"]{width:100%}[height="50px"]{height:50px}[display="inline-block"]{display:inline-block}[\:background="red"]{background:red}[border-radius="5px"]{border-radius:5px}[\:background-color="purple"],[background-color="purple"]{background-color:purple}[\:background-color="red"],[background-color="red"]{background-color:red}@media only print{[\@print\:background="red"]{background:red}}@media (prefers-color-scheme: dark){[\@dark\:background-color="red"]{background-color:red}}
```

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

## Getting Started
If you want to use the css generator programatically, simply npm install `@html-css-attributes/core` and `import generator from '@html-css-attributes/core'.

#### CDN
We do not yet have a recommended CDN.

#### Vite

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

# Documentation
`html-css-attributes` makes a bunch of css related optionally configurable attributes available to all your html elements.

## CSS properties
We have made a new attribute for every CSS property available on your HTML elements with an identical name to their corresponding css property.
For example:

- `display: flex` -> `<div display="flex"></div>`
- `transform: scale(0.5)` -> `<div transform="scale(0.5)"></div>`
- `background: #F0F0F0` -> `<div background="#F0F0F0"></div>`
- `overflow: scroll` -> `<div overflow="scroll"></div>`

## Variants
TODO: add example explaining basics and advanced use cases like: 
`hover:active:children:before:background="red"`

## Media Queries
Only want to apply a property on smaller screens, when printing the page or when dark theme is active? Simply prefix the attribute with the appropriate media-query-prefix.

- `@media only print { display: flex }` -> `<div @print:display="flex"></div>`
- `@media (prefers-color-scheme: dark) { transform: scale(0.5) }` -> `<div @dark:transform="scale(0.5)"></div>`
- `@media (prefers-color-scheme: light) { background: #F0F0F0 }` -> `<div @light:background="#F0F0F0"></div>`
- `@media (orientation: portrait) { overflow: scroll }` -> `<div @portrait:overflow="scroll"></div>`



## Syntactic sugar
We have also added some shortcuts to make your life easier.

### the `:var` suffix
Allows you to write `<div color:var="theme"></div>` instead of `<div color="var(--theme)"></div>`

### the `:url` suffix
Allows you to write `<div background:url="./background.svg"></div>` instead of `<div background="url('./background.svg')"></div>`

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
