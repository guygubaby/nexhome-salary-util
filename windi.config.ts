import { defineConfig } from 'windicss/helpers'
import formPlugin from 'windicss/plugin/forms'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,
  plugins: [formPlugin],
})
