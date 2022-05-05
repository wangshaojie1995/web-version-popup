function WebVersionPopupPlugin() {
  return {
    name: 'web-version-popup',

    transform(src, id) {
      console.log(src, id)
    }
  }
}
exports.default = WebVersionPopupPlugin
