import path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
  ],
  css: ['primeicons/primeicons.css'],
  imports: {
    dirs: ['./composables/useMarkdown', './composables/useServices'],
  },

  supabase: {
    redirect: false,
  },

  runtimeConfig: {
    public: {
      nodeEnv: process.env.NODE_ENV,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      siteUrl: process.env.SITE_URL,
    },
  },

  googleFonts: {
    base64: true,
    fontsDir: 'assets/fonts',
    overwriting: true,
    families: {
      Poppins: [300, 500, 700],
    },
  },
  primevue: {
    options: { unstyled: true },
    importPT: {
      as: 'lara',
      from: path.resolve(__dirname, './assets/presets/lara/'),
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
    },
  },
})
