import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  displayValue = '0';
  private previousValue: any = null;
  private currentOperator: any = null;
  private waitingForNewValue = false;

  ngOnInit() { }

  appendValue(value: string) {
    if (this.waitingForNewValue) {
      this.displayValue = value;
      this.waitingForNewValue = false;
    } else {
      this.displayValue === '0' ? this.displayValue = value : this.displayValue += value;
    }
  }

  performOperation(operator: string) {
    if (this.previousValue === null) {
      this.previousValue = parseFloat(this.displayValue);
    } else {
      const currentValue = parseFloat(this.displayValue);
      this.previousValue = this.operate(this.previousValue, currentValue, this.currentOperator);
      this.displayValue = this.previousValue.toString();
    }
    this.currentOperator = operator;
    this.waitingForNewValue = true;
  }

  operate(a: number, b: number, operator: string) {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        return 0;
    }
  }

  clear() {
    this.displayValue = '0';
    this.previousValue = null;
    this.currentOperator = null;
    this.waitingForNewValue = false;
  }
}
