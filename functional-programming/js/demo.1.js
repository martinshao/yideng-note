/**
 * Functional Programming in JavaScript
 * Chapter 01
 * Magical -run- function in support of listing 1.1
 * 
 */

// -run- with two functions
var run2 = function (f, g) {
  return function (x) {
    return f(g(x));
  };
};

// -run- with three functions
var run3 = function (f, g, h) {
  return function (x) {
    return f(g(h(x)));
  };
};

// Test this magical function
var add1 = function (x) { return x + 1 };
var mult2 = function (x) { return x * 2 };
var square = function (x) { return x * x };
var negate = function (x) { return -x };

var double = run2(add1, add1);
console.log(double(2));

var testRun = run3(negate, square, mult2);
console.info(testRun(2));

var run = (...functions) => x => {
  functions.reverse().forEach(func => x = func(x));
  return x;
};

// 第一种实现
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
// 第二种实现
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
var echoDocument = document.writeln.bind(document);
var h1 = function (text) {
  return "<h1>" + text + "</h1>";
}
var printMessage = compose(echoDocument, h1);
printMessage("Hello World");