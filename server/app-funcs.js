const _ = require('lodash')

module.exports = {
  registerComponent: function(component) {
    const app = App.express
    return new Promise((resolve, reject) => {
      let methods = _.keys(component._methods)
      for (var method of methods) {
        let routes = _.keys(component._methods[method])
        for (var route of routes) {
          let mid = false

          let fn = component._methods[method][route].split(':')[0]
          // console.log('add', component._name, method, route, fn, component._logic[fn])
          if (mid) {
            app[method](
              `/${component._name}/${route}`.replace('//', '/'),
              mid,
              component._logic[fn]
            )
          } else {
            app[method](
              `/${component._name}/${route}`.replace('//', '/'),
              component._logic[fn]
            )
          }
        }
      }
      // == Подключение схем ===================================
      // if (component._schema) {
      //   App._schemas[component._name] = component._schema
      // }
      return resolve()
    })
  },

  json(res, data = []) {
    res
      .status(200)
      .set('Content-Type', 'application/json; charset=utf-8')
      .send(JSON.stringify(data))
  }
} // end of export default
