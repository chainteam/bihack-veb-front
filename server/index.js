const express = require('express')
const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')
const registerComponent = require('./app-funcs').registerComponent
const components = require('./components')

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3100

app.set('port', port)

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '10mb'
  })
)
app.use(bodyParser.json({ limit: '5mb' }))

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

global.App = {
  express: app,
  registerComponent
}

components()

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on http://' + host + ':' + port)
