# 关于this

## 一、this的理解

> 我们知道，关于this对象是在运行时基于函数的执行环境绑定的：在全局函数中，this等于window，而当函数被作为某个对象的方法调用时，this等于那个对象。  
> <div style="text-align: right">--------《JavaScript高级程序设计》  </div>
> **核心提炼：函数中的this总指向调用它的对象。**

## 二、错误认识

**1、指向自身**
人们很容易把this理解成指向函数自身，其实this的指向在函数定义阶段是无法确定的，只有函数执行时才能确定this到底指向谁，实际上this的最终指向是调用它的那个对象。  

**2、指向函数的作用域**
对this的第二种误解就是this指向函数的作用域，
window，在chrome console环境里是没有问题的，全局声明的函数放在了window下，foo函数里面的this代指的是window对象，在全局环境中并没有声明变量a，因此在bar函数中的this.a自然没有定义，输出undefined。

nodejs，在node环境下，声明的function不会放在global全局对象下，因此在foo函数里调用this.bar函数会报 TypeError: this.bar is not a function错误，调用bar函数，要省去前面的this。

## 三、this绑定规则

this有四种绑定规则
* 默认绑定
* 隐式绑定
* 显示绑定
* new绑定

### 3.1默认绑定

当函数调用属于独立调用（不带函数引用的调用），无法调用其他的绑定规则，我们给它一个称呼“默认绑定”，在非严格模式下绑定到全局对象，在使用了严格模式(use strict)下绑定到undefined。
当一个函数没有明确的调用对象的时候，也就是单纯作为独立函数调用的时候，将对函数的this使用默认绑定：绑定到全局的window对象

默认绑定引发一个很深的疑问！？
函数的调用必须绑定对象，默认绑定就是绑定到window对象。

``` js
function fire() {
  console.log(this === window)
}
fire(); // 输出true

function fire() {
  // 我是被定义在函数内部的函数哦！
  function innerFire() {
    console.log(this === window)
  }
  innerFire(); // 独立函数调用
}
fire(); // 输出true

var obj = {
  fire: function () {
    function innerFire() {
      console.log(this === window)
    }
    innerFire();   // 独立函数调用
  }
}
obj.fire(); //输出 true
```

【总结】 凡事函数作为独立函数调用，无论它的位置在哪里，它的行为表现，都和直接在全局环境中调用无异

### 3.2隐式绑定

当函数被一个对象“包含”的时候，我们称函数的this被隐式绑定到这个对象里面了，这时候，通过this可以直接访问所绑定的对象里面的其他属性，

``` js
var obj = {
  a: 1,
  fire: function () {
    console.log(this.a)
  }
}
obj.fire(); // 输出1

// 我是第一段代码
function fire() {
  console.log(this.a)
}

var obj = {
  a: 1,
  fire: fire
}
obj.fire(); // 输出1

// 我是第二段代码
var obj = {
  a: 1,
  fire: function () {
    console.log(this.a)
  }
}
obj.fire(); // 输出1
```

fire函数并不会因为它被定义在obj对象的内部和外部而有任何区别，也就是说在上述隐式绑定的两种形式下，fire通过this还是可以访问到obj内的a属性，这告诉我们：

1. this是动态绑定的，或者说是在代码运行期绑定而不是在书写期
2. 函数于对象的独立性， this的传递丢失问题

（下面的描述可能带有个人的情感倾向而显得不太严谨，但这是因为我希望阅读者尽可能地理解我想表达的意思）
 隐式绑定下，作为对象属性的函数，对于对象来说是独立的。基于this动态绑定的特点，写在对象内部，作为对象属性的函数，对于这个对象来说是独立的。（函数并不被这个外部对象所“完全拥有”）

我想表达的意思是：在上文中，函数虽然被定义在对象的内部中，但它和“在对象外部声明函数，然后在对象内部通过属性名称的方式取得函数的引用”，这两种方式在性质上是等价的（而不仅仅是效果上）
定义在对象内部的函数只是“恰好可以被这个对象调用”而已，而不是“生来就是为这个对象所调用的”

在一串对象属性链中，this绑定的是最内层的对象

**隐式绑定的问题！！！**  
当进行隐式绑定时，如果进行一次引用赋值或者传参操作，会造成this的丢失，使this绑定到全局对象中去。

1引用赋值丢失

``` js
function thisTo() {
  console.log(this.a);
}
var data = {
  a: 2,
  foo: thisTo //通过属性引用this所在函数 
};
var a = 3;//全局属性

var newData = data.foo; //这里进行了一次引用赋值 
newData(); // 3
```

