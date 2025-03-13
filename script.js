var Calculator = /** @class */ (function () {
    function Calculator() {
        this.currentValue = '';
        this.previousValue = '';
        this.operator = '';
        this.display = document.getElementById('display');
        this.addEventListeners();
    }
    Calculator.prototype.addEventListeners = function () {
        var _this = this;
        var buttons = document.querySelectorAll('button');
        buttons.forEach(function (button) {
            button.addEventListener('click', function () { return _this.handleButtonClick(button.textContent); });
        });
    };
    Calculator.prototype.handleButtonClick = function (value) {
        if (value === 'C') {
            this.clear();
        }
        else if (['+', '-', '*', '/'].includes(value)) {
            this.setOperator(value);
        }
        else if (value === '=') {
            this.calculate();
        }
        else {
            this.appendNumber(value);
        }
        this.updateDisplay();
    };
    Calculator.prototype.appendNumber = function (number) {
        if (number === '.' && this.currentValue.includes('.'))
            return;
        this.currentValue += number;
    };
    Calculator.prototype.setOperator = function (op) {
        if (this.currentValue === '')
            return;
        if (this.previousValue !== '') {
            this.calculate();
        }
        this.operator = op;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    };
    Calculator.prototype.calculate = function () {
        var result;
        var prev = parseFloat(this.previousValue);
        var current = parseFloat(this.currentValue);
        if (isNaN(prev) || isNaN(current))
            return;
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        this.currentValue = result.toString();
        this.operator = '';
        this.previousValue = '';
    };
    Calculator.prototype.clear = function () {
        this.currentValue = '';
        this.previousValue = '';
        this.operator = '';
    };
    Calculator.prototype.updateDisplay = function () {
        this.display.value = this.currentValue;
    };
    return Calculator;
}());
// Initialize the calculator when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    new Calculator();
});
