export { normalizeURL };

function normalizeURL(rawUrl) {
	let url;
	if (!rawUrl.includes("https://") && !rawUrl.includes("http://")) {
		rawUrl = `https://${rawUrl}`
	}

	try {
		url = new URL(rawUrl)
	}
	catch(err) {
		console.log(`The input: ${rawUrl} failed to normalize: ${err.message}`)
		return null
	}

	while (url.pathname.slice(-1) === '/') {
		url.pathname = url.pathname.slice(0, -1)
	}

	return `${url.protocol}//${url.hostname}${url.pathname}`
}

