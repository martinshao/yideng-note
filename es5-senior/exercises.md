## ES5核心技术

> **主要通过例题的方式讲解一些ES5的核心知识**

### 1.第一题 以下代码运算结果

``` html
  <script type="text/javascript">
    var a = 25;
    (function() { // IIFE
      // var a  ->变量提升
      // 局部变量覆盖全局变量
      console.log(a);
      var a = 30;
    })();
  </script>
```

讲解：

该题涉及的知识点有：
变量、作用域、函数声明、函数表达式、立即执行函数(IIFE)
* 我们看到了一个立即执行函数

``` js
 (function(){...})()
 (function(){...}())
```

> IIFE的作用
> * 一是不必为函数命名，避免了污染全局变量
> * 二是IIFE内部形成了一个单独的作用域，可以封装一些外部无法读取 的私有变量。

javascript中没用私有作用域的概念，如果在多人开发的项目上，你在全局或局部作用域中声明了一些变量，可能会被其他人不小心用同名的变量给覆盖掉，根据javascript函数作用域链的特性，可以使用IIFE可以模仿一个私有作用域，用匿名函数作为一个“容器”，“容器”内部可以访问外部的变量，而外部环境不能访问“容器”内部的变量，所以( function(){…} )()内部定义的变量不会和外部的变量发生冲突，俗称“匿名包裹器”或“命名空间”。

立即执行函数体内的变量 `var a` ，覆盖了全局声明的变量的 `var a` ，另外IIFE内部的 `var a` 因为变量提升的关系，在 `console.log(a)` 访问前就已经声明完毕(此时只是执行`var a`的过程，所以变量处于 **undefined** 状态)，在 `var a=30` 时完成赋值的过程。

所以最后的执行结果是：`undefined`

另外这道题简单做一些修改，使上边所说的特性更加清晰：

``` html
  <script type="text/javascript">
    var a = 'aaa';
    var b = 'bbb';
    (function() {
      console.log(a); // => undefined
      console.log(b); // => bbb
      var a = 'AAA';
      var c = 'CCC';
    })();
    console.log(a); // => aaa
    console.log(b); // => aaa
    console.log(c); // error => Uncaught ReferenceError: c is not defined
  </script>
```

### 2.第二题 以下代码运算结果

``` js
this.a = 20;
var test = {
  a: 40,
  init: ()=> {
    console.info(this.a);
    function go() {
      // this.a = 60;
      console.info(this.a);
    }
    go.prototype.a = 50;
    return go;
  }
};
// var p = test.init();
// p();
new (test.init())();
```

这道题目相当复杂，所以在解析这道题目的时候，我们可以尝试着把复杂的问题解析成小问题，逐个击破。

``` js
<script type="text/javascript">
  // this  -> window
  this.a = 20;
  var p = {
    a: 30,
    test: function() {
      // this -> window
      console.info(this.a)
    }
  };
  p.test();
</script>
 ```

 这个例子主要就是分析this的指向，关于这个我有详细的文章介绍。请参考。
 [this问题详解][1]

 [1]: https://github.com/Martin-Shao/yideng-note/blob/master/es5-senior/article/this.md

 ``` js
  <script type="text/javascript">
    this.a = 20;
    var p = {
      a: 30,
      test: function() {
        console.info(this.a)
        function s() {
          this.a = 60;
          console.info(this.a);
        }
        return s;
      }
    };
    (p.test())();
    // var s = p.test();
    // s();
  </script>
```

上面的例子中，`this.a` 的值和P变量是完全没有关系的。`(p.test())();`这段代码和下面注释掉的两段代码是一样，这样就能很明白的看出来，`s();` 函数时挂载在window对象的，所以函数中的this就是指向window对象的。

第二点就是要注意`this.a = 60;` 和 `this.a = 20;` 中的this都是指向window的，所以前者的 `a` 的值要覆盖后者。

``` js
<script type="text/javascript">
  this.a = 20;
  var p = {
    a: 30,
    test: function() {
      console.info(this.a)
      function s() {
        this.a = 60;
        console.info(this.a);
      }
      s();
    }
  };
  p.test();
</script>
  ```

这段代码和前面的代码得出的结果是一样，另一方面也证明了，在浏览器中，凡是没有指明调用对象的，都会默认绑定window对象。

### 3.第二题 以下代码运算结果

``` js
<script type="text/javascript">
  function f1() {
    var N = 0;
    function f2() {
      N += 1;
      console.info(N);
    }
    return f2;
  }
  var result = f1();
  result();
  result();
  result();
  // result = null;
</script>
```

这个例题就是典型的闭包，造成的问题就是N这个变量永驻内存，其实就会造成内存泄露问题。得出的结果是
> 1 2 3

解决这个问题的办法是在逻辑结束之后，给变量赋值 `null` ，这是闭包带来不好的问题，另外一方面，闭包还能给JavaScript这么语言带来私有变量。

``` js
<script type="text/javascript">
  function Product() {
    var name;
    this.setName = function(value) {
      name = value;
    }
    this.getName = function() {
      return name;
    }
  }
  var product = new Product();
  product.setName("milk");
  console.info(product);
  console.info(product.getName());
</script>
```

### 4. 面向对象与继承

第四部分开始，就要涉及到JavaScript面向对象编程的问题了。

下面代码简单演示了什么是对象、构造器和以及最简单的原型继承实例对象。

1. 面向对象编程范式的概念介绍
2. JavaScript语言支持面向对象的基石
3. JavaScript之原型、构造函数、继承解析
4. JavaScript按值传递和按引用传递在继承中问题
5. 原型继承、构造继承、组合继承、寄生组合继承优缺点解析

