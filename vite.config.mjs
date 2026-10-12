import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";

// Most files under src/ use the .js extension but contain JSX. Vite 8
// transforms with Oxc/Rolldown (esbuild is gone) and only parses .jsx/.tsx as
// JSX: the `oxc` config no longer accepts a parser `lang`, and the production
// build's native transform ignores moduleType. So this plugin compiles the JSX
// in src/*.js itself (automatic runtime) before anything else sees the file;
// every later stage then gets plain JS. In dev the output imports
// react/jsx-dev-runtime, which is what Vite keys React Fast Refresh on, so
// hot reload keeps working.
const SRC_JS = /[\\/]src[\\/].*\.js$/;
const jsxInJs = () => {
  let isDev = true;
  return {
    name: "jsx-in-js",
    enforce: "pre",
    configResolved(config) {
      isDev = config.command === "serve";
    },
    transform: {
      filter: { id: SRC_JS },
      async handler(code, id) {
        const result = await transformWithOxc(code, id, {
          lang: "jsx",
          jsx: { runtime: "automatic", development: isDev },
          sourcemap: true,
        });
        return { code: result.code, map: result.map };
      },
    },
  };
};

export default defineConfig({
  plugins: [jsxInJs(), react()],
  // The dev-server dependency scan bundles src/ with Rolldown directly (the
  // jsx-in-js plugin above doesn't run there), so tell it .js may contain
  // JSX. Scan only the real entry, not the font-icon demo page in public/.
  optimizeDeps: {
    entries: ["index.html"],
    rolldownOptions: {
      moduleTypes: { ".js": "jsx" },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000,
  },
});
