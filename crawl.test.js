import { normalizeURL, getURLsFromHTML } from "./crawl.js";
import { test, expect } from "@jest/globals";

describe('Normalize links', () => {

	test('Normalize a valid url', () => {
		expect(normalizeURL('https://boot.dev/path')).toBe('https://boot.dev/path');
	});

	test('Normalize url with capital letters', () => {
		expect(normalizeURL('https://BOOT.dev/path')).toBe('https://boot.dev/path');
	});

	test('Normalize url without protocols', () => {
		expect(normalizeURL('boot.dev/path')).toBe('https://boot.dev/path');
		expect(normalizeURL('')).toBe(null);
	});

	test('Normalize url dont have trailling slash', () => {
		expect(normalizeURL('https://boot.dev/path/')).toBe('https://boot.dev/path');
		expect(normalizeURL('https://boot.dev/path///')).toBe('https://boot.dev/path');
	});

	test('Normalize url dont contain credendital', () => {
		expect(normalizeURL('https://username:password@boot.dev/path/')).toBe('https://boot.dev/path');
	});

	test('Normalize url dont contain ports', () => {
		expect(normalizeURL('https://boot.dev:8080/path')).toBe('https://boot.dev/path');
	});

});

describe('Extract url from html', () => {
	
	
	test('when there is no links to be find', () => {

		const htmlBody =`
		<html>
				<body>
				</body>
		</html>
		`;
		const baseURL = 'https://boot.dev'
		expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([])
	});

	test('find all anchors', () => {

		const htmlBody =`
		<html>
				<body>
					<a href="https://boot.dev">
					<a href="https://boot1.dev">
					<a href="https://boot2.dev">
					<a href="https://boot3.dev">
				</body>
		</html>
		`;
		const baseURL = 'https://boot.dev'
		const res = [
			"https://boot.dev/",
			"https://boot1.dev/",
			"https://boot2.dev/",
			"https://boot3.dev/",
		]
		expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(res)
	});

	test('relative links are converted to absolute', () => {

		const htmlBody =`
		<html>
				<body>
					<a href="/bonjour">
					<a href="/bonjour1?r=12">
					<a href="/bonjour/2">
					<a href="//bonjour/2/o.png">
					<a href="bonjour/2">
				</body>
		</html>
		`;
		const baseURL = 'https://boot.dev'
		const res = [
			"https://boot.dev/bonjour",
			"https://boot.dev/bonjour1?r=12",
			"https://boot.dev/bonjour/2",
			"https://boot.dev/bonjour/2/o.png",
			"https://boot.dev/bonjour/2",
		]
		expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(res)
	});


});
