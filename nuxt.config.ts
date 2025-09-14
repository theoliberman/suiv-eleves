// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-auth-utils", "@nuxthub/core"],

  css: ["~/assets/css/main.css"],

  appConfig: {
    ui: {
      colors: {
        primary: "emerald",
        neutral: "neutral",
      },
    },
  },

  hub: {
    database: true,
  },

  nitro: {
    experimental: {
      tasks: true,
    },
  },

  runtimeConfig: {
    JWT_SECRET: "",
    mailer: {
      host: "",
      port: "",
      auth: {
        user: "",
        pass: "",
      },
    },
  },
});
