let num1 = null;
let num2 = null;
let operator = null;
let click = false;
let clickedButton = null; 
let operation = ""; 
let result = 0; 
const operators = ["+", "-", "x", "÷"]

const operationDisplay = document.querySelector(".operation");
const resultDisplay = document.querySelector(".result");

function add(num1, num2) {
    result = num1 + num2;
    result = Math.round(result * 1000) / 1000;
    return result;
}

function subtract(num1, num2) {
    result = num1 - num2;
    result = Math.round(result * 1000) / 1000;
    return result;
}

function multiply(num1, num2) {
    result = num1 * num2;
    result = Math.round(result * 1000) / 1000;
    return result;
}

function divide(num1, num2) {
    if (num2 === 0) {
        openPopUp();
        return result;
    } 
    result = num1 / num2;
    result = Math.round(result * 1000) / 1000;
    return result;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
    }
}

function nextOperation() {
    for (let symbol of operators) {
        if (operation.includes(symbol) && !isNaN(operation.slice(-1))) {
            return true;
        }
    }
    return false;
}

function canAddDecimal() {
    let tempOperator = null;
    let tempNum1 = null;
    let tempNum2 = null;
    if (isNaN(operation.slice(-1))) {
        return false;
    }

    for (let symbol of operators) {
        if (operation.includes(symbol)) {
            tempOperator = symbol;
        }
    }
    if (tempOperator === null) {
        tempNum1 = operation;
        if (!tempNum1.includes(".")) {
            return true;
        }
    } else { 
        tempNum2 = operation.split(tempOperator)[1];
        if (!tempNum2.includes(".")) {
            return true;
        }
    }

    return false;
}

function reset() {
    num1 = null;
    num2 = null;
    operator = null;
    operation = "";
    result = 0;
    operationDisplay.textContent = operation;
    resultDisplay.textContent = result.toString();
}

function backspace() {
    if (operation !== "") {
        if (operation.startsWith("-") && operation.length == 2) {
            operation = "";
        } else {
            operation = operation.substring(0, operation.length - 1);
        }
    }
    operationDisplay.textContent = formatOperation(operation);
}

function hasOperator() {
    for (let symbol of operators) {
        if (operation.substring(1, operation.length).includes(symbol)) {
            return true;
        }
    }
    return false;
}

function formatOperation() {
    let result = "";
    const symbols = ["+", "-", "x", "÷", "="];
    for (let i = 0; i < operation.length; i++) {
        if (symbols.includes(operation.charAt(i))) {
            result += ` ${operation.charAt(i)} `;
        } else {
            result += operation.charAt(i);
        }
    }
    result = result.trim();
    return result;
}

function openPopUp() {
    // Open popup
    const popup = document.querySelector(".popup");
    popup.classList.add("open-popup");
    // Add overlay to prevent user from clicking
    const overlay = document.querySelector(".overlay");
    overlay.classList.add("overlay-active");
}

function closePopup() {
   
    const popup = document.querySelector(".popup");
    popup.classList.remove("open-popup");
   
    const overlay = document.querySelector(".overlay");
    overlay.classList.remove("overlay-active");
}

function updateDisplay() {
   
    if (!isNaN(clickedButton.id)) {
        if (operation.length < 10) {
            if (operation.endsWith("=")) {
                num1 = null;
                num2 = null;
                operator = null;
                operation = "";
            }
            operation += clickedButton.id;
            operationDisplay.textContent = formatOperation(operation);
        }
    }

   
    if (clickedButton.id === ".") {
        if (operation.length < 10) {
            if (canAddDecimal()) {
                operation += clickedButton.id;
                operationDisplay.textContent = formatOperation(operation);
            }
        }
    }

   
    if (operators.includes(clickedButton.id)) {
        if (operation.length < 10) {
            if (nextOperation()) {
                num2 = parseFloat(operation.split(operator)[1]);
                result = operate(num1, num2, operator);
                resultDisplay.textContent = result.toString();
                operation = result.toString();
            }

            if (operation === "") {
                num1 = 0;
                operator = clickedButton.id;
                operation = num1.toString() + operator;
                operationDisplay.textContent = formatOperation(operation);
            }
            if (!isNaN(operation.slice(-1))) {
                num1 = parseFloat(operation);
                operator = clickedButton.id;
                operation += clickedButton.id;
                operationDisplay.textContent = formatOperation(operation);
            }

            if (operation.endsWith("=")) {
                num1 = result;
                operator = clickedButton.id;
                operation = num1.toString() + operator;
                operationDisplay.textContent = formatOperation(operation);
            }
        }
    }

   
    if (clickedButton.id === "=") {

        if (!isNaN(operation.slice(-1))) {
            if (!hasOperator()) {
                result = parseFloat(operation);
                operation += "=";
                operationDisplay.textContent = formatOperation(operation);
                resultDisplay.textContent = result.toString();
            } else {
                num2 = parseFloat(operation.split(operator)[1]);
                result = operate(num1, num2, operator);
                operation += "=";
                operationDisplay.textContent = formatOperation(operation);
                resultDisplay.textContent = result.toString();
            }
        }
        if (operators.includes(operation.slice(-1))) {
            result = num1;
            operation = operation.substring(0, operation.length - 1) + "=";
            operationDisplay.textContent = formatOperation(operation);
            resultDisplay.textContent = result.toString();
        }
    }

    if (clickedButton.id === "clear") {
        reset();
    }

    if (clickedButton.id === "delete") {
        backspace();
    }
}
const buttons = document.querySelectorAll(".button-wrapper");
buttons.forEach(button => {
    button.addEventListener("mousedown", () => {
        click = true;
        clickedButton = button;
        clickedButton.classList.add("button-clicked");
    });
});

document.body.addEventListener("mouseup", () => {
    if (click) {
        clickedButton.classList.remove("button-clicked");
        updateDisplay();
    }
    click = false;
});

const popupButton = document.querySelector(".popup > button");
popupButton.addEventListener("click", () => {
    reset();
    closePopup();
})