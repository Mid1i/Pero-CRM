import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": "/src/",
      "@/assets": '/src/assets',
      "@/blocks": '/src/blocks',
      "@/components": '/src/components',
      "@/composables": '/src/composables',
      "@/helpers": '/src/helpers',
      "@/layouts": '/src/layouts',
      "@/plugins": '/src/plugins',
      "@/router": '/src/router',
      "@/types": '/src/types',
      "@/views": '/src/views'
    }
  }
})
