# use case:

```js
//例1
function getUserId() {
    return new Promise(function(resolve) {
        //异步请求
        http.get(url, function(results) {
            resolve(results.id)
        })
    })
}

getUserId().then(function(id) {
    //一些处理
})
```

## 说明：
1. getUserId方法返回一个promise (这里返回一个Promise实例)
2. 可以通过它的 then 方法注册(注意注册这个词)在promise异步操作成功时执行的回调。
3. 这种执行方式，使得异步调用变得十分顺手。

## 过程解析：
1. 首先new Promise时，传给promise的函数发送异步请求
2. 接着调用promise对象的then属性，注册请求成功的回调函数
3. 然后当异步请求发送成功时，调用resolve(results.id)方法, 该方法执行then方法注册的回调数组。


