export { normalizeURL, getURLsFromHTML, crawlPage };
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
	
	let res = `${url.protocol}//${url.hostname}${url.pathname}`
	
	while (res.slice(-1) === '/') {
		res = res.slice(0, -1)
	}
	return res
}

function getURLsFromHTML(htmlBody, baseURL) {
	const dom = new JSDOM(htmlBody, { runScripts: "dangerously" });

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

async function crawlPage(baseURL, currentURL, pages) {
	if (!currentURL.includes(baseURL)) {
		return pages
	}
	const normalizedCurrentURL = normalizeURL(currentURL)
	
	if (pages[normalizedCurrentURL]) {
		pages[normalizedCurrentURL]++
		return pages
	}

	const html = await fetchHTML(normalizedCurrentURL)	
	
	if (html == "") {
		return pages
	}

	pages[normalizedCurrentURL] = 1
	const urlsFound = getURLsFromHTML(html, baseURL)
	for (const url of urlsFound) {
		pages = await crawlPage(baseURL, url, pages)
	}

	return pages
}

async function fetchHTML(url) {
	try {
		const response = await fetch(url)
		
		if (response.status >= 400) {
			console.error(`Url: ${url} (Reponse code: ${response.status})`)
			return ""
		} else if (!response.headers.get("Content-Type").includes("text/html")){
			// console.error(`Url: ${url}. Ressouce is not HTML`)
			return ""
		}
	
		return await response.text()

	} catch(err) {
		console.error(`Url: ${url} : ${err.message}`)
		return ""
	}


}
