const UpdatePopup = require('.')

const NAME = 'web-version-popup'

exports.name = NAME

exports.apply = (api, opts = {}) => {
  api.hook('createWebpackChain', config => {
    config.plugin(NAME).use(UpdatePopup, [opts])
  })
}
