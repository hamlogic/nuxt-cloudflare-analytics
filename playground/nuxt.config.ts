import { defineNuxtConfig } from 'nuxt/config'
import Module from '..'

export default defineNuxtConfig({
	modules: [Module],
	cloudflareAnalytics: {
		token: '123456',
	},
})
