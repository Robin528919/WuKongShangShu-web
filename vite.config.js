import { defineConfig, loadEnv } from "vite";
import path from "path";
import createVitePlugins from "./vite/plugins";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === "production" ? "/" : "/",
    plugins: [
      {
        name: "inject-build-time", // 插件名称
        transformIndexHtml(html) {
          // 获取当前时间
          const buildTime = new Date().toLocaleString();
          // 替换或插入 buildTime
          return html.replace(
            /<\/head>/,
            `<meta name="build-time" content="${buildTime}">\n</head>`
          );
        },
      },
      createVitePlugins(env, command === "build"),
    ],
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        "~": path.resolve(__dirname, "./"),
        // 设置别名
        "@": path.resolve(__dirname, "./src"),
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    // vite 相关配置
    // vite 相关配置
    server: {
      port: 8082,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy "http://120.27.8.117/api/v1",
        "/api": {
          target: "http://120.27.8.117", //http://vue.ruoyi.vip/dev-api/captchaImage
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""), // 确保路径正确
        },
      },
    },
    //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
  };
});