``` js
<script type="text/javascript">
  var Car = function() {
    // constructor == Car
    this.color = color;
    this.sail = function(argument) {
      console.info(this.color + " 色的车卖了13W.")
    }
  }
  
  var BMW = function() {}
  BMW.prototype = new Car();

  var car = new Car();
  console.info(s);
  console.info(car.sail());
</script>
```

从这里开始，算是接触到JavaScript面相对象编程的知识了。
关于这部分知识，会单独做一个专题，请移步。

### 5. 变量提升和函数提升

``` js
  (function() {
      var a = 20;
      function a() {}
      console.info(a); // console => 20
  })();
```

``` js
  (function() {
      var a = 20;
      var b = c = a;
  })();
  console.info(c); // console => 20
```

``` js
  (function() {
    function a() {
      var a = 20;
      var b = c = a;
    }
  })();
  console.info(c); // Uncaught ReferenceError: c is not defined
  ```

``` js
  (function() {
      var a = 20;
      var b, c = a;
  })();
  console.info(c); // Uncaught ReferenceError: c is not defined
  ```

  ``` js
  function test() {
    this.a = 20;
  }
  test.prototype.a = 30;
  var q = new test();
  console.info(q.a);
```

``` js
  var user = {
    age: 20,
    init: function() {
      console.info(this.age);
    }
  }
  var data = {age: 40};
  var u = user.init.bind(data);
  u.init();
```

``` js
  function test(m) {
    m.v = 20;
  }
  var m = {age: 30};
  test(m);
  console.info(m);
  console.info(m.v); // console => 20
```

```js
var bo = 10;
function foo() {
  console.log(bo);
}
foo();

(function() {
  var bo = 20;
  foo();
})()

(function (func) {
  var bo = 30;
  func();
})(foo)
```

## 大总结

1. 理解执行函数
2. 闭包，内部函数可以访问外部函数的变量，把函数返回出去
闭包可以保护内部的变量，闭包造成内存泄露 == null
3. 原型链
  3.1. 构造函数里的属性的优先级比原型链的要高
  3.2. 面向对象编程的时候，js没有类的概念，可以用函数替代
  3.3. constructor实际就是对应的那个函数
  3.4. prototype按引用传递的，Object.create原型链的副本
4. 数值 字符串 布尔类型按值传递
5. 改变this的方法 call apply bind
6. 函数提升，变量提升 函数提升的级别要比变量提升高
7. jquery内部有很多经典的写法 模块化编程的概念 闭包

## ES5核心知识提炼

JavaScript基础之变量类型
JavaScript探究this奥秘之旅
面向对象编程范式简介
JavaScript面向对象编程基础
JavaScript之理解“一等公民”--函数
Function原型方法call、apply、bind全方位解析
JavaScript深度理解原型链
JavaScript全方位理解闭包
JavaScript继承深度解析

问题是这样的：有这样的一个代码：

``` js
var s = {
  p: function () {
    return function () {
      console.log('enna')
    }
  }
}
  (s.p())()
```

志佳老师运行的结果是这样的：

![alt text](./article/img/微信图片_20181221105234.jpg "Title")
但是我的结果是这样的：  
![alt text](./article/img/微信图片_20181221105738.png "Title")

报错很清楚呀    {}  对象不是一个函数    直接跟()    就等于执行了    不是函数执行不了      es5可执行的代码只有全局代码   函数  和 eval呀

这个问题的报错分为两个部分：

``` js
// 1.  Cannot read property 'xxx' of undefined
// 2.  {(intermediate value)} is not a function
```

```js
    function Car(color, price) {
      this.color = color;
      this.price = price;
    }
    Car.prototype.sail = function() {
      console.info(this.color + ' car is sailing ' + this.price);
    }

    function inherite(subType, SuperType) {
      var prototype = Object.create(SuperType.prototype);
      prototype.constructor = subType;
      subType.prototype = prototype;
    }

    function Cruze(color, price, seller) {
      Car.call(this, color, price);
      this.seller = seller;
    }

    inherite(Cruze, Car);

    var cruze = new Cruze('red', 140000);
    cruze.sail();
```

```js
    var s = [];
    var arr = s;
    var pusher;
    var tmp;
    for (var i = 0; i < 3; i++) {
      pusher = {
        value: 'item' + i
      };
      if (i !== 2) {
        tmp = []
        pusher.children = tmp
      }
      arr.push(pusher);
      arr = tmp;
    }
    console.log(s[0]);
```

```js
    var Container = function (x) {
      this._value = x;
    }
    Container.of = x => new Container(x);
    Container.prototype.map = function (f) {
      return Container.of(f(this._value))
    }
    Container.of(3)
      .map(x => x + 1)
      .map(x => 'Result is' + x);
```

```js
    const timeout = ms =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });
    const ajax1 = () => //#endregion
      timeout(2000).then(() => {
        console.log('1');
        return 1;
      });
    const ajax2 = () => //#endregion
      timeout(1000).then(() => {
        console.log('2');
        return 2;
      });
    const ajax3 = () => //#endregion
      timeout(2000).then(() => {
        console.log('3');
        return 3;
      });
    const mergePromise = (ajaxArray) => {
      var data = [];
      var sequence = Promise.resolve();
      ajaxArray.forEach(function (item) {
        sequence = sequence.then(item).then(function (res) {
          data.push(res);
          return data;
        });
      })

      return sequence;
    }
    mergePromise([ajax1, ajax2, ajax3]).then(data => {
      console.info('done');
      console.log(data);
    })
```