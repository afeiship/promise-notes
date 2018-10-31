# promise 后面继续 then 的语法糖

## 首先看一下使用场景吧：( use-case )
```js
// 例4
getUserId()
  .then(getUserJobById)
  .then(function(job) {
    // 对job的处理
  });

function getUserJobById(id) {
  return new Promise(function(resolve) {
    http.get(baseUrl + id, function(job) {
      resolve(job);
    });
  });
}
```
