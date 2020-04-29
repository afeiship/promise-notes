# promisify
> 将原有的方法 promise 化。

## node util
```js
// 如果只有 1-2 个 api 需要做 promise 处理
const util = require('util');

util.promisify(cos.getService, { context: cos })
```

## promisify
```js
const Cos = require("cos-nodejs-sdk-v5");
const Promise = require("bluebird");
const config = require("./config.json");
const cos = new Cos(config);

const getServiceAsync = Promise.promisify(cos.getService, { context: cos });
```


## promifyAll
```js
const Cos = require("cos-nodejs-sdk-v5");
const Promise = require("bluebird");
const config = require("./config.json");
const cos = new Cos(config);

Promise.promisifyAll(cos, { context: cos });

cos.getServiceAsync().then((res) => {
  console.log(res);
});
```