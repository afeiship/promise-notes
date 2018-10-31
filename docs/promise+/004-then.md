# then方法的要求：
1. promise必须有个 then 方法来接触当前的或者最后的value或者reason
2. then方法接受两个参数，onFulfilled 和 onRejected，这两个都是可选的，如果传入的不是function的话，就会被忽略
3. 如果 onFulfilled 是一个函数，他必须在promise完成后被执行(不能提前)，并且value是第一个参数，并且不能被执行超过一次
4. 如果onRejected是一个函数，他必须在promise拒绝后被执行(不能提前)，并且reason是第一个参数，并且不能被执行超过一次
5. onFulfilled或者onRejected只能在执行上下文堆只包含了平台代码的时候执行(就是要求onfulfilled和 onrejected必须异步执行，必须在then方法被调用的那一轮事件循环之后的新执行栈执行，这里可以使用macro-task或者micro- task，这两个的区别参见文章)
6. onFulfilled或者onRejected必须作为function被执行(就是说没有一个特殊的this，在严格模式中，this就是undefined，在粗糙的模式，就是global)
7. then方法可能在同一个promise被调用多次，当promise被完成，所有的onFulfilled必须被顺序执行，onRejected也一样
8. then方法必须也返回一个promise(这个promise可以是原来的promise，实现必须申明什么情况下两者可以相等)promise2 = promise1.then(onFulfilled, onRejected);

    8.1 如果onFulfilled和onRejected都返回一个value x，执行2.3Promise的解决步骤[Resolve]
    8.2 如果onFulfilled和onRejected都抛出exception e，promise2必须被rejected同样的e
    8.3 如果onFulfilled不是个function，且promise1 is fulfilled，promise2也会fulfilled，和promise1的值一样
    8.4 如果onRejected不是个function，且promise1 is rejected，promise2也会rejected，理由和promise1一样
    8.5 这里不论promise1被完成还是被拒绝，promise2 都会被 resolve的，只有出现了一些异常才会被rejected