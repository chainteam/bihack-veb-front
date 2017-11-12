// import api from './api'
const api = require('./api')
module.exports = function() {
  return Promise.all([api()])
}
