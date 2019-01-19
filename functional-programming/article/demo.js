function partial(func, ...argsBound) {
  return function (...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    console.info(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// add a partial method that says something now by fixing the first argument
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] Hello, John!