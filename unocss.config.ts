import presetWeapp from "unocss-preset-weapp";
import {
  extractorAttributify,
  transformerClass
} from "unocss-preset-weapp/transformer";

const { presetWeappAttributify, transformerAttributify } =
  extractorAttributify();

export default {
  content: {
    pipeline: {
      include: [/\.(vue|ts|js|mdx?|html)($|\?)/]
    }
  },
  presets: [presetWeapp(), presetWeappAttributify()],
  shortcuts: {
    "width-full": "w-full",
    "height-full": "h-full",
    "flex-col": "flex-col flex-row",
    "flex-row": "flex",
    "flex-1": "flex-1",
    "align-center": "items-center",
    "align-start": "items-start",
    "align-end": "items-end",
    "justify-start": "flex-justify-start",
    "justify-center": "flex-justify-center",
    "justify-end": "flex-justify-end",
    "text-h1": "text-20px",
    "text-h2": "text-18px",
    "text-h3": "text-16px",
    "text-h4": "text-14px",
    "radius-full": "border-rounded-100%",
    "radius-11px": "border-rounded-11px",
    "radius-5px": "border-rounded-5px",
    "radius-8px": "border-rounded-8px",
    "radius-14px": "border-rounded-14px"
  },
  theme: {
    colors: {
      h1: "var(--color-h1)",
      h2: "var(--color-h2)",
      h3: "var(--color-h3)",
      line: "var(--color-line)",
      bgc: "var(--el-bg-color)",
      primary: "var(--color-primary)",
      success: "var(--color-success)",
      error: "var(--color-error)",
      warning: "var(--color-warning)",
      info: "var(--color-info)",
      danger: "var(--color-danger)"
    }
  },
  transformers: [transformerAttributify(), transformerClass()]
};
