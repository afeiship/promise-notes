# promise in 30 minutes
> 30分钟，让你彻底明白Promise原理
> https://blog.csdn.net/qq_22844483/article/details/73655738

## 极简promise雏形
```js
function Promise(fn) {
    var value = null,
        callbacks = [];  //callbacks为数组，因为可能同时有很多个回调

    this.then = function (onFulfilled) {
        callbacks.push(onFulfilled);
    };

    function resolve(value) {
        callbacks.forEach(function (callback) {
            callback(value);
        });
    }

    fn(resolve);
}
```

## 上面的说明：

1. 调用then方法，将想要在Promise异步操作成功时执行的回调放入callbacks队列，其实也就是注册回调函数
2. 创建Promise实例时传入的函数会被赋予一个函数类型的参数，即resolve，它接收一个参数value，代表异步操作返回的结果，当一步操作执行成功后，用户会调用resolve方法，这时候其实真正执行的操作是将callbacks队列中的回调一一执行；
