export { normalizeURL, getURLsFromHTML };
import { JSDOM } from 'jsdom'

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

function getURLsFromHTML(htmlBody, baseURL) {
	const dom = new JSDOM(htmlBody, { runScripts: "dangerously" });

	//while baseURL.slice(-1) == '/':
	//	baseURL = baseURL.slice(0, -1)

	return Array.from(dom.window.document.querySelectorAll('a')).map(node => {
		node = node.href
		if (node.slice(0,4) !== "http") {
			let start = 0
			while (node.slice(start, start + 1) === '/') {
				start++;
			}
			node = `${baseURL}/${node.slice(start, node.length)}`
		}
		return node
	})
}

