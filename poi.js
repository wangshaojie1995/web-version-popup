const UpdatePopup = require('.')

const NAME = '@wsj/web-version-check'

exports.name = NAME

exports.apply = (api, opts = {}) => {
  api.hook('createWebpackChain', config => {
    config.plugin(NAME).use(UpdatePopup, [opts])
  })
}
