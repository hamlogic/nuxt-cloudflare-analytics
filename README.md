# nuxt-cloudflare-analytics
Add Cloudflare Web Analytics to your Nuxt Project

# Nuxt Cloudflare Web Analytics Modules

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

**Note:** this modules is not enabled in dev mode.
You can set environment variable `NODE_ENV` to `production` for testing in dev mode.

## Setup
- Add `nuxt-cloudflare-analytics` dependency using yarn or npm to your project ```npm i nuxt-cloudflare-analytics``` or ```yarn install nuxt-cloudflare-analytics```
- Add `nuxt-cloudflare-analytics` to `modules` section of `nuxt.config.js`

```js
modules: [
    ['nuxt-cloudflare-analytics', { 
      token: 'your-token', // Example 1a2b3v4a5er6ac7r8afd
  }],
]
```

You can find token on Web Aalytics Page at Cloudflare Dashboard.

## Options

### `token`
- Required
- Cloudflare analytics token


## License

MIT © [Hamjs](https://hamjs.com)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-cloudflare-analytics/latest.svg
[npm-version-href]: https://www.npmjs.com/package/nuxt-cloudflare-analytics

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-cloudflare-analytics.svg
[npm-downloads-href]: https://www.npmjs.com/package/nuxt-cloudflare-analytics
