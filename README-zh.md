# update-popup

[![NPM Download](https://badgen.net/npm/dm/web-version-check)](https://www.npmjs.com/package/web-version-popup)
[![NPM Version](https://badge.fury.io/js/%40wsj%2Fupdate-popup.svg)](https://www.npmjs.com/package/web-version-popup)
[![NPM License](https://badgen.net/npm/license/web-version-popup)](https://github.com/wangshaojie1995/web-version-check/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/wangshaojie1995/web-version-check/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

![](https://user-images.githubusercontent.com/53422750/88611099-eb654b00-d0ba-11ea-89b9-ca92afc1078c.gif)

## Table of Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Notice](#notice)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Features

检测当前运行的应用是否是最新版本，如若不是，则提醒刷新以使用新版本。

[⬆ Back to Top](#table-of-contents)

## Install

```console
yarn add web-version-popup
```

[⬆ Back to Top](#table-of-contents)

## Usage

你需要通过环境变量 `WEB_VERSION` 来传入版本号，后续每次迭代更新只需要修改比当前大的版本号即可。

环境变量

```bash
# .env
WEB_VERSION=1.0.0 # 如果有必要，可以支持更多位数。如：1.0.0.1，1.0.0.1.1
```

也可以使用 [options.auto](#options.auto) 来实现自动更新版本。

工程配置文件

```js
// nuxt.config.js
const config = {
  modules: ['web-version-popup/nuxt', {options}]
}

// vue.config.js 或者 poi.config.js
const UpdatePopup = require('web-version-popup')
const config = {
  chainWebpack: config => {
    config.plugin('web-version-popup').use(UpdatePopup, [{options}])
  }
}
```

如果你想自己触发

```js
window.WebVersionChecker()
```

就这么简单！

[⬆ Back to Top](#table-of-contents)

## 触发条件

- 进入应用时查询 1 次版本号。
- 应用正在工作时，每隔 1 小时获取版本号。
- 应用不在工作时（切换到其他 tab/关闭页面），停止获取版本号。
- 应用页面被激活(浏览器重新聚焦)时，会立马查询 1 次版本号；有 10 秒间隔，在间隔内频繁切换状态不会获取版本号。

## Options

### options.publicPath

- Type: `string`
- Default: `webpackConfig.output.publicPath`
- Reference: [webpack publicPath](https://webpack.docschina.org/configuration/output/#outputpublicpath)

使用独立的 publicPath，一般情况下不需要设置此参数。

[⬆ Back to Top](#table-of-contents)

### options.auto

- Type: `boolean`
- Default: `false`

是否需要自动更新版本，需要配合 `options.versionType` 一起使用。

**注意**：开启此功能，环境变量 `WEB_VERSION` 则不会再生效。

### options.versionType

- Type: `'timestamp' | 未来支持更多`
- Default: `timestamp`

自动生成的 version 的方式，可选值：

- `timestamp`:

  使用当前时间戳，它看上去是这样的：`1603184005919.0.0`，把时间戳放在版本号的第一位，是为了保证无论如何都会大于已有的版本。

  **注意**：这将失去版本语义化的控制。

### options.inject

- Type: `boolean`
- Default: `true`

是否自动添加到 webpack 入口文件，一般情况下不需要设置此参数。  
如果设置为 `false` 需要手动将 `web-version-popup/app/main` 注入到你的代码中。  
何时需要设置此参数请参阅 [Notice.QianKun（乾坤）](#qiankun乾坤)。

### options.envKey

- Type: `string`
- Default: `'WEB_VERSION'`

指定获取环境变量的 key 。e.g. `process.env.WEB_VERSION=1.0.0`

### options.versionFileName

- Type: `string`
- Default: `'web_version.txt'`

版本号文件名。

### options.checkInterval

- Type: `number`
- Default: `'一小时'`

检测间隔

### options.message

- Type: `string`
- Default: `'发现新版本可用'`

弹窗提示文本

## Notice

### QianKun（乾坤）

此插件会自动生成一个普通的 js 文件并添加到 webpack 入口文件中，  
但由于子应用的入口文件需要 **[导出生命周期钩子](https://qiankun.umijs.org/zh/guide/getting-started#1-%E5%AF%BC%E5%87%BA%E7%9B%B8%E5%BA%94%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)** 的要求，  
因此需要禁止自动添加入口文件，则做如下的调整：

#### 在子应用中使用

调整工程配置文件

```diff
# nuxt.config.js
const config = {
-  modules: ['web-version-popup/nuxt']
+  modules: [['web-version-popup/nuxt'], { inject: false }]
}

# vue.config.js 或者 poi.config.js
const config = {
  chainWebpack: config => {
    config.plugin('update-popup').use(UpdatePopup, [{
+     inject: false
    }])
  }
}
```

最后在你的**子应用**入口文件添加

```diff
+ import 'web-version-popup/app/main'
```

[⬆ Back to Top](#table-of-contents)

## Contributing

For those who are interested in contributing to this project, such as:

- report a bug
- request new feature
- fix a bug
- implement a new feature

[⬆ Back to Top](#table-of-contents)

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
