import colors from 'vuetify/es5/util/colors';
import de from 'vuetify/es5/locale/de';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // titleTemplate: '%s - Challenges',
    title: 'Challenges',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
    ],
    script: [
      //{src: '/onConsentUpdate.js', type: 'text/plain', 'data-usercentrics': 'Firebase Authentication'},
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/fonts.css',
    '~/assets/style.css',
    '~/assets/vars.css',
  ],

  router: {
    middleware: ['default'],
    mode: 'history',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // {src: '~/plugins/lodash.js'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components', // will get any nested components
      pathPrefix: true,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    // icon: {
    //   source: '~/static/icon.png',
    //   fileName: 'icon.png',
    //   sizes: [64, 120, 144, 152, 192, 384, 512],
    //   targetDir: 'icons',
    //   plugin: true,
    //   pluginName: '$icon',
    //   purpose: ['any'],
    //   cacheDir: '~/node_modules/.cache/pwa/icon',
    // },
    meta: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      mobileApp: true,
      mobileAppIOS: false,
      favicon: true,
      name: '1AHentzsch',
      author: 'Alexander Hentzsch',
      description: 'Private website of Alexander Hentzsch',
      theme_color: '#000000',
      lang: 'de',
      ogType: 'website',
      nativeUI: false,
    },
    manifest: {
      lang: 'de',
      dir: 'ltr',
      name: 'Challenges',
      short_name: 'Challenges',
      display: 'standalone',
      theme_color: undefined,
      background_color: '#000000',
      start_url: '/',
    },
    workbox: {
      debug: false,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    lang: {
      locals: {de},
      current: 'de',
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },
};
