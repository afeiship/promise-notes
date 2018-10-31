# status:


## 状态要求：
1. promise 必须是在 pending，fulfilled 或者rejected 之间的一种状态。
2. promise一旦从pending变成了fulfilled或则rejected，就不能再改变了。
3. promise变成 fulfilled 之后，必须有一个 value，并且不能被改变
4. promise变成 rejected 之后，必须有一个 reason ，并且不能被改变