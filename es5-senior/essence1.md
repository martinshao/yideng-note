# JavaScript语言精粹

## 数据类型

JavaScript是弱类型语言，但并不是没有类型，JavaScript可以识别7种不同的类型：
1. boolean
2. number
3. string
4. null
5. underfined
6. Symbol
7. object

typeof false
typeof .2
typeof NaN
typeof ' '
typeof undefined
typeof Symbol()
typeof new Date()
typeof [ ]

typeof alert

typeof null
typeof not_defined_var

## 变量

在应用程序中，使用变量来为值命名。变量的名称称为 identifiers

### 声明

1. 使用关键字 var ：函数作用域
2. 使用关键字 let ：块作用域（block scope local variable）
3. 直接使用：全局作用域

``` js
var global_var = 1;

function fn() {
  var fn_var = 2;

  if(fn_var > 10) {
    let block_var = 3;
    global__var2 = 4;
  }
}
```

只声明不赋值，变量的默认值是 underfined

const 关键字可以声明不可变变量，同样是块作用域。对不可变的理解在对象上的理解需要注意。

``` js
  const num = 1;
  const obj = {
    prop: 'value'
  };

  num = 2; //
  obj['prop'] = 'value2';

  obj = [ ]
```

### 变量提升

JavaScript中可以引用稍后声明的变量，而不会引发异常，这一概念称为变量声明提升(hoisting)

``` js
console.log(a);
var a = 2;

// 等同于

var a;
console.log(a);
a = 2;
```

## 函数

一个函数就是一个可以被外部代码调用（或者函数本身递归调用）的子程序

### 定义函数

1. 函数声明
2. 函数表达式
3. Function构造函数
4. 箭头函数

``` js

function fn( ) {
  // ...
}

var fn  = function( ) {
  // ...
}

var fn = new Function(arg1, arg2, arg3, ... arg, funcBody)

var fn = (param) => {  }
```

### arguments

arguments对象存放着函数的所有参数,类似数组但不是数组

``` js
function foo() {
  return arguments;
}
foo(1, 2, 3);
```

### rest

``` js
function foo(...args) {
  return args;
}

foo(1, 2, 3);

function fn(a, b, ...args) {
  return args;
}

fn(1, 2, 3, 4, 5);
```

### default

``` js
function fn(a = 2, b = 3) {
  return a + b;
}

fn(2, 3);
fn(2);
fn();
```

## 对象

JavaScript中对象是可变 键值集合 （keyed collections）

### 定义对象

1. 字面量
2. 构造函数

var obj = {
  prop: 'value',
  fn: function() {}
};

var date = new Date();

## 构造函数

构造函数和普通函数并没有区别，使用new关键字调用就是构造函数，使用构造函数可以实例化一个对象。

函数的返回值有两种可能
1. 显示调用return 返回return后表达式的求值
2. 没有调用return返回undefined

``` js
  function People(name, age) {
    this.name = name;
    this.age = age;
  }

  var people = new People('Byron', 26);
```

构造函数返回值
1. 没有返回值
2. 返回简单数据类型
3. 对象类型

前两种情况构造函数返回构造对象的实例，实例化对象正是利用的这个特性

第三种构造函数和普通函数表现一致，返回return后表达式的结果。

### prototype

1. 每个函数都有一个prototype 的对象属性，对象内有一个constructor属性，默认指向函数本身
2. 每个对象都有一个__proto__的属性，属相指向其父类型的prototype

继承

label statement

``` js
loop:
  for (var i = 0; i < 10; i++) {
    for () {
      console.log(j);
      if (j === 1) {
        break loop;
      }
    }
  }

  console.log(i);
```

语句与表达式

``` js
var x = {a: 1};

{a: 1}

{a:1, b: 2}
```

语句优先原则，JavaScript进行语法分析时，当遇到语法冲突，优先解释为语句（注意不是表达式），

`{a: 1}` 可以解释成一个对象的语法树，也可以理解成这是一个语句块，

立即执行函数

``` js
!function(){}()
+function(){}()
-function(){}()

(function(){})()

```

## 高阶函数

高阶函数是把函数当做参数或者返回值是函数的函数

### 回调函数

```js
[1, 2, 3, 4].forEach(function(item) {
  console.log(item);
});
```

## 闭包

闭包由两部分组成
1. 函数
2. 环境：函数创建时作用域内的局部变量

```js
  function makeCounter(init) {
    var init = init || 0;

    return function() {
      return ++init;
    }
  }

  var counter = makeCounter(10);
  console.log(counter());
  console.log(counter());
```

典型错误

```js
// 并不能得出想要的结果
// 因为闭包，i值被保留
// 事件绑定是在for循环执行之后的
for (var i = 0; i < doms.length; i++) {
  doms.eq(i).on('click', function (ev) {
    console.log(i);
  });
}

for (var i = 0; i < doms.length; i++) {
  (function (i) {
    doms.eq(i).on('click', function (ev) {
      console.log(i);
    });
  })(i);
}
```

## 惰性函数

```js
function eventBinderGenerator() {
  if(window.addEventListener) {
    return function(element, type, handler) {
      element.addEventListener(type, handler, false);
    }
  } else {
    return function(element, type, handler) {
      element.attanchEvent('on' + type, handler.bind(element, window.event));
    }
  }
}

var addEvent = eventBinderGenerator();
```

## 柯里化

一种允许使用部分参数生成函数的方式

```js
  function isType(type) {
    return function(obj) {
      return Object.prototype.toString.call(obj) === '[object' + type +']';
    }
  }

  var isNumber = isType('Number');

  console.log(isNumber(1));
  console.log(isNumber('s'));

  var isArray = isType('Array');

  console.log(isArray(1));
  console.log(isArray([1, 2, 3]));

  function f(n) {
    return n * n;
  }

  function g(n) {
    return n * 2;
  }

  console.log(f(g(5)));

  function pipe(f, g) {
    return function() {
      return f.call(null, g.apply(null, arguments));
    }
  }

  var fn = pipe(f, g);

  console.log(fn(5));
```

你可能会问，Underscore 和 Lodash 已经这么流行了，为什么还要学习好像雷同的 Ramda 呢？

## 尾递归

1. 尾调用是指某个函数的最后一步是调用另一个函数
2. 函数调用自身，称为递归
3. 如果尾调用自身，就称为尾递归

递归很容易发生"栈溢出”错误（stack overflow）

```js
function factorial(n) {
  if(n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5)
```

## 反柯里化

### 柯里化减少参数
