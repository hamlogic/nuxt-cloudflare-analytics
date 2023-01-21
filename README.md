# Nuxt Cloudflare Web Analytics Modules

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

Add Cloudflare Web Analytics to your Nuxt Project.
The **@next** version of this module works with Nuxt 3, if you want to use nuxt 2, use v0.1.5

**Note:** this modules is not enabled in dev mode.
You can set environment variable `NODE_ENV` to `production` for testing in dev mode.

## Setup

- Add `nuxt-cloudflare-analytics` dependency using yarn or npm to your project `npm i nuxt-cloudflare-analytics@next` or `yarn install nuxt-cloudflare-analytics@next`
- Add `nuxt-cloudflare-analytics` to `modules` section of `nuxt.config.ts`

```ts
{
  // either
  modules: [
    [
      'nuxt-cloudflare-analytics',
      {
        // See below for more options
        token: 'your-token', // Example 1a2b3v4a5er6ac7r8afd
      },
    ],
  ]

  // or
  modules: [
    'nuxt-cloudflare-analytics'
  ],
  cloudflareAnalytics: {
    // See below for more options
    token: 'your-token', // Example 1a2b3v4a5er6ac7r8afd
  }
}
```

You can find token on Web Aalytics Page at Cloudflare Dashboard.

## Options

### `token` (!string)

- Required
- Cloudflare analytics token, example: `1a2b3v4a5er6ac7r8afd`

### `scriptPath` (string | false | undefined)

- (Optional), defaults to `/_ca/b.js`.
- You can set it to `false` to not use a local script and instead use the CDN script (https://static.cloudflareinsights.com/beacon.min.js).
  This is not recommended though, since some browsers may not load this script otherwise.
- You can set it to a custom path to use a local script. This **must** be a `.js` file inside your `public` folder. So if you have this file
  under `public/my/beacon.js`, you should set this option to `my/beacon.js`.

### `proxyPath` (string | false | undefined)

- (Optional), defaults to `/api/_ca/p`.
- A proxy endpoint, used to send data to Cloudflare.
- You can set it to `false` to not use a proxy.
  This is not recommended though, since some browsers may block the request otherwise.
- You can set it to a custom path to use a proxy endpoint. This **must** start with `/api`.
  under `api/my/proxy.js`, you should set this option to `my/proxy.js`.

## Contributors

- hamlogic (https://github.com/hamlogic)
- madebyfabian (https://github.com/madebyfabian)

## License

MIT © [Hamjs](https://hamjs.com)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-cloudflare-analytics/latest.svg
[npm-version-href]: https://www.npmjs.com/package/nuxt-cloudflare-analytics
[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-cloudflare-analytics.svg
[npm-downloads-href]: https://www.npmjs.com/package/nuxt-cloudflare-analytics

## Development

- Clone repo
- Install dependencies
- Switch into [**Take Over Mode**](https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode)
- Ensure local files are generated using npm run dev:prepare
- Start playground using npm run dev
- Follow this document to learn more about Nuxt modules: https://nuxt.com/docs/guide/going-further/modules
