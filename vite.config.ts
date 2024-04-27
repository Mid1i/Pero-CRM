import vue from "@vitejs/plugin-vue";
import {defineConfig} from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/assets": '/src/assets',
      "@/components": '/src/components',
      "@/composables": '/src/composables',
      "@/helpers": '/src/helpers',
      "@/layouts": '/src/layouts',
      "@/plugins": '/src/plugins',
      "@/router": '/src/router',
      "@/views": '/src/views'
    }
  }
})
