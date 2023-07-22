let num1 = null;
let num2 = null;
let operator = null;
let click = false;
let clickedButton = null; 
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