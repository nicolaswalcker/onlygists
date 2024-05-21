import path from 'node:path'
import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    '@unlok-co/nuxt-stripe',
  ],
  css: ['primeicons/primeicons.css'],
  imports: {
    dirs: ['./composables/useMarkdown', './composables/useServices', './composables/useLogger'],
  },

  stripe: {
    client: {
      key: process.env.STRIPE_CLIENT_KEY,
    },
    server: {
      key: process.env.STRIPE_SERVER_KEY,
    },
  },

  site: {
    url: process.env.SITE_URL,
  },

  ogImage: {
    fonts: ['Poppins:300', 'Poppins:500', 'Poppins:700'],
  },

  supabase: {
    redirect: false,
  },

  runtimeConfig: {
    stripeProductId5BRL: process.env.STRIPE_PRODUCT_ID_5BRL,
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
