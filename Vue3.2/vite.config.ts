import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
// element-plus的按需导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      // 导入全局使用的less
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            "src/assets/style/main.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 9999,
    host: "0.0.0.0",
    https: false,
    open: true,
    // 允许跨域
    cors: true,
  },
});
