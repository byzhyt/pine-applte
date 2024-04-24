import { defineConfig } from "vite";
import plugins from "./plugins";

import TransformPages from "uni-read-pages-vite";
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/scss/main.scss';`
      }
    }
  },
  plugins,
  define: {
   _ROUTES: new TransformPages().routes // 注入路由表
  }
});
