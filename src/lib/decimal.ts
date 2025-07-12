import DecimalJs from 'decimal.js';

class Decimal {
  private cumulativeNumber = new DecimalJs(0);

  constructor(number: number | string) {
    this.cumulativeNumber = new DecimalJs(number);
  }

  add(number: number | string) {
    this.cumulativeNumber = this.cumulativeNumber.add(number);
    return this;
  }

  minus(number: number | string) {
    this.cumulativeNumber = this.cumulativeNumber.minus(number);
    return this;
  }

  multiple(number: number | string) {
    this.cumulativeNumber = this.cumulativeNumber.times(number);
    return this;
  }

  divide(number: number | string) {
    this.cumulativeNumber = this.cumulativeNumber.dividedBy(number);
    return this;
  }

  toNumber() {
    return this.cumulativeNumber.toNumber();
  }

  toFixed(decimals = 2) {
    return this.cumulativeNumber.toFixed(decimals);
  }
}

export default Decimal;
