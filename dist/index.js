"use strict";
const processesLabels = ['+', '-', '*', '÷', '=', 'AC', '%', '^²', '²√'];
let buttonLabels = [
    'AC', '=', '^²', '²√',
    '1', '2', '3', '*',
    '4', '5', '6', '÷',
    '7', '8', '9', '+',
    '.', '0', '%', '-'
];
let keyboard = document.querySelector(".keyboard");
let head = document.querySelector(".head");
for (let i = 0; i < buttonLabels.length; i++) {
    let row = document.createElement("div");
    row.className = "row";
    let buttons = document.createElement("input");
    buttons.addEventListener("click", click);
    buttons.type = "button";
    buttons.className = 'button';
    buttons.value = buttonLabels[i];
    row.appendChild(buttons);
    keyboard.appendChild(row);
}
function click(event) {
    const buttons = event.currentTarget;
    if (processesLabels.includes(buttons.value)) {
        if (buttons.value === '²√') {
            if (calculationResult.currentNumber === '') {
                alert("ابتدا یک عدد وارد کنید!");
                return;
            }
            else
                calculationResult.currentNumber = Math.sqrt(+calculationResult.currentNumber).toString();
            head.innerHTML = calculationResult.currentNumber;
        }
        else if (buttons.value === 'AC') {
            calculationResult.clear();
            head.innerHTML = '';
        }
        else if (buttons.value === '^²') {
            calculationResult.currentNumber = (+calculationResult.currentNumber * +calculationResult.currentNumber).toString();
            head.innerHTML = calculationResult.currentNumber;
        }
        else if (buttons.value === '=') {
            calculationResult.calculate();
            head.innerHTML = calculationResult.currentNumber;
        }
        else if (calculationResult.currentNumber === '') {
            alert("ابتدا یک عدد وارد کنید!");
            return;
        }
        else {
            calculationResult.chooseOperation(buttons.value);
            head.innerHTML = buttons.value;
        }
    }
    else {
        calculationResult.selectingNumber(buttons.value);
        head.innerHTML = calculationResult.currentNumber;
    }
}
class Calculator {
    constructor(currentNumber, previousNumber, operations) {
        this.currentNumber = currentNumber;
        this.previousNumber = previousNumber;
        this.operations = operations;
    }
    selectingNumber(number) {
        console.log(number);
        if (number === '.') {
            if (this.currentNumber.includes('.'))
                return;
        }
        this.currentNumber += number;
    }
    chooseOperation(operator) {
        this.operations = operator;
        this.previousNumber = this.currentNumber;
        this.currentNumber = '';
    }
    calculate() {
        switch (this.operations) {
            case '*':
                this.currentNumber = (+this.previousNumber * +this.currentNumber).toString();
                break;
            case '÷':
                if (+this.currentNumber === 0) {
                    alert("تقسیم بر صفر مجاز نیست!");
                    return;
                }
                this.currentNumber = (+this.previousNumber / +this.currentNumber).toString();
                break;
            case '+':
                this.currentNumber = (+this.previousNumber + +this.currentNumber).toString();
                break;
            case '-':
                this.currentNumber = (+this.previousNumber - +this.currentNumber).toString();
                break;
            case '%':
                this.currentNumber = (+this.previousNumber % +this.currentNumber).toString();
                break;
        }
    }
    clear() {
        this.currentNumber = '';
        this.previousNumber = '';
        this.operations = undefined;
    }
}
let calculationResult = new Calculator('', '', undefined);
