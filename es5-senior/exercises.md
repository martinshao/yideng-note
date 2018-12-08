## 主要通过例题的方式讲解一些ES5的核心知识

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
      this.a = 60;
      console.info(this.a);
    }
    go.prototype.a = 50;
    return go;
  }
};
var p = test.init();
p();
new (this.init())();
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
  </script>
```

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