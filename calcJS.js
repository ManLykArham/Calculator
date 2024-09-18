/* Calculator class to handle calculator logic */
class Calculator {
    /* Constructor to initialize the operands and call clear method */
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    /* Clears the current and previous operands and resets operation */
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    /* Deletes the last digit of the current operand */
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    /* Appends a number or decimal to the current operand */
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    /* Chooses the operation and prepares for the next operand */
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    /* Performs the calculation based on the operation */
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    /* Formats the display of the number (with commas and decimals) */
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    /* Updates the calculator display with the current and previous operands */
    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

/* Query selectors to select calculator buttons and text elements */
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

/* Initialize the Calculator object */
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

/* Event listeners for number buttons to append the clicked number */
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

/* Event listeners for operation buttons to choose the operation */
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

/* Event listener for the equals button to compute the result */
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

/* Event listener for the all-clear button to clear the calculator */
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

/* Event listener for the delete button to delete the last digit */
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

/* Event listeners for keyboard input to control the calculator */
document.addEventListener('keydown', function(event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    if (event.key.match(patternForNumbers)) {
        event.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    if (event.key === '.') {
        event.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    if (event.key.match(patternForOperators)) {
        event.preventDefault();
        calculator.chooseOperation(event.key)
        calculator.updateDisplay()
    }
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.compute()
        calculator.updateDisplay()
    }
    if (event.key === "Backspace") {
        event.preventDefault();
        calculator.delete()
        calculator.updateDisplay()
    }
    if (event.key == 'Delete') {
        event.preventDefault();
        calculator.clear()
        calculator.updateDisplay()
    }
});