原理：因为newData实际上引用的是foo函数本身，这就相当于：var newData = thisTo;data对象只是一个中间桥梁，data.foo只起到传递函数的作用，所以newData跟data对象没有任何关系。而newData本身又不带a属性，最后a只能指向window。

2传参丢失

```js
function thisTo() {
  console.log(this.a);
}
var data = {
  a: 2,
  foo: thisTo //通过属性引用this所在函数 
};
var a = 3;//全局属性

setTimeout(data.foo, 100);// 3
```

这就是本文开始的那个题目。所谓传参丢失，就是在将包含this的函数作为参数在函数中传递时，this指向改变。setTimeout函数的本来写法应该是setTimeout(function(){......},100)；100ms后执行的函数都在“......”中，可以将要执行函数定义成var fun = function(){......},即:setTimeout(fun,100)，100ms后就有：fun()；所以此时此刻是data.foo作为一个参数，是这样的：setTimeout(thisTo,100);100ms过后执行thisTo()，实际道理还跟1.1差不多，没有调用thisTo的对象，this只能指向window。

3隐式丢失解决方法
为了解决隐式丢失（隐式丢失专用）的问题，ES5专门提供了bind方法，bind()会返回一个硬编码的新函数，它会把参数设置为this的上下文并调用原始函数。（这个bind可跟$(selector).bind('click',function(){......})的用法不同）

``` js
function thisTo() {
  console.log(this.a);
}
var data = {
  a: 2
};
var a = 3;
var bar = thisTo.bind(data);
console.log(bar()); //2
```

2.间接引用  
间接引用是指一个定义对象的方法引用另一个对象存在的方法，这种情况下会使得this指向window：

``` js
function thisTo() {
  console.log(this.a);
}
var data = {
  a: 2,
  foo: thisTo
};
var newData = {
  a: 3
}
var a = 4;
data.foo(); //2
(newData.foo = data.foo)() //4
newData.foo();  //3
```

这里为什么`(newData.foo=data.foo)()`的结果是4，与newData.foo()的结果不一样呢？按照正常逻辑的思路，应该是先对newData.foo赋值，再对其进行调用，也就是等价于这样的写法：newData.foo=data.foo;newData.foo();然而这两句的输出结果就是3，这说明两者不等价。

接着，当我们console.log(newData.foo=data.foo)的时候，发现打印的是thisTo这个函数，函数后立即执行括号将函数执行。这句话中，立即执行括号前的括号中的内容可单独看做一部本，该部分虽然完成了赋值操作，返回值却是一个函数，该函数没有确切的调用者，故而立即执行的时候，其调用对象不是newData，而是window。下一句的newData.foo()是在给newData添加了foo属性后，再对其调用foo()，注意这次的调用对象为newData，即我们上面说的隐式绑定的this，结果就为3。

1、为函数调用创建别名

``` js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo
}
var bar = obj.foo;
var a = "window";
bar()//window
```

虽然bar是obj.foo的一个引用，但是bar引用的是foo函数的本身，此时的bar()其实就是一个不带任何修饰的函数调用，所以应用了默认绑定，this为全局

2、传入回调函数

``` js
function foo() {
  console.log(this.a);
}
function doFoo(fn) {
  fn();
}
var obj = {
  a: 2,
  foo: foo
}
var a = "window";
doFoo(obj.foo)//window
```
参数传递其实就是隐式赋值。相当于var fn=obj.foo，与创建别名的结果一样，应用了默认绑定，应该注意的是，return返回一个函数时，也是应用了默认绑定

3、传入语言内置的函数

``` js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo
}
var a = "window";
setTimeout(obj.foo, 100)//window
```

在JavaScript内部，内置函数setTimeout函数实现可以看作

``` js
function setTimeout(fn, delay) {
  //等待delay毫秒
  fn();
}
```

最后，还剩下的疑问就是：为什么会出现隐式丢失的问题？

### 3.3显式绑定

上面我们提到了this的隐式绑定所存在的this绑定丢失的问题，也就是对于 “ fireInGrobal = obj.fire”fireInGrobal调用和obj.fire调用的结果是不同的，
因为这个函数赋值的过程无法把fire所绑定的this也传递过去。这个时候，call函数就派上用场了

call的基本使用方式： fn.call(object)
fn是你调用的函数，object参数是你希望函数的this所绑定的对象。
fn.call(object)的作用：
1.即刻调用这个函数（fn）
2.调用这个函数的时候函数的this指向object对象

