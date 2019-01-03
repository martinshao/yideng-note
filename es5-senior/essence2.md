# 闭包、作用域、原型链

```js
  if(!('userName' in window)) {
    var userName = 'shaogucheng';
  }
  console.log(userName);
```

```js
var obj = {
  user: 'shaogucheng',
  getName: function() {
    return this.user;
  }
}
var getNameFn = obj.getName;

console.log(getNameFn());
console.log(obj.getName());
```

## 作用域

作用域有大有小：
1. 程序级
2. 文件级
3. 函数级
4. 块级

## JavaScript的作用域

* 全局作用域
* 函数作用域
* 块级作用域（ES6）

```js
var global = 1;
function doSomething() {
  var inner = 2;
  globalA = 3;
}
doSomething();
console.log(global);
console.log(globalA);
console.log(inner);
```

## JavaScript的作用域链

什么是作用域链？

执行环境（execution context，为简单起见，有时也称为“环境”）是JavaScript中最为重要的一个概念。执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的变量对象（variable object），环境中定义的所有变量和函数都保存在这个对象中。虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。

全局执行环境是最外围的一个执行环境。根据ECMAscript实现所在的宿主环境不同，表示执行环境的对象也不一样。在Web浏览器中，全局执行环境被认为是window对象，因此所有全局变量和函数都是作为window对象的属性和方法创建的。某个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁（全局执行环境直到应用程序退出——例如关闭网页或者浏览器——时才会销毁）。

每个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。ECMAscript程序中的执行流正是由这个方便的机制控制着。
当代码在一个环境中执行时，会创建变量对象的一个作用域链（scope chain）。作用域链的是保证执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在的环境的变量对象。如果这个环境是函数，则将其活动对象（activation object）作为变量对象。活动对象在最开始时只包含一个变量，即arguments对象（这个对象在全局环境中是不存在的）。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。标识符解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级地向后回溯，直至找到标识符为止（如果找不到标识符，通常会导致错误发生）。

在JavaScript中，函数也是对象，函数对象和其它对象一样，拥有可以通过代码访问的属性和一系列仅供JavaScript引擎访问的内部属性。其中一个内部属性[[scope]]，由ECMA-262标准第三版定义，该内部属性包含了函数被创建的作用中对象的集合，这个集合被称为函数的作用域链，它决定了哪些数据能被函数访问。

```js
var x = 1;
function foo() {
  var y = 1 + x;
  return function() {
    var z = 1 + y;
    return z;
  }
}
foo()();
```

```js
  var test = 'aaa';
  function doSomething() {
    console.log(test); // 内部变量提升，覆盖全局变量
    var test = 'bbb';  // 变量声明且赋值，这里覆盖了全局变量
    console.log(test) // 有值的变量
  }
  doSomething();
  console.log(test); // 访问的是全局变量
```

执行顺序
1. 声明函数
2. 调用函数
3. 声明变量
4. console.log(test)
5. test变量赋值为bbb
6. console.log(test);

## JavaScript中的this关键字

this指向哪里？

在JavaScript中，this指向函数执行时的当前对象。

this的使用场景

* 普通函数中：
  * 严格模式：undefined
  * 非严格模式：全局对象（window）
* 构造函数中：对象的实例
* 对象方法：对象本身

### call apply bind

## 原型对象是什么？

* 每个函数都有一个prototype的对象属性
* 每个对象都有一个__proto__属性，该属性指向其父类的prototype对象

### 原型对象中的constructor

默认指向本身

```js
Person.prototype.constructor === Person;
Function.prototype.constructor === Function;
Object.prototype.constructor === Object;
Object,constructor === Function;
```

```js
  function make(num) {
    return function() {
      return num;
    }
  }
  var arr = [make(0), make(1), make(2)];
  console.log(arr[0]());
  console.log(arr[1]());
  console.log(arr[2]());
```

```js
var name = 'global';
function A(name) {
  console.log(name);
  this.name = name;
  var name = '1';
}
A.prototype.name = '2';
var a = new A('3');
console.log(a.name);
delete a.name;
console.log(a.name);
```

下面这段代码太有意思了。

```js
function fun(n, o) {
  console.log(o);
  return {
    fun: function(m) {
      return fun(m, n)
    }
  }
}

var a = fun(0);
a.fun(1);
a.fun(2);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1);
c.fun(2);
c.fun(3);
```

```js
 window.Glog = function(msg){
     console.log(msg)
 }
 // this was added before the main closure.

 (function(win){
   //the former closure that contains the main javascript logic;
 })(window)
 ```

 ```js
this.m = 100;
var obj = {
  m: 1000,
  test: function () {
    console.log(this.m);
    return function () {
      console.log(this.m);
    }
  }
}
(obj.test())();
 ```

```js
var s = {
  p: function() {
    return function() {
      console.log('enen')
    }
  }
}
(s.p())()
```

The ECMAScript specification has specific rules for automatic semicolon insertion, however in this case a semicolon isn't automatically inserted because the parenthesised expression that begins on the next line can be interpreted as an argument list for a function call.

This means that without that semicolon, the anonymous window.Glog function was being invoked with a function as the msg parameter, followed by (window) which was subsequently attempting to invoke whatever was returned.

This is how the code was being interpreted:

```js
window.Glog = function(msg) {
  console.log(msg);
}; // <--- Add this semicolon

(function(win) {
  // ...
})(window);

window.Glog = function(msg) {
  console.log(msg);
}(function(win) {
  // ...
})(window);
```

Everything works fine when I wrote the js logic in a closure as a single js file, as:

``` js
(function(win){
   //main logic here
   win.expose1 = ....
   win.expose2 = ....
})(window)
```

but when I try to insert a logging alternative function before that closure in the same js file,

```js
 window.Glog = function(msg){
     console.log(msg)
 }
 // this was added before the main closure.

 (function(win){
   //the former closure that contains the main javascript logic;
 })(window)
```

it complains that there is a TypeError:

``` console
Uncaught TypeError: (intermediate value)(...) is not a function
```

```js
window.Glog = function(msg) {
  console.log(msg);
}; // <--- Add this semicolon

(function(win) {
  // ...
})(window);
```

The ECMAScript specification has specific rules for automatic semicolon insertion, however in this case a semicolon isn't automatically inserted because the parenthesised expression that begins on the next line can be interpreted as an argument list for a function call.

This means that without that semicolon, the anonymous window.Glog function was being invoked with a function as the msg parameter, followed by (window) which was subsequently attempting to invoke whatever was returned.

This is how the code was being interpreted:

```js
window.Glog = function(msg) {
  console.log(msg);
}(function(win) {
  // ...
})(window);
```

```js
  **Error Case:**
var handler = function(parameters) {
  console.log(parameters);
}

(function() {     //IIFE
 // some code
})();
```
Output: TypeError: (intermediate value)(intermediate value) is not a function *How to Fix IT -> because you are missing semi colan(;) to separate expressions;

```js
    **Fixed**
var handler = function(parameters) {
  console.log(parameters);
}; // <--- Add this semicolon(if you miss that semi colan ...
   //error will occurs )

(function() {     //IIFE
 // some code
})();
```