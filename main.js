import { crawlPage } from "./crawl.js";
import { printReport, comparePagesFn } from "./report.js";
async function main() {
	if (process.argv.length < 3) {
		console.error('There is not enough arguments.')
		return 1
	} else if (process.argv.length > 3) {
		console.error('Too many arguments.')
		return 1
	} else {
		const url = process.argv[2]
		console.log('The crawler is starting...')
		const pages = await crawlPage(url,url,{})
		
		printReport(Object.entries(pages))
	}
}

main()
