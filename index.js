const { $ADD, $SUBTRACT, $MULTIPLY, $DIVIDE, $EQUALS, $CLEAR } = {
	$ADD: 'add',
	$SUBTRACT: 'subtract',
	$MULTIPLY: 'multiply',
	$DIVIDE: 'divide',
	$EQUALS: 'equals',
	$CLEAR: 'clear',
}

let displayValue = ''
let firstValue = null
let secondValue = null
let selectedOperator = null

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
		case $ADD:
			func = add
			break

		case $SUBTRACT:
			func = subtract
			break

		case $MULTIPLY:
			func = multiply
			break

		case $DIVIDE:
			func = divide
			break

		default:
			throw new Error(`Unrecognised operator name: ${operator}`)
	}
	return func(num1, num2)
}

const handleButtonClick = (e) => {
	let target = e.target
	let buttonId = target.id
	if (target.classList.contains('number')) {
		handleNumberButton(buttonId)
	} else if (target.classList.contains('operator')) {
		handleOperatorButton(buttonId)
	}
}

const handleNumberButton = (numberString) => {
	displayValue = displayValue + numberString
	updateDisplay()
}

const handleOperatorButton = (operator) => {
	if (operator == $CLEAR) {
		firstValue = null
		secondValue = null
		selectedOperator = null
		clear()
		return
	}
	if (operator == $EQUALS) {
		handleEquals()
		return
	}
	firstValue = parseInt(displayValue)
	selectedOperator = operator
	secondValue = null
	clear()
}

const clear = () => {
	displayValue = ''
	updateDisplay()
}

const updateDisplay = () => {
	document.getElementById('display').innerText = displayValue
}

document.querySelectorAll('.calculator-button').forEach((button) => {
	button.addEventListener('click', handleButtonClick)
})

const handleEquals = () => {
	secondValue =
		secondValue || parseInt(document.getElementById('display').innerText.trim())
	let result = operate(selectedOperator, firstValue, secondValue)
	displayValue = result
	updateDisplay()
	firstValue = result
}
