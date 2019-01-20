class Wrapper {
  constructor(value) {
    this._value = value;
  }

  map(f) {
    return f(this._value);
  };

  toString() {
    // return `Wrapper ( ${this.value} )`;
    return 'Wrapper (' + this._value + ')';
  }
}

const wrap = (val) => new Wrapper(val);

const wrappedValue = wrap('Get Functional');
wrappedValue.map(R.identity);
// console.info(wrappedValue);
console.info(wrappedValue.map(R.identity));
// wrappedValue.toString();

wrappedValue.map(console.log);
wrappedValue.map(R.toUpper);
wrappedValue.toString();
console.info(wrappedValue.map(R.toUpper));
console.info(wrappedValue.toString());