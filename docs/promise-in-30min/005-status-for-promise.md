# status for promise:

我们必须加入状态机制，也就是大家熟知的 pending、fulfilled、rejected。

- pending
- fulfilled (有些框架里用 reosolved，不过，官方的 specfic 里用的是 fulfilled)
- rejected

## 状态转化关系图：

0. Promises/A+规范中的 2.1Promise States 中明确规定了
1. pending 可以转化为 fulfilled 或 rejected
1. 并且只能转化一次
1. 也就是说如果 pending 转化到 fulfilled 状态，那么就不能再转化到 rejected。
1. 并且 fulfilled 和 rejected 状态只能由 pending 转化而来，两者之间不能互相转换。
   ![](https://ws1.sinaimg.cn/large/006tNbRwgy1fwq4wq33ogj30is07m0sw.jpg)

## 最新的代码如下：

```js
function Promise(fn) {
  var state = "pending",
    value = null,
    callbacks = [];

  this.then = function(onFulfilled) {
    if (state === "pending") {
      callbacks.push(onFulfilled);
      return this;
    }
    onFulfilled(value);
    return this;
  };

  function resolve(newValue) {
    value = newValue;
    state = "fulfilled";
    setTimeout(function() {
      callbacks.forEach(function(callback) {
        callback(value);
      });
    }, 0);
  }

  fn(resolve);
}
```

## 代码解释：

上述代码的思路是这样的：resolve 执行时，会将状态设置为 fulfilled，在此之后调用 then 添加的新回调，都会立即执行。
这里没有任何地方将 state 设为 rejected，为了让大家聚焦在核心代码上，这个问题后面会有一小节专门加入。

```js
// fei
这段的思路，有点类似于 domReady 的思路。
在 dom 并没有 ready 的时候，都加到队列里去执行
如果 dom 已经 ready 了，就直接执行
```

## 理解一下这句话顺：

```conf
这时如果promise已经执行完了，我们再给promise注册then方法就怎么都不会执行了，这个不符合预期，所以才会加入状态这种东西。更新过的代码如下
```

下面的我的个人理解：

```js
var p1 = new Promse(function() {});
p1.then(function() {});
```

```conf
这里是指这个 Promise 已经执行过了。并且，异步返回也已经有结果了，已经执行过了 resolve 方法了的情况。
就实际情况而言，我并没有遇到过这种，p1已经使用过了，后面还要拿着 p1 来注册，并希望执行的情况。

和 dom Ready 情况不同的是， domReady 之所以添加这种代码是因为， domReady 并不是由我们自己控制的。
但 Promise 的执行，完全是程序员自己可以控制的，所以，理论上，我们业务代码里完全可以遵循 `先注册，后使用` 的原则，来使用 Promise，这里的状态机制并不是必须的。


但如果是一些 Nodejs 或者其它大型库里的内部代码，出于性能 或者其它 方面的考虑。如果复用 promise,免得多new Promise 对象的情况，可能会出现这种。所以，加入状态机制，完全是出于框架的逻辑严密性来考虑的。如果单从业务代码的角度去考虑，这种意义不是特别的大。
```
