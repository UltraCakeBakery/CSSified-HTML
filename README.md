# [CSSified-HTML](https://just-html.dev) &middot; [![GitHub license](https://img.shields.io/github/license/UltraCakeBakery/CSSified-HTML.svg)](#LICENSE) [![npm version](https://img.shields.io/npm/v/CSSified-HTML.svg?style=flat)](https://www.npmjs.com/package/CSSified-HTML) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

CSSified-HTML is a **HTML friendly** alternative to [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) (Cascading Style Sheets) and utility frameworks like [Tailwind](https://github.com/tailwindlabs/tailwindcss) / [UnoCSS](https://github.com/unocss/unocss). CSSified-HTML adds new elements to your HTML, and new attributes to already existing HTML elements, that allow you to **never** have a `*.css|scss|sass|less|pcss` file in your codebase ever again! Instead you just configure your elements in the same markup that defines them, and use the new elements to define `<keyframe>`'s, ~`<mixin>`'s, @`<media>` queries~ and more!

## Features
- 🦾 CSS property attributes - Every html element now has an attribute for **every** CSS property, with support for complex selectors and media queries. Check the [documentation](#documentation) for examples and syntax instructions.
- 🧑‍🎨 **Improved** `style` attribute - `style=""` now also has state (`hover:style=""`), media query (`@landscape:style=""`) and [more variants](#documentation).
- 🎞️ **New** `<animation>` and `<keyframe>` elements - Define complex `@keyframes` directly in your HTML.
- ✒️ **Automatic** CDN Fonts - Automatically `@import` fonts from a CDN (fonts.google.com) through `font-family:google="Roboto"`.
- 🏎️ **Incredible performance** - CSS generation is **PRACTICALLY INSTANT** at **0.15ms** on average.
- 🤏 ~2.7kb min+gzip - Zero dependencies and browser friendly (any browser past > ie8).
- 🔌A **Vite plugin** is available for every framework (with **SSR** and **no-javascript** support).
- 📇 Named groups - For more **complex** UIs. Simply `group="banana"` and `group-banana:hover:background-color="red"`.
- 🛣️ ~[Shortcuts](#shortcuts) - Add your own boolean attributes for quick prototyping and managing design systems~ W.I.P.
<!-- - [100.000+ CSS Icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons/) - easily and performantly add icons to your website  -->

## Example
```html
<html font-family:google="Roboto Condensed, sans-serif">
    <head>
        <title>Example</title>
    </head>
    <body margin="0" background-color="white" color="#030303" @dark:style="background-color: black; color: #fff;">
        <media-query name="dark" query="prefers-color-scheme: dark" />
        <animation name="example">
            <keyframe frame="from" background-color="red"></keyframe>
            <keyframe frame="to" background-color="green"></keyframe>
        </animation>
        <nav height="80px">
            <div margin="0px auto" display="flex" align-items="center" justify-content="space-between" flex-direction="row" height="inherit" width="1200px">
                <div color="#EE0000" font-weight="800">CSS-HTML-ATTRIBUTES</div>
                <div display="flex" gap="1rem" justify-content="center" flex-direction="row" align-items="center" children:style="text-decoration: none; color: inherit;font-weight: 500;">
                    <a href="/">Home</a>
                    <a href="/documentation">Documentation</a>
                    <a href="/tutorial">Tutorial</a>
                    <a href="/examples">Components</a>
                </div>
            </div>
        </nav>
        <div animation="example 4s infinite" padding="40px">
            I'm animated by a animation defined through HTML element!
        </div>
    </body>
</html>
```

```css
/** generated css in: 0.0755ms (average of 100_000 runs) */
@import 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@800&display=swap';@keyframes example{from{background-color:red}to{background-color:green}}[font-family\:google]{font-family:Roboto Condensed, sans-serif}[margin]{margin:0}[background-color]{background-color:white}[color]{color:#030303}[height]{height:80px}[margin="0px auto"]{margin:0px auto}[display],[display="flex"]{display:flex}[align-items],[align-items="center"]{align-items:center}[justify-content]{justify-content:space-between}[flex-direction],[flex-direction="row"]{flex-direction:row}[height="inherit"]{height:inherit}[width]{width:1200px}[color="#EE0000"]{color:#EE0000}[font-weight]{font-weight:800}[gap]{gap:1rem}[justify-content="center"]{justify-content:center}[children\:style="text-decoration: none; color: inherit;font-weight: 500;"] > *{text-decoration: none; color: inherit;font-weight: 500;}animation{display:none}[animation]{animation:example 4s infinite}[padding]{padding:40px}@media (prefers-color-scheme: dark){[\@dark\:style]{background-color: black; color: #fff;}}
```
<sub>Note: css is automatically minimized, including selector specificness but not values.</sub> 

###### Disclaimer
> 🧪 _CSSified-HTML_ is still in active development. Though the generator is usable and stable, our vite plugin is not. We do not recommend using it in production as major refactors are on its way to the codebase, which will introduce breaking changes to your project.

## Getting Started
If you want to use the css generator programatically, you can `import generator from '@CSSified-HTML/core'`. Using the generator you can generate css for any html, like so: `generator('<div background-color="orange"></div>')`. 

#### CDN
We do not (yet) have a recommended CDN.

#### Vite
Our vite plugin is not yet finished, but there is an experimental one available.

To get started... 

1. Install the vite plugin with your package manager of choice:

```bash
npm install @CSSified-HTML/vite --save-dev
yarn add @CSSified-HTML/vite --save-dev
pnpm install @CSSified-HTML/vite --save-dev
```

2. Add the plugin to your `vite.config.js`:

```ts
// vite.config.ts
import CSSifiedHTML from '@CSSified-HTML/vite'

export default {
  plugins: [
    CSSifiedHTML(),
  ]
}
```

3. Import the virtually generated css file in your entry point (main.js) or primary layout component (+layout.svelte, layout.vue, layout.blade.php, etc)

```js
// main.js
import 'CSSified-HTML.css'
```

```html
<!-- component -->
<script>
    import 'CSSified-HTML.css'
</script>
```

# Documentation
We do not yet have a website. For now you can read the not-so-in-depth instructions below. If you have any questions, feel free to raise an issue.

## CSS properties
For every CSS property there is now a attribute that you can add to any html element. The name of the attributes are the same as their corosponding CSS properties.

Here are some basic examples:
- `display: flex` -> `<div display="flex"></div>`
- `transform: scale(0.5)` -> `<div transform="scale(0.5)"></div>`
- `background: #F0F0F0` -> `<div background="#F0F0F0"></div>`
- `overflow: scroll` -> `<div overflow="scroll"></div>`

## States
If you want a property to only apply on `:hover` you can just prefix the attribute with `hover:`, like so:
- `div:hover { transform: scale(0.5) }` -> `<div hover:transform="scale(0.5)"></div>`
- `div:hover { background: #F0F0F0 }` -> `<div hover:background="#F0F0F0"></div>`

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

### `:calc`, `:attr` and other suffixes `:$1`
Any other suffix you place behind a property will wrap the attribute value to `$1(<value>)`. 

Examples: 
- `<div width:calc="10px + 20px">` -> `width: calc(10px + 20px)`
- `<div width:banana="10px + 20px">` -> `width: banana(10px + 20px)` // This does not work, but this is expected behavior. We wrap everything!

## Configurations
The following options are available on the Vite plugin:

### Shortcuts
TODO: write docs

## Acknowledgements

> in alphabetical order, based on UnoCSS's "Acknowledgement" list.

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
