# chain called:

```js
this.then = function (onFulfilled) {
    callbacks.push(onFulfilled);
    return this;
};
```