function Dictionary() {
  // props
  this.items = {};

  //methods
  // set
  Dictionary.prototype.set = function (key, value) {
    this.items[key] = value;
  };

  // has
  Dictionary.prototype.has = function (key) {
    return this.items.hasOwnProperty(key);
  };

  // remove
  Dictionary.prototype.remove = function (key) {
    // 1. 判断字典中是否有这个key
    if (!this.items[key]) return false;

    // 2. 从字典中删除key
    delete this.items[key];
    return true;
  };

  // 根据key获取value
  Dictionary.prototype.get = function (key) {
    return this.has(key) ? this.items[key] : undefined;
  };

  // keys
  Dictionary.prototype.keys = function () {
    return Object.keys(this.items);
  };

  // values
  Dictionary.prototype.values = function () {
    return Object.values(this.items);
  };

  // size
  Dictionary.prototype.size = function () {
    return this.keys().length;
  };

  // clear
  Dictionary.prototype.clear = function () {
    this.items = {};
  };
}

module.exports = {
  Dictionary,
};

// test
// var dic = new Dictionary();
// dic.set("name", "chloe");
// dic.set("age", 18);
// dic.set("height", 158);
// dic.set("gender", "female");
// console.log("get: ", dic.get("name"));
// console.log("keys: ", dic.keys());
// console.log("values: ", dic.values());
// console.log("size: ", dic.size());
// dic.remove("gender");
// console.log("has: ", dic.has("gender"));
