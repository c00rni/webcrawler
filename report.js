export { printReport, comparePagesFn };

function printReport(pages) {
	if (pages && pages.length < 1) {
		return
	}
	console.log("Starting printing the report")
	pages.sort(comparePagesFn)
	console.log(`########################`)
	for (const page of pages) {
		console.log(`Found ${page[0]} internal links to ${page[1]}`)
	}
	console.log(`########################`)
}


function comparePagesFn(a, b) {
	if (a[1] > b[1]) {
		return -1
	} else if (a[1] < b[1]) {
		return 1
	}
	return a[0].localeCompare(b[0])
}
