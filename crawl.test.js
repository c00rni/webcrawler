import { normalizeURL } from "./crawl.js";
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

