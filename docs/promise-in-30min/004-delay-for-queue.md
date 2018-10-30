# delay for queue

细心的同学应该发现，上述代码可能还存在一个问题：
如果在 then 方法注册回调之前，resolve 函数就执行了，怎么办？
比如 promise 内部的函数是同步函数：

```js
// 例3
function getUserId() {
  return new Promise(function(resolve) {
    resolve(9876);
  });
}
getUserId().then(function(id) {
  // 一些处理
});
```

这显然是不允许的，Promises/A+规范明确要求回调需要通过异步方式执行，用以保证一致可靠的执行顺序。
因此我们要加入一些处理，保证在 resolve 执行之前，then 方法已经注册完所有的回调。
我们可以这样改造下 resolve 函数: 

```js
// fei: 其实这个就是同步转异步的一种思路， 利用 setTimeout 来进行
function resolve(value) {
  setTimeout(function() {
    callbacks.forEach(function(callback) {
      callback(value);
    });
  }, 0);
}
```

## 解析一下上面的代码：
上述代码的思路也很简单，就是通过 `setTimeout` 机制
将 `resolve` 中执行回调的逻辑放置到`JS任务队列末尾`
以保证在 `resolve` 执行时， `then` 方法的回调函数已经注册完成.


## 新的问题：_ 需要引入状态机制才可以解决（这段不太能理解）
但是，这样好像还存在一个问题，可以细想一下：
如果 `Promise` 异步操作已经成功，这时，在异步操作成功之前注册的回调都会执行，
但是在 `Promise` 异步操作成功这之后调用的 `then` 注册的回调就再也不会执行了
这显然不是我们想要的。
