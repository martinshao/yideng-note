// function fn() {
//   this.i = 0;
//   this.j = 0;
//   this.x = 0;

//   var interval1 = setInterval(function () {
//     console.info('Function...', this.i++);
//   }, 500);

//   var interval2 = setInterval(function () {
//     console.info('bind***', this.x++);
//   }.bind(this), 500);

//   var interval3 = setInterval(() => {
//     console.info('Arrow function$$$', this.j++);
//   }, 500);

//   setTimeout(function () {
//     clearInterval(interval1);
//     clearInterval(interval2);
//     clearInterval(interval3);
//   }, 5000);
// }
// fn();

// var obj = {
//   user: "shaowei is cool",
//   getName: function () {
//     return this.user;
//   }
// }

// var getNameFn = obj.getName;
// console.info(getNameFn());

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

window.Glog = function (msg) {
  console.log(msg)
}
  // this was added before the main closure.

  (function (win) {
    //the former closure that contains the main javascript logic;
  })(window)


var s = {
  p: function () {
    return function () {
      console.log('enna')
    }
  }
}
  (s.p())()

var test = function (param) {
  console.log('test', param);
  return function (param) {
    console.log('inner', param);
  }
}
  (test())();

var s = {
  p: function () {
    return function () {
      console.log('enna')
    }
  }
};
(s.p())()

var s = {
  p: function () {
    return function () {
      console.log('enna')
    }
  }
}
  (s.p())()