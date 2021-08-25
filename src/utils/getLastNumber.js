export function getLastNumber(number) {
	if (number > 20) {
		const numberToString = number.toString()
		const lastChar = numberToString[numberToString.length - 1]
		return Number(lastChar)
	}
	return number
}

