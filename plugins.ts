import uni from "@dcloudio/vite-plugin-uni";
import Unocss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";

// 自动导入组件
import Components from "unplugin-vue-components/vite";
export default [
  Unocss(),
  Components({
    dts: true,
    dirs: ["./src/components"]
  }),
  uni(),
  AutoImport({
    dirs: ["./src/utils/*", "./src/stores/*"],
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/ // .md
    ],
    eslintrc: {
      enabled: true,
      globalsPropValue: true
    },
    imports: [
      "vue",
      "uni-app",
      "pinia",
      {
        "uni-mini-router": [
          "createRouter",
          "useRouter",
          "useRoute"
        ]
      }
    ]
  })
];
