import { fileURLToPath } from 'url'
import { promises as fsp } from 'fs'
import { join, dirname } from 'path'
import { defineNuxtModule, createResolver, addServerHandler } from '@nuxt/kit'
import { pluginName, configKey } from './config'

export interface ModuleOptions {
	addPlugin: boolean
	token: string | undefined
	scriptPath: string | false | undefined
	proxyPath: string | false | undefined
}

const scriptPathDefault = '/_ca/b.js'
const proxyPathDefault = '/api/_ca/p'

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: pluginName,
		configKey,
		compatibility: {
			nuxt: '^3.0.0',
		},
	},
	defaults: {
		addPlugin: true,
		token: undefined,
		scriptPath: scriptPathDefault,
		proxyPath: proxyPathDefault,
	},
	setup(options, nuxt) {
		if (options.addPlugin) {
			const { resolve } = createResolver(import.meta.url)
			const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

			// Options
			const scriptPath =
				typeof options.scriptPath === 'string'
					? options.scriptPath
					: options.scriptPath === false
					? undefined
					: scriptPathDefault
			const proxyPath =
				typeof options.proxyPath === 'string'
					? options.proxyPath
					: options.proxyPath === false
					? undefined
					: proxyPathDefault

			if (!options.token) {
				// eslint-disable-next-line no-console
				return console.warn(`[${pluginName}]: No '${configKey}.token' option provided!`)
			}

			// Public runtime config
			nuxt.options.runtimeConfig.public[configKey] = {
				token: options.token,
			}

			// Everything below is only needed in production
			if (nuxt.options.dev) {
				return
			}

			// Add server proxy handler
			if (proxyPath) {
				addServerHandler({
					route: join('/', proxyPath),
					handler: resolve(runtimeDir, 'server/api/proxy'),
				})
			}

			const addBeaconFile = async () => {
				// If user disabled the custom script path, we don't need to do anything.
				if (!scriptPath) {
					return
				}

				// Read file from runtime dir
				const file = await fsp.readFile(join(runtimeDir, '/public/beacon.min.mjs'), 'utf-8')

				// Replace the original url with the proxy path
				const newFile = proxyPath ? file.replace('https://cloudflareinsights.com/cdn-cgi/rum', proxyPath) : file

				// Write file to public dir of nuxt project
				const newFilePath = join(nuxt.options.rootDir, '/public/', scriptPath)
				const newDirPath = dirname(newFilePath)
				await fsp.mkdir(newDirPath, { recursive: true })
				await fsp.writeFile(newFilePath, newFile)
			}

			// Nuxt 3 and Bridge - inject script on runtime
			nuxt.hook('nitro:config', async config => {
				await addBeaconFile()
				config.virtual = config.virtual || {}
				config.virtual['#nuxt-cloudflare-analytics'] = [
					`export const scriptPath = ${JSON.stringify(scriptPath)}`,
					`export const token = ${JSON.stringify(options.token)}`,
				].join('\n')
				config.plugins = config.plugins || []
				config.plugins.push(resolve(runtimeDir, 'nitro-plugin'))
			})

			nuxt.options.build.transpile.push(runtimeDir)
		}
	},
})
