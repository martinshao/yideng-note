function fn() {
  this.i = 0;
  this.j = 0;
  this.x = 0;

  var interval1 = setInterval(function() {
    console.info('Function...', this.i++);
  }, 500);

  var interval2 = setInterval(function() {
    console.info('bind***', this.x++);
  }.bind(this), 500);

  var interval3 = setInterval(() => {
    console.info('Arrow function$$$', this.j++);
  }, 500);

  setTimeout(function() {
    clearInterval(interval1);
    clearInterval(interval2);
    clearInterval(interval3);
  }, 5000);
}
fn();

var obj = {
  user: "shaowei is cool",
  getName: function() {
    return this.user;
  }
}

var getNameFn = obj.getName;
console.info(getNameFn());