``` js
var obj = {
  a: 1,    // a是定义在对象obj中的属性
  fire: function () {
    console.log(this.a)
  }
}

var a = 2;  // a是定义在全局环境中的变量  
var fireInGrobal = obj.fire;
fireInGrobal();   // 输出2
fireInGrobal.call(obj); // 输出1
```

原本丢失了与obj绑定的this参数的fireInGrobal再次重新把this绑回到了obj

但是，我们其实不太喜欢这种每次调用都要依赖call的方式，我们更希望：能够一次性 返回一个this被永久绑定到obj的fireInGrobal函数，这样我们就不必每次调用fireInGrobal都要在尾巴上加上call那么麻烦了。

怎么办呢？ 聪明的你一定能想到，在fireInGrobal.call(obj)外面包装一个函数不就可以了嘛！

``` js
var obj = {
  a: 1,    // a是定义在对象obj中的属性
  fire: function () {
    console.log(this.a)
  }
}
var a = 2;  // a是定义在全局环境中的变量  
var fn = obj.fire;
var fireInGrobal = function () {
  fn.call(obj)   //硬绑定
}
fireInGrobal(); // 输出1
```

如果使用bind的话会更加简单
var fireInGrobal = function () {
  fn.call(obj)   //硬绑定
}
可以简化为：
var fireInGrobal = fn.bind(obj);
call和bind的区别是：在绑定this到对象参数的同时：

1.call将立即执行该函数
2.bind不执行函数，只返回一个可供执行的函数

【其他】：至于apply，因为除了使用方法，它和call并没有太大差别，这里不加赘述

在这里，我把显式绑定和隐式绑定下，函数和“包含”函数的对象间的关系比作买房和租房的区别。

因为this的缘故
在隐式绑定下：函数和只是暂时住在“包含对象“的旅馆里面，可能过几天就又到另一家旅馆住了
在显式绑定下：函数将取得在“包含对象“里的永久居住权，一直都会”住在这里“

显示绑定和隐士绑定从字面意思理解，有一个相反的对比，一个表现的更直接，一个表现的更委婉，下面在看下两个规则各自的含义:

隐士绑定 在一个对象的内部通过属性间接引用函数，从而把this隐士绑定到对象内部属性所指向的函数（例如上例中的对象parent的child属性引用函数function child(){}）。

显示绑定 需要引用一个对象时进行强制绑定调用，js有提供call()、apply()方法，ES5中也提供了内置的方法 Function.prototype.bind。

call、apply这两个函数的第一个参数都是设置this对象，关于两个个函数的区别可以查看 [函数] call和apply的使用与区别?
``` js
// 水果对象
function fruit() {
  console.log(this.name, arguments);
}
var apple = {
  name: '苹果'
}
var banana = {
  name: '香蕉'
}
fruit.call(banana, banana, apple)  // 香蕉 {'0': {name: '香蕉'}, '1': { name: '苹果'}}
fruit.apply(apple, [banana, apple]) // 苹果 {'0': {name: '香蕉'}, '1': { name: '苹果'}}
```

### 3.4 new绑定

执行new操作的时候，将创建一个新的对象，并且将构造函数的this指向所创建的新对象

```` js
function foo(a) {
  this.a = a;
}

var a1 = new foo(1);
var a2 = new foo(2);
var a3 = new foo(3);
var a4 = new foo(4);

console.log(a1.a); // 输出1
console.log(a2.a); // 输出2
console.log(a3.a); // 输出3
console.log(a4.a); // 输出4
```

优先级
new绑定
显示绑定
隐式绑定
默认绑定(严格模式下会绑定到undefined)
箭头函数
箭头函数并非使用function关键字进行定义，也不会使用上面所讲解的this四种标准规范，箭头函数会继承自外层函数调用的this绑定。

执行 fruit.call(apple)时，箭头函数this已被绑定，无法再次被修改。

``` js
function fruit() {
  return () => {
    console.log(this.name);
  }
}
var apple = {
  name: '苹果'
}
var banana = {
  name: '香蕉'
}
var fruitCall = fruit.call(apple);
fruitCall.call(banana); // 苹果
```

this在项目中使用问题总结，React中使用this注意的问题

``` js
class App extends React.Component {
  componentDidMount() {
    console.log(this);
    //注意this在setTimeout函数外代表的是App这个对象
    setTimeout(function () {
      this.setState({ //这里的this指的是windows对象
        initDone: true
      })
    }, 1000);
    //两种解决方案：
    //1. var that = this
    setTimeout(() => {
      that.setState({
        initDone: true
      })
    }, 1000);
    //2.使用es6的箭头函数
    setTimeout(() => {
      this.setState({
        initDone: true
      })
    }, 1000);
  }
}
```