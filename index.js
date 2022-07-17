const { $ADD, $SUBTRACT, $MULTIPLY, $DIVIDE, $EQUALS, $CLEAR } = {
	$ADD: 'add',
	$SUBTRACT: 'subtract',
	$MULTIPLY: 'multiply',
	$DIVIDE: 'divide',
	$EQUALS: 'equals',
	$CLEAR: 'clear',
}
const display = document.getElementById('display')

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
	secondValue = parseInt(display.innerText.trim())
}

const handleOperatorButton = (operator) => {
	if (operator == $CLEAR) {
		firstValue = null
		secondValue = null
		selectedOperator = null
		clearDisplay()
		return
	}

	/*
		If operator is equals && firstValue exists, then process equals
		If operator is equals && firstValue does not exist, do nothing
		If operator is not equals && firstValue exists, process equals
		If operator is not equals && firstValue does not exist, do not process equals
		Always set firstValue to the displayValue and reset secondValue
		set selectedOperator to operator if it's not equals
	*/
	if (firstValue && selectedOperator) {
		secondValue = secondValue || parseInt(display.innerText.trim())
		let result = operate(selectedOperator, firstValue, secondValue)
		displayValue = ''
		firstValue = result
		updateDisplay()
	}
	if (operator != $EQUALS) {
		selectedOperator = operator
	}
	firstValue = firstValue || parseInt(displayValue)
	clearDisplay()
	// secondValue = null
}

const clearDisplay = () => {
	displayValue = ''
	updateDisplay()
}

const updateDisplay = () => {
	display.innerText = displayValue || firstValue
}

document.querySelectorAll('.calculator-button').forEach((button) => {
	button.addEventListener('click', handleButtonClick)
})

const handleEquals = () => {
	secondValue = secondValue || parseInt(display.innerText.trim())
	let result = operate(selectedOperator, firstValue, secondValue)
	displayValue = result
	updateDisplay()
}
