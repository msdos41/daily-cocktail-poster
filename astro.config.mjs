import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://justonesip.today",
  redirects: {
    "/en/archive": "/en/cocktails/",
    "/zh-cn/archive": "/zh-cn/cocktails/",
  },
});
