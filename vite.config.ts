// import MillionLint from '@million/lint';
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
installGlobals();
const plugins = [remix(), tsconfigPaths()];
// plugins.unshift(MillionLint.vite())
export default defineConfig({
  plugins: plugins,
});
