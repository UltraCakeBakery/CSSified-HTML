import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import attributes from '../../packages/vite/dist/index.js'

// https://vitejs.dev/config/
export default defineConfig(
  {
      plugins: [
        attributes(),
        svelte()
      ]
  }
)
