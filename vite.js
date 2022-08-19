const fs = require('fs-extra')
const UpdatePopup = require('.')
const {join, resolveApp} = require('./utils')
function WebVersionPopupPlugin(conf) {
  const updatePopup = new UpdatePopup(conf)
  let config = {}
  return {
    name: 'web-version-popup',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    buildStart() {
      updatePopup.writeVersion(updatePopup.options.publicPath || config.base)
    },
    transform(content, id) {
      if (id.includes('html')) {
        return content.replace(
          '</body>',
          `<script type="module" src="${resolveApp(
            'main.js'
          )}"></script></body>`
        )
      }
    },
    closeBundle() {
      fs.outputFileSync(
        join(
          config.root,
          config.build.outDir,
          updatePopup.options.versionFileName
        ),
        updatePopup.version
      )
    }
  }
}

exports.default = WebVersionPopupPlugin
