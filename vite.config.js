import { join, resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import beautify from "vite-plugin-beautify";
import handlebars from "vite-plugin-handlebars";
import imagemin from "unplugin-imagemin/vite";
import viteCompression from "vite-plugin-compression";
import vitePugPlugin from "vite-plugin-pug-transformer";

import { visualizer } from "rollup-plugin-visualizer";
import { imagetools } from "vite-imagetools";
// import ViteWebp from 'vite-plugin-webp-generator'

const ogDescription = "";

const pageData = {
  "/index.html": {
    title: "",
    description: ogDescription,
  },
};

export default defineConfig({
  base: "./",
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: join(process.cwd(), "node_modules/$1"),
      },
      {
        find: /@\//,
        replacement: join(process.cwd(), "src/"),
      },
    ],
  },
  css: {
    devSourcemap: true,
  },
  plugins: [
    imagemin(),
    imagetools(),
    // visualizer({
    //   open: true
    // }),
    vue(),
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
    vitePugPlugin(),
    // viteCompression({
    //   threshold: 50000
    // }),
    beautify({
      inDir: "dist",
      html: {
        enabled: true,
      },
      js: {
        enabled: false,
      },
      css: {
        options: {
          indent_size: 2,
        },
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    minify: "terser",
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./src/index.html"),
        login: resolve(__dirname, "./src/login.html"),
        register: resolve(__dirname, "./src/register.html"),
        resetPassword: resolve(__dirname, "./src/resetPassword.html"),
        forgetPassword: resolve(__dirname, "./src/forgetPassword.html"),
        memberCenter: resolve(__dirname, "./src/memberCenter.html"),
        personalInfo: resolve(__dirname, "./src/personalInfo.html"),
        loginManage: resolve(__dirname, "./src/loginManage.html"),
        historyOrder: resolve(__dirname, "./src/historyOrder.html"),
        audio: resolve(__dirname, "./src/audio.html"),
        audios: resolve(__dirname, "./src/audios.html"),
        privacy: resolve(__dirname, "./src/privacy.html"),
        personalPrivacy: resolve(__dirname, "./src/personalPrivacy.html"),
        article: resolve(__dirname, "./src/article.html"),
        article_video: resolve(__dirname, "./src/article_video.html"),
        articles: resolve(__dirname, "./src/articles.html"),
        confirm: resolve(__dirname, "./src/confirm.html"),
        course: resolve(__dirname, "./src/course.html"),
        events: resolve(__dirname, "./src/events.html"),
        eventDetail: resolve(__dirname, "./src/eventDetail.html"),
        search: resolve(__dirname, "./src/search.html"),
        weekly: resolve(__dirname, "./src/weekly.html"),
        selection: resolve(__dirname, "./src/selection.html"),
        selectionDetail: resolve(__dirname, "./src/selectionDetail.html"),
        faq: resolve(__dirname, "./src/faq.html"),
        donate: resolve(__dirname, "./src/donate.html"),
        cooperate: resolve(__dirname, "./src/cooperate.html"),
        about: resolve(__dirname, "./src/about.html"),
        podcast: resolve(__dirname, "./src/podcast.html"),
        report: resolve(__dirname, "./src/report.html"),
        class: resolve(__dirname, "./src/class.html"),
        classLogin: resolve(__dirname, "./src/classLogin.html"),
        classDetail: resolve(__dirname, "./src/classDetail.html"),
        reviews: resolve(__dirname, "./src/reviews.html"),
        reviewStep1: resolve(__dirname, "./src/reviewStep1.html"),
        reviewStep2: resolve(__dirname, "./src/reviewStep2.html"),
        reviewStep3: resolve(__dirname, "./src/reviewStep3.html"),
        reviewForm: resolve(__dirname, "./src/reviewForm.html"),
        reviewRegister: resolve(__dirname, "./src/reviewRegister.html"),
        campaign: resolve(__dirname, "./src/campaign.html"),
        campaignDetail: resolve(__dirname, "./src/campaignDetail.html"),
        confirmCampaign: resolve(__dirname, "./src/confirmCampaign.html"),
        confirmReview: resolve(__dirname, "./src/confirmReview.html"),
        style: resolve(__dirname, "./src/style.html"),
      },
      output: {
        entryFileNames: "assets/js/[name].js",
        chunkFileNames: "assets/js/[name].js",
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          }
          return "assets/" + extType + "/[name][extname]";
        },
        // manualChunks: (id) => {
        //   if (id.includes('node_modules')) {
        //     const arr = id.toString().split('node_modules/')[1].split('/')
        //     switch (arr[0]) {
        //       default:
        //         return arr[0]
        //     }
        //   }
        // }
      },
    },
  },
});
