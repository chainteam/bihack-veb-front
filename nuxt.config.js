const pkg = require('./package')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'element-ui'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // ...
    }
  },
  css: ['element-ui/lib/theme-chalk/index.css'],
  plugins: [
    {
      src: '~/plugins/element-ui',
      ssr: false
    }
  ],
  modules: [
    [
      '@nuxtjs/axios',
      {
        baseURL:
          process.env.NODE_ENV != 'production'
            ? `http://127.0.0.1:3100`
            : `http://vebback.01.developers.ruware.com`,
        browserBaseURL: '/'
        // credentials: true,
        // proxyHeaders: true,
        // debug: true,
        // redirectError: {}
      }
    ]
  ],

  axios: {
    // proxyHeaders: false
  }
}
