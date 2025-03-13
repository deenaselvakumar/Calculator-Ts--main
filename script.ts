class Calculator {
    private display: HTMLInputElement;
    private currentValue: string = '';
    private previousValue: string = '';
    private operator: string = '';

    constructor() {
        this.display = document.getElementById('display') as HTMLInputElement;
        this.addEventListeners();
    }

    private addEventListeners(): void {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button.textContent as string));
        });
    }

    private handleButtonClick(value: string): void {
        if (value === 'C') {
            this.clear();
        } else if (['+', '-', '*', '/'].includes(value)) {
            this.setOperator(value);
        } else if (value === '=') {
            this.calculate();
        } else {
            this.appendNumber(value);
        }
        this.updateDisplay();
    }

    private appendNumber(number: string): void {
        if (number === '.' && this.currentValue.includes('.')) return;
        this.currentValue += number;
    }

    private setOperator(op: string): void {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.calculate();
        }
        this.operator = op;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }

    private calculate(): void {
        let result: number;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        if (isNaN(prev) || isNaN(current)) return;
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
    }

    private clear(): void {
        this.currentValue = '';
        this.previousValue = '';
        this.operator = '';
        this.
    }

    private updateDisplay(): void {
        this.display.value = this.currentValue;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});