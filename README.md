# Lightweight Web Starter

## Features

- ⚡️ [Vue 3](https://github.com/vuejs/vue-next), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness

- 🦾  TypeScript, of course

- 📦  [Components auto importing](/src/components/README.md)

- 🎨  [Windi CSS](https://github.com/windicss/windicss) - next generation utility-first CSS framework

- 😃  Use [icons](/src/components/README.md) from any icon sets, with no compromise

- 🔥  Use the new [setup script](https://github.com/vuejs/rfcs/pull/227) style

## Pre-packed

### Icons

- [Iconify](https://iconify.design/) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
- [vite-plugin-icons](https://github.com/antfu/vite-plugin-icons) - icons as Vue components

### Plugins
- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs
- [@vueuse/head](https://github.com/vueuse/head) - manipulate document head reactively
- [Vue Router](https://github.com/vuejs/vue-router)
- [Pinia](https://pinia.esm.dev/) - A store library for Vue, it allows you to share a state across components/pages
- [vite-plugin-components](https://github.com/antfu/vite-plugin-components) - components auto import

### Coding Style
- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org/) with [@nexhome/standard](https://www.npmjs.com/package/@nexhome/standard), single quotes, no semi.

### Dev Tools
- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager
- VS Code Extensions
    - [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - Vue 3 `<script setup>` IDE support
    - [Windi CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) - IDE support for Windi CSS
    - [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)


## FAQs

1. How to use icons from Iconify
    - go to [this page](https://icones.netlify.app/collection/all)
    - search for icon you want
    - click the icon made you flipped
    - click the copy besides the icon name
    - use it as a component like this `<mdi:cards-heart />`

2. Is setup script better?

    - No, but this just make your component looks more clear

## Try it now!

```bash
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
pnpm start
```
