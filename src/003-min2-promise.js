// https://www.cnblogs.com/iamzhanglei/archive/2013/02/24/2924680.html

var MyPromise = function() {
  this.thens = [];
};
MyPromise.prototype = {
  resolve: function() {
    var t = this.thens.shift(),
      n;
    t && ((n = t.apply(null, arguments)), n instanceof Promise && (n.thens = this.thens));
  },
  then: function(n) {
    return this.thens.push(n), this;
  }
};

console.log('main');

new MyPromise(function(resolve) {
  console.log('new ...');
  setTimeout(() => {
    console.log('resolove');
    resolve(123);
  }, 1000);
}).then(function(res) {
  console.log('result', res);
});
