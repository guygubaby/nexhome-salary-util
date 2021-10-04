import Vue from '@vitejs/plugin-vue'
import path from 'path'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import ViteComponents from 'vite-plugin-components'
import styleImport from 'vite-plugin-style-import'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  base: '/starnet-salary/',
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
    ViteComponents({
      dirs: ['src/components'],
      extensions: ['vue'],
      // generate `components.d.ts` for ts support with Volar
      globalComponentsDeclaration: true,
      // auto import icons
      customComponentResolvers: IconsResolver({
        componentPrefix: '',
      }),
    }),
    Icons(),
    WindiCSS(),
  ],
  server: {
    port: 8080,
    fs: {
      strict: true,
    },
    proxy: {
      '/api': {
        target: 'http://hr.star-net.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core', 'mitt', 'axios'],
  },
})
