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

const partail = (fn, args) =>
  (...moreArgs) =>
    fn(...args, ...moreArgs)

const partail = function (fn, args) {
  return function (...moreArgs) {
    return fn(...args, ...moreArgs)
  }
}

const add3 = (a, b, c) => a + b + c;
const fivePlus = partail(add3, 2, 3);
fivePlus(4)
const add1More = add3.bind(null, 2, 3)


function add(a, b) {
  return a + b;
}
console.log(add(1, 2));//结果3
console.log(add(1, 3));//结果4
console.log(add(1, 4));//结果5
console.log(add(1, 5));//结果6
console.log(add(1, 6));//结果7
console.log(add(1, 7));//结果8

function add(a, b, c, d, e) {
  return a + b + c + d + e;
}
console.log(add(1, 2, 3, 4, 5));
console.log(add(1, 2, 3, 1, 2));
console.log(add(1, 2, 3, 3, 5));
console.log(add(1, 2, 3, 2, 11));
console.log(add(1, 2, 3, 3, 8));
console.log(add(1, 2, 3, 7, 5));

//入参函数
function add(a, b) {
  return a + b;
}
//生产偏函数的工厂，接受一个入参函数，返回一个新的函数，用于接受剩余的参数
function partial(fn, a) {
  return function (b) {
    return fn(a, b);
  }
}

//入参函数
function add(a, b) {
  return a + b;
}
//生产偏函数的工厂
function partial(fn, a) {
  return function (b) {
    return fn(a, b);
  }
}
var parAdd = partial(add, 1);//变量parAdd接受返回的新函数
console.log(parAdd(2));//在调用的时候传入剩余的参数
console.log(parAdd(3));//在调用的时候传入剩余的参数
console.log(parAdd(4));//在调用的时候传入剩余的参数
console.log(parAdd(5));//在调用的时候传入剩余的参数

function add(a, b, c, d, e) {
  return a + b + c + d + e;
}
function partial(fn, a, b, c) {
  return function (d, e) {
    return fn(a, b, c, d, e);
  }
}
var parAdd = partial(add, 1, 2, 3);
console.log(parAdd(2, 1));
console.log(parAdd(3, 7));
console.log(parAdd(4, 8));


function add(a, b) {
  return a + b;
}
var obj = {};
obj.parAdd = add.bind(obj, 1);
console.log(obj.parAdd(2));//结果3

var foo = function (a) {
  return function (b) {
    return a * a + b * b;
  }
}

var bar = function (a, b) {
  return a * a + b * b;
}

