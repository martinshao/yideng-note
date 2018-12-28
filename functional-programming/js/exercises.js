/**
 * 柯里化改造前的加法运算函数
 * O -> Original (原始)
 */
function addO(x, y) {
  return x + y;
}

/**
 * 柯里化改造，ES5写法
 * F -> ES Five (原始)
 */
function addF(x) {
  return function (y) {
    return x + y;
  }
}
console.info(add(1)(2));

/**
 * 柯里化改造，ES6写法
 * S -> ES Six (原始)
 */
var addS = x => (y => x + y);
console.info(addS(4)(5));