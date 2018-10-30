function MyPromsise(fn) {
  var doneCallback;
  this.then = function(done) {
    doneCallback = done;
  };
  function resolve() {
    doneCallback();
  }
  fn(resolve);
}

// 实际使用的情况：定义一个API
var promsise1 = function(inData) {
  return new MyPromsise(function(resolve) {
    $.ajax({
      type: "post",
      url: "/api/v1/get_list",
      data: inData,
      success: function(resposne) {
        resolve(resposne.data);
      }
    });
  });
};

//使用上面定义好的API
promsise1({ id: 123 }).then(function(data){
  console.log(data);
});


