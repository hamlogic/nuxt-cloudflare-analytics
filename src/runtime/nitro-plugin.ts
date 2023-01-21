import type { NitroAppPlugin } from 'nitropack'

// @ts-expect-error - This is a runtime file, so we can't use the types
import * as config from '#nuxt-cloudflare-analytics'

const plugin: NitroAppPlugin = nitro => {
	nitro.hooks.hook('render:html', htmlContext => {
		const beaconData = JSON.stringify({
			token: config.token,
			spa: true,
		})

		const scriptPath = config.scriptPath || 'https://static.cloudflareinsights.com/beacon.min.js'

		htmlContext.body.push(`<script defer src="${scriptPath}" data-cf-beacon='${beaconData}'></script>`)
	})
}

export default plugin
