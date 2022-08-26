# [cssified-html](https://just-html.dev) &middot; [![GitHub license](https://img.shields.io/github/license/UltraCakeBakery/cssified-html.svg)](#LICENSE) [![npm version](https://img.shields.io/npm/v/cssified-html.svg?style=flat)](https://www.npmjs.com/package/cssified-html) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

If you are already familiar with Tailwind CSS or similar projects, think of cssified-html as an **HTML friendly** alternative. cssified-html brings a bunch of new **exciting** css related elements and attributes to your HTML that allow you to take your codebase to the **next level**. You will **never** have to write or fallback to CSS ever again! Instead you just configure your elements right from the HTML that defines them.

## Features
- 🦾 CSS property attributes - Every html element now has an attribute for every CSS property, with support for complex selectors and media queries. [Read more](#documentation)
- 🧑‍🎨 Improved `style` attribute - `style=""` now also has state (`hover:style=""`), media query `@landscape:style=""` [and more variants ](#documentation)
- ✒️ Automatic CDN Font Import - Automatically load fonts from CDN like google fonts through `font-family:google="Roboto"`
- 🏎️ No parsing, no AST, no scanning, it's **PRACTICALLY INSTANT** (1ms average)
- 🤏 ~3kb min+gzip - Zero dependencies and browser friendly.
- 🔌A Vite plugin is available for every framework (with SSR support) (W.I.P)
- 📇 Named groups - For more complex UI and senarios. Simply `group="banana"` and `group-banana:hover:background-color="red"`
- 🛣️ [Shortcuts](#shortcuts) - Add your own boolean attributes for quick prototyping and managing design systems
<!-- - [100.000+ CSS Icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons/) - easily and performantly add icons to your website  -->

## Example
```vue
<html font-family:google="Roboto, sans-serif">
    <head>
        <title>Example website html</title>
    </head>
    <body margin="0px" background-color="#F0F0F0" @dark:background-color="#020202" @dark:background-color="black">
        <nav display="flex" justify-content="space-between" flex-direction="row" width="100%" height="50px"
            @print:display="none">
            <div children:hover:text-decoration="underline" children:display="inline-block">
                <a href="/home">HOME</a>
                <a href="/about">ABOUT</a>
                <a href="/contact">CONTACT</a>
            </div>
            <div>
                <button border-radius="2rem" hover:background-color="purple" border="none">CALL ME</button>
            </div>
        </nav>
    </body>
</html>
```
```txt
generated css in: 0.0429ms (average of 100_000 runs)
@import 'https://fonts.googleapis.com/css2?family=Roboto&display=swap';[font-family\:google]{font-family:Roboto, sans-serif}[margin]{margin:0px}[background-color]{background-color:#F0F0F0}[display]{display:flex}[justify-content]{justify-content:space-between}[flex-direction]{flex-direction:row}[width]{width:100%}[height]{height:50px}[hover\:children\:text-decoration]:hover > *{text-decoration:underline}[children\:display="inline-block"] > *{display:inline-block}[border-radius]{border-radius:2rem}[hover\:background-color="purple"]:hover{background-color:purple}[border]{border:none}@media (prefers-color-scheme: dark){[\@dark\:background-color="#020202"]{background-color:#020202}[\@dark\:background-color="black"]{background-color:black}}@media print{[\@print\:display="none"]{display:none}}
```
<sub>Note: css is automatically minimized (including selector specificness).</sub> 

###### Disclaimer
> 🧪 `cssified-html` is not yet **production-ready** Expect breaking changes and complete redesigns in the near future.
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
If you want to use the css generator programatically, simply npm install `@cssified-html/core` and `import generator from '@cssified-html/core'.

#### CDN
We do not yet have a recommended CDN.

#### Vite (W.I.P)

```bash
npm install @cssified-html/vite --save-dev
yarn add @cssified-html/vite --save-dev
pnpm install @cssified-html/vite --save-dev
```

```ts
// vite.config.ts
import HTML_CSS_Attributes from '@cssified-html/vite'

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
