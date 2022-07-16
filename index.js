const add = (num1, num2) => {
	if (typeof num1 != 'number' || typeof num2 != 'number') {
		throw new TypeError('Both inputs must be numbers. Did you forget to parse?')
	}
	return num1 + num2
}

const subtract = (num1, num2) => {
	return num1 - num2
}

const multiply = (num1, num2) => {
	return num1 * num2
}

const divide = (num1, num2) => {
	return num1 / num2
}

const operate = (operator, num1, num2) => {
	let func = null
	switch (operator) {
		case 'add':
			func = add
			break

		case 'subtract':
			func = subtract
			break

		case 'multiply':
			func = multiply
			break

		case 'divide':
			func = divide
			break

		default:
			throw new Error(`Unrecognised operator name: ${operator}`)
	}
	return func(num1, num2)
}
