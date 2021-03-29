const path = require("path");
const { defaultsDeep } = require("lodash");

module.exports = function(_options) {
    const options = defaultsDeep({}, _options, this.options.nuxtcloudflare, {
        token: null,
        scriptSrc: null,
    });

    // Don't include when run in dev mode
    if (options.dev) {
        return;
    }

    // Don't include when no token id is given
    if (!options.token) {
        return;
    }

    // Set default script src to get beacon.min.js
    if (!options.scriptSrc) {
        options.scriptSrc = 'https://static.cloudflareinsights.com/beacon.min.js';
    }

    // Register plugin
    this.addPlugin({
        src: path.resolve(__dirname, "plugin.js"),
        fileName: "cloudflare.js",
        ssr: false,
        options
    });
};

module.exports.meta = require("../package.json");