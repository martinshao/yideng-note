function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n)
    }
  }
}

var a = fun(0);
a.fun(1);
a.fun(2);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1);
c.fun(2); c.fun(3);

if (!("userName in window")) {
  var userName = "shaogucheng"
}
console.info(userName);