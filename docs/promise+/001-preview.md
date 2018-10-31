# preview:
+ https://www.cnblogs.com/liuzhenwei/p/5235473.html
+ https://promisesaplus.com/


## 首先重新阅读了下A+的规范:
1. `Promise` 代表了一个异步操作的最终结果，主要是通过 `then` 方法来注册成功以及失败的情况，
2. `Promise/A+` 历史上说是实现了 `Promise/A` 的行为并且考虑了一些不足之处，他并不关心如何创建，完成，拒绝 `Promise`，只考虑提供一个可协作的then方法。
