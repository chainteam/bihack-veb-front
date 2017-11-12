module.exports = function() {
  return new Promise((resolve, reject) => {
    console.log('-> API-component')
    let Component = {
      _name: 'api',
      _logic: require('./actions')(),
      _methods: {
        get: {
          '?': 'fake'
        },
        post: {
          find: 'find'
        }
      }
    }
    App.registerComponent(Component).then(() => resolve())
  })
}
