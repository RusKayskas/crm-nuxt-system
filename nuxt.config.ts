// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
  '@nuxt/ui',
  '@nuxt/image', 
  'shadcn-nuxt', 
  [
    '@nuxtjs/google-fonts', 
    {
      families: {
        Lato: {
          wght: [300, 400, 700],
          ital: [300], 
        },
      },
    },
  ],
  '@pinia/nuxt',
  'nuxt-icon',
  [
    '@vee-validate/nuxt',
    {
      autoImports: true,
    }
  ],
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/Ui'
  },
  pinia: {
    storesDirs: ['./store/**'],
  },
})