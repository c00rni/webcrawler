function main() {
	if (process.argv.length < 3) {
		console.error('There is not enough arguments.')
		return 1
	} else if (process.argv.length > 3) {
		console.error('Too many arguments.')
		return 1
	} else {
		console.log('The crawler is starting...')
	}
}

main()
