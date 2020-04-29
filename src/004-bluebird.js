const Promise = require('bluebird');
const NxNodeFetch = require('@feizheng/next-node-fetch');

// node src/004-bluebird.js

const urls = [
  'https://api.github.com/users/afeiship',
  'https://api.github.com/users/guowenfh',
  'https://api.github.com/users/atomkit',
  'https://api.github.com/orgs/getsentry',
  'https://api.github.com/orgs/penspug',
  'https://api.github.com/orgs/dongyuanxin'
];

// 这个 map 方法，实际上是一个 Promise.all + Array.map 的结合体
// 重点在于有第 3 个参数， { concurrency: 5 } 这个在一些 nodejs 和 限制并发的场景中会很有用
// 典型场景： ios 小程序的 http 并发数就有限制，最多10个。 之前一些数据类的应用中，就会有大量这种请求，并未被合并的，如果不处理这种并发，就会出现请求失败，被忽略，导致结果错误

const promises = Promise.map(urls, (url, index) => {
  return NxNodeFetch.get(url).then((data) => {
    return {
      index,
      data
    };
  });
});

promises.then((res) => {
  console.log(res);
});