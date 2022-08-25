# [html-css-attributes](https://just-html.dev) &middot; [![GitHub license](https://img.shields.io/github/license/UltraCakeBakery/html-css-attributes.svg)](#LICENSE) [![npm version](https://img.shields.io/npm/v/html-css-attributes.svg?style=flat)](https://www.npmjs.com/package/html-css-attributes) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

If you are already familiar with Tailwind CSS or similar projects, think of html-css-attributes as an **HTML friendly** alternative. html-css-attributes brings a bunch of new **exciting** attributes to your HTML elements that allow you to take your codebase to the **next level**. You will **never** have to write or fallback to CSS ever again! Instead you just configure elements right from the HTML that defines them.

## Features
- 🦾 CSS property attributes - every html element now has an attribute for every CSS property, with support for complex selectors and media queries. [Read more](#documentation)
- 🧑‍🎨 Improved `style` attribute - `style=""` now also has state (`hover:style=""`), media query `@landscape:style=""` [and more variants ](#documentation)
- 🎞️ Added `<animation>` and `<keyframe>` elements - allowing you to define animations in pure HTML
- ✒️ Automatic CDN Font Import - Automatically load fonts from CDN like google fonts through `font-family:google="Roboto"`
- 🏎️ No parsing, no AST, no scanning, it's **PRACTICALLY INSTANT** (1ms average)
- 🤏 ~3kb min+gzip - Zero dependencies and browser friendly.
- 🔌A Vite plugin is available for every framework (with SSR support) (W.I.P)
- 📇 Named groups - For more complex UI and senarios. Simply `group="banana"` and `group-banana:hover:background-color="red"`
- 🛣️ [Shortcuts](#shortcuts) - Add your own boolean attributes for quick prototyping and managing design systems
<!-- - [100.000+ CSS Icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons/) - easily and performantly add icons to your website  -->

## Example
```vue
<html lang="en" font-family:google="Roboto Condensed,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji" -webkit-font-smoothing="antialiased"><head @only-screen:background="red">
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script async="" defer="" src="../packages/runtime/dist/index.global.js"></script>
    </head>
    <body font-weight="400" margin="0" background="#F9F9F9" color="#030303" @max-width-200px:background="green">
        <animation name="example">
            <keyframe frame="from" background-color="red"></keyframe>
            <keyframe frame="to" background-color="green"></keyframe>
        </animation>
        <nav height="80px" font-style="italic">
            <div margin="0px auto" height="inherit" width="1200px" display="flex" align-items="center" justify-content="space-between" flex-direction="row">
                <div color="teal" font-weight="800">CSS-HTML-ATTRIBUTES</div>
                <div display="flex" flex-direction="row" justify-content="center" align-items="center" gap="1rem" children:style="text-decoration: none; color: inherit;font-weight: 500;">
                    <a href="/">Home</a>
                    <a href="/documentation">Documentation</a>
                    <a href="/tutorial">Tutorial</a>
                    <a href="/examples">Components</a>
                </div>
            </div>
        </nav>
        <div animation="example 4s" padding="40px">
            I'm animated by a animation defined through an HTML element!
        </div>
    </body>
</html>
```
```txt
generated css in: 0.0891ms (average of 100_000 runs)
@keyframes example{from{background-color:red}to{background-color:green}}@import 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:italic,:wght@400;800&display=swap';[font-family\:google]{font-family:Roboto Condensed,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}[-webkit-font-smoothing]{-webkit-font-smoothing:antialiased}[font-weight]{font-weight:400}[margin]{margin:0}[background="#F9F9F9"]{background:#F9F9F9}[color]{color:#030303}animation{display:none}[height]{height:80px}[font-style]{font-style:italic}[margin="0px auto"]{margin:0px auto}[height="inherit"]{height:inherit}[width]{width:1200px}[display],[display="flex"]{display:flex}[align-items],[align-items="center"]{align-items:center}[justify-content]{justify-content:space-between}[flex-direction],[flex-direction="row"]{flex-direction:row}[color="teal"]{color:teal}[font-weight="800"]{font-weight:800}[justify-content="center"]{justify-content:center}[gap]{gap:1rem}[children\:style] > *{text-decoration: none; color: inherit;font-weight: 500;}[animation]{animation:example 4s}[padding]{padding:40px}@media only screen{[\@only-screen\:background]{background:red}}@media (max-width: 200px){[\@max-width-200px\:background="green"]{background:green}}
```
<sub>Note: css is automatically minimized (including selector specificness).</sub> 

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

#### Vite (W.I.P)

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

# Documentation
Our documentation / demo website is not yet finished. For now you can read the instructions below. If you have any questions, feel free to raise an issue.

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
Only want to apply a property on smaller screens, when printing the page and/or when dark theme is active? Simply prefix the attribute with the appropriate media-query-prefix.

- `@media only print { display: flex }` -> `<div @print:display="flex"></div>`
- `@media (prefers-color-scheme: dark) { transform: scale(0.5) }` -> `<div @dark:transform="scale(0.5)"></div>`
- `@media (prefers-color-scheme: light) { background: #F0F0F0 }` -> `<div @light:background="#F0F0F0"></div>`
- `@media (orientation: portrait) { overflow: scroll }` -> `<div @portrait:overflow="scroll"></div>`

You can also stack media-query-prefixes like so:

`<div @portrait:@dark:@print:background="inherit"></div>`

## Syntactic sugar
We have also added some shortcuts to make your life easier.

### The `:var` suffix
Allows you to write `<div color:var="theme"></div>` instead of `<div color="var(--theme)"></div>`

### The `:url` suffix
Allows you to write `<div background:url="./background.svg"></div>` instead of `<div background="url('./background.svg')"></div>`

## Configurations
The following options are available on the Vite plugin:

### Shortcuts
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
