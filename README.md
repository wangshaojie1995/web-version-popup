# update-popup

[![NPM Download](https://badgen.net/npm/dm/@wsj/web-version-check)](https://www.npmjs.com/package/@wsj/web-version-check)
[![NPM Version](https://badge.fury.io/js/%40wsj%2Fupdate-popup.svg)](https://www.npmjs.com/package/@wsj/web-version-check)
[![NPM License](https://badgen.net/npm/license/@wsj/web-version-check)](https://github.com/wangshaojie1995/web-version-check/blob/master/LICENSE)
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

Check if the current application is the latest version. If not, it reminds you to reload the current page.

[⬆ Back to Top](#table-of-contents)

## Install

```console
yarn add @wsj/web-version-check
```

[⬆ Back to Top](#table-of-contents)

## Usage
### popup.txt

You need to set environment variables `WEB_VERSION`, when iteratively updating, modify the variables greater than current value.

Environment variables

```bash
# .env
WEB_VERSION=1.0.0 # Support more. e.g.: 1.0.0.1, 1.0.0.1.1
```

You may use [auto](#auto) to ignore this.

### popup.js

Project configurations:

```js
// nuxt.config.js
const config = {
  modules: [
    ['@wsj/web-version-check/nuxt', {auto: true}]
  ]
}
```

```js
// vue.config.js 
// poi.config.js 
// .umirc.ts
const config = {
  chainWebpack: config => {
    config.plugin('@wsj/web-version-check').use(require('@wsj/web-version-check'), [{auto: true}])
  }
}

// and remember add import in your App.js
// you may need to ignore IDE's warning
import '@wsj/web-version-check/app/main'
```


It's so easy.

[⬆ Back to Top](#table-of-contents)

## Options

### publicPath

- Type: `string`
- Default: `webpackConfig.output.publicPath`
- Reference: [webpack publicPath](https://webpack.docschina.org/configuration/output/#outputpublicpath)

Use publicPath setting

[⬆ Back to Top](#table-of-contents)

### auto

- Type: `boolean`
- Default: `false`

to make updated version code automaticly

**Note**：If true，the environment variable `WEB_VERSION` doesn't work.

### versionType

- Type: `'timestamp' | Support more...`
- Default: `timestamp`

The way of automatically generated version，values：

- `timestamp`:

  Using the current timestamp，it looks like this: `1603184005919.0.0`. it was put in the first place to ensure that it would always be bigger than the previous version.

  **Note**：this will lose the control of version semantics.

### inject

- Type: `boolean`
- Default: `true`

Does it need to be automatically added to the webpack entry file?
If set `false` Need to manually `@wsj/web-version-check/app/main` Inject it into your code.
When to set this parameter, see [Notice.QianKun](#qiankun)。

### envKey

- Type: `string`
- Default: `'WEB_VERSION'`

Key of the environment variable. e.g. `process.env.WEB_VERSION=1.0.0`

### versionFileName

- Type: `string`
- Default: `'web_version.txt'`

Version filename.

## Notice

### QianKun

This plugin automatically generates a common js file and adds it to the webpack entry file,
however, due to the requirement to **[export lifecycle hooks](https://qiankun.umijs.org/zh/guide/getting-started#1-%E5%AF%BC%E5%87%BA%E7%9B%B8%E5%BA%94%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)** for the sub-application's entry file.  
It is necessary to disable the automatic addition of entry files, with the following adjustments:

#### Use in sub-applications

Adjust the project configuration file

```diff
# nuxt.config.js
const config = {
-  modules: ['@wsj/web-version-check/nuxt']
+  modules: [['@wsj/web-version-check/nuxt'], { inject: false }]
}

# vue.config.js or poi.config.js
const config = {
  chainWebpack: config => {
    config.plugin('update-popup').use(UpdatePopup, [{
+     inject: false
    }])
  }
}
```

Add an entry file in your **Sub-application** at last

```diff
+ import '@wsj/web-version-check/app/main'
```

[⬆ Back to Top](#table-of-contents)

## Contributing

For those who are interested in contributing to this project, such as:

- report a bug
- request new feature
- fix a bug
- implement a new feature

[⬆ Back to Top](#table-of-contents)


<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
