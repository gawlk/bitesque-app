import autoprefixer from 'autoprefixer'
// @ts-ignore
import netlify from 'solid-start-netlify'
import solid from 'solid-start/vite'
import tailwindcss from 'tailwindcss'
import unpluginAutoImport from 'unplugin-auto-import/vite'
import unpluginIconsResolver from 'unplugin-icons/resolver'
import unpluginIcons from 'unplugin-icons/vite'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import solidSvg from 'vite-plugin-solid-svg'

export default defineConfig({
  plugins: [
    solid({
      // Islands
      // Blog post: https://dev.to/this-is-learning/client-side-routing-without-the-javascript-3k1i
      // Example: https://github.com/solidjs/solid-start/tree/movies/examples/movies
      // islands: true,
      // islandsRouter: true,
      // https://github.com/solidjs/solid-hackernews/tree/netlify/src
      adapter: netlify({
        // edge: true,
      }),
    }),

    solidSvg(),

    unpluginAutoImport({
      imports: ['solid-js', '@solidjs/router'],
      dts: './src/auto-imports.d.ts',
      resolvers: [
        unpluginIconsResolver({
          prefix: 'Icon',
          extension: 'jsx',
        }),
      ],
    }),

    unpluginIcons({ autoInstall: true, compiler: 'solid' }),
  ],
  resolve: {
    alias: {
      '/src': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer(), tailwindcss()],
    },
  },
})
