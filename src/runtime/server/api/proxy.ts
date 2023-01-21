import { readBody, getHeader, assertMethod, defineEventHandler, createError } from 'h3'

const filterOnlyValidHeaders = (headers: Record<string, unknown>) => {
	const validHeaders = new Headers()
	for (const [key, value] of Object.entries(headers)) {
		if (value && typeof value === 'string') {
			validHeaders.set(key, value)
		}
	}
	return validHeaders
}

/**
 * This is a proxy endpoint 1:1 forwarding the request to Cloudflare Tracking API.
 * The reason for this is that some browsers may block requests to this by accident.
 */
export default defineEventHandler(async event => {
	assertMethod(event, 'POST')

	// Forward request to Cloudflare Tracking API
	const cloudflareUrl = 'https://cloudflareinsights.com/cdn-cgi/rum'
	const body = await readBody(event)
	const headers = filterOnlyValidHeaders({
		accept: getHeader(event, 'accept'),
		'accept-encoding': getHeader(event, 'accept-encoding'),
		'accept-language': getHeader(event, 'accept-language'),
		'cache-control': getHeader(event, 'cache-control'),
		'content-length': getHeader(event, 'content-length'),
		'content-type': getHeader(event, 'content-type'),
		origin: getHeader(event, 'origin'),
		referer: getHeader(event, 'referer'),
		'user-agent': getHeader(event, 'user-agent'),
	})

	try {
		await $fetch(cloudflareUrl, {
			method: 'POST',
			headers,
			body,
		})

		return true
	} catch (error) {
		throw createError({
			statusCode: 500,
			message: 'Failed to forward request to Cloudflare Tracking API',
		})
	}
})
