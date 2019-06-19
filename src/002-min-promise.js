class Pro {
  constructor(fun) {
    this.PromiseValue = '';
    this.PromiseStatus = 'pending';
    this.PromiseList = [];
    if (fun) {
      fun(this.resolve.bind(this), this.reject.bind(this));
    }
  }
  then(fun) {
    this.PromiseList.push(fun);
    return this;
  }

  resolve(v) {
    this.PromiseStatus = 'resolved';
    this.PromiseValue = v;
    this.go();
  }

  reject(v) {
    this.PromiseStatus = 'rejected';
    this.PromiseValue = v;
    this.go();
  }

  // 递归函数
  go() {
    if (this.PromiseStatus !== 'pending' && this.PromiseList.length) {
      const a = this.PromiseList.shift()(this.PromiseValue);
      if (a instanceof Pro) {
        a.PromiseList = this.PromiseList;
        a.go();
      } else {
        this.PromiseValue = a;
        this.go();
      }
    }
  }
}
