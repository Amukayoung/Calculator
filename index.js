class Calculator {
    constructor() {
        this.operand1 = null;
        this.operand2 = null;
        this.operator = null;
        this.operation = "";
        this.result = 0;
        this.operationDisplay = document.querySelector(".operation");
        this.resultDisplay = document.querySelector(".result");
        this.operators = ["+", "-", "x", "÷"];
        this.click = false;
        this.clickedButton = null;

        const buttons = document.querySelectorAll(".button-wrapper");
        buttons.forEach(button => {
            button.addEventListener("mousedown", () => {
                this.click = true;
                this.clickedButton = button;
                this.clickedButton.classList.add("button-clicked");
                this.updateDisplay();
            });
        });

        document.body.addEventListener("mouseup", () => {
            if (this.click) {
                this.clickedButton.classList.remove("button-clicked");
                this.click = false;
            }
        });

        const popupButton = document.querySelector(".popup > button");
        popupButton.addEventListener("click", () => {
            this.reset();
            this.closePopup();
        });
    }

    add(operand1, operand2) {
        return operand1 + operand2;
    }

    subtract(operand1, operand2) {
        return operand1 - operand2;
    }

    multiply(operand1, operand2) {
        return operand1 * operand2;
    }

    divide(operand1, operand2) {
        if (operand2 === 0) {
            this.openPopUp();
            return null;
        }
        return operand1 / operand2;
    }

    operate() {
        switch (this.operator) {
            case "+":
                return this.add(this.operand1, this.operand2);
            case "-":
                return this.subtract(this.operand1, this.operand2);
            case "x":
                return this.multiply(this.operand1, this.operand2);
            case "÷":
                return this.divide(this.operand1, this.operand2);
        }
        return null;
    }

    nextOperation() {
        return this.operators.some(symbol => this.operation.includes(symbol) && !isNaN(this.operation.slice(-1)));
    }

    canAddDecimal() {
        if (isNaN(this.operation.slice(-1))) {
            return false;
        }

        const tempOperator = this.operators.find(symbol => this.operation.includes(symbol));
        if (tempOperator === undefined) {
            return !this.operation.includes(".");
        } else {
            const tempNum2 = this.operation.split(tempOperator)[1];
            return !tempNum2.includes(".");
        }
    }

    reset() {
        this.operand1 = null;
        this.operand2 = null;
        this.operator = null;
        this.operation = "";
        this.result = 0;
        this.operationDisplay.textContent = this.operation;
        this.resultDisplay.textContent = this.result.toString();
    }

    backspace() {
        if (this.operation !== "") {
            if (this.operation.startsWith("-") && this.operation.length === 2) {
                this.operation = "";
            } else {
                this.operation = this.operation.substring(0, this.operation.length - 1);
            }
        }
        this.operationDisplay.textContent = this.formatOperation();
    }

    hasOperator() {
        return this.operators.some(symbol => this.operation.substring(1, this.operation.length).includes(symbol));
    }

    formatOperation() {
        return this.operation.replace(/(\+|-|x|÷|=)/g, ' $1 ').trim();
    }

    openPopUp() {
        const popup = document.querySelector(".popup");
        popup.classList.add("open-popup");
        const overlay = document.querySelector(".overlay");
        overlay.classList.add("overlay-active");
    }

    closePopup() {
        const popup = document.querySelector(".popup");
        popup.classList.remove("open-popup");
        const overlay = document.querySelector(".overlay");
        overlay.classList.remove("overlay-active");
    }

    updateDisplay() {
        if (!isNaN(this.clickedButton.id)) {
            if (this.operation.length < 10) {
                if (this.operation.endsWith("=")) {
                    this.operand1 = null;
                    this.operand2 = null;
                    this.operator = null;
                    this.operation = "";
                }
                this.operation += this.clickedButton.id;
                this.operationDisplay.textContent = this.formatOperation();
            }
        }

        if (this.clickedButton.id === ".") {
            if (this.operation.length < 10) {
                if (this.canAddDecimal()) {
                    this.operation += this.clickedButton.id;
                    this.operationDisplay.textContent = this.formatOperation();
                }
            }
        }

        if (this.operators.includes(this.clickedButton.id)) {
            if (this.operation.length < 10) {
                if (this.nextOperation()) {
                    this.operand2 = parseFloat(this.operation.split(this.operator)[1]);
                    this.result = this.operate();
                    this.resultDisplay.textContent = this.result.toString();
                    this.operation = this.result.toString();
                }

                if (this.operation === "") {
                    this.operand1 = 0;
                    this.operator = this.clickedButton.id;
                    this.operation = this.operand1.toString() + this.operator;
                    this.operationDisplay.textContent = this.formatOperation();
                }

                if (!isNaN(this.operation.slice(-1))) {
                    this.operand1 = parseFloat(this.operation);
                    this.operator = this.clickedButton.id;
                    this.operation += this.clickedButton.id;
                    this.operationDisplay.textContent = this.formatOperation();
                }

                if (this.operation.endsWith("=")) {
                    this.operand1 = this.result;
                    this.operator = this.clickedButton.id;
                    this.operation = this.operand1.toString() + this.operator;
                    this.operationDisplay.textContent = this.formatOperation();
                }
            }
        }

        if (this.clickedButton.id === "=") {
            if (!isNaN(this.operation.slice(-1))) {
                if (!this.hasOperator()) {
                    this.result = parseFloat(this.operation);
                    this.operation += "=";
                    this.operationDisplay.textContent = this.formatOperation();
                    this.resultDisplay.textContent = this.result.toString();
                } else {
                    this.operand2 = parseFloat(this.operation.split(this.operator)[1]);
                    this.result = this.operate();
                    this.operation += "=";
                    this.operationDisplay.textContent = this.formatOperation();
                    this.resultDisplay.textContent = this.result.toString();
                }
            }
            if (this.operators.includes(this.operation.slice(-1))) {
                this.result = this.operand1;
                this.operation = this.operation.substring(0, this.operation.length - 1) + "=";
                this.operationDisplay.textContent = this.formatOperation();
                this.resultDisplay.textContent = this.result.toString();
            }
        }

        if (this.clickedButton.id === "clear") {
            this.reset();
        }

        if (this.clickedButton.id === "delete") {
            this.backspace();
        }
    }
}

const calculator = new Calculator();
