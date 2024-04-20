import vue from "@vitejs/plugin-vue";
import {defineConfig} from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/api": '/src/api',
      "@/assets": '/src/assets',
      "@/components": '/src/components',
      "@/helpers": '/src/helpers',
      "@/hooks": '/hooks',
      "@/views": '/src/views'
    }
  }
})
