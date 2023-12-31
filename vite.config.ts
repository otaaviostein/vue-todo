import { defineConfig, loadEnv } from 'vite'
import defaults from './src/composables/defaults.ts'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      Unocss({
        theme: {
          colors: {
            brand: {
              primary: defaults.brand_primary
            }
          }
        }
      })
    ]
  }
})
