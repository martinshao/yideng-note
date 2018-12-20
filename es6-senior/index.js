/**
 * 
 */

// var a = "shaogucheng";
// var b = `This is cool boy ${a}`;

// console.info(b);

// function add([x, y]) {
//   return x + y;
// }

// console.info(add([10, 2, 3, 4]));

let a = 1;
let b = 2;
let c = 3;

// let [a, b, c] = [1, 2, 3];
// Uncaught SyntaxError: 
// Identifier 'a' has already been declared

let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo)
console.log(bar)
console.log(baz)

let [head, ...tail] = [1, 2, 3, 4];
console.log(head);
console.log(tail);

console.log(...[1, 2, 3]);