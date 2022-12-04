function Set() {
  // props
  this.items = {};

  // methods
  // add
  Set.prototype.add = function (value) {
    // 判断当前集合中是否已经包含了某元素
    if (this.has(value)) return false;

    // 将元素添加到集合中
    this.items[value] = value;
    return true;
  };

  // has
  Set.prototype.has = function (value) {
    return this.items.hasOwnProperty(value);
  };

  // remove
  Set.prototype.remove = function (value) {
    // 1. 判断该集合中是否包含该元素
    if (!this.has(value)) return false;

    // 2. 将元素从属性中删除
    delete this.items[value];
    return true;
  };

  // clear
  Set.prototype.clear = function () {
    this.items = {};
  };

  // size
  Set.prototype.size = function () {
    return Object.keys(this.items).length;
  };

  // values
  Set.prototype.values = function () {
    return Object.keys(this.items);
  };

  // 集合间操作
  // 并集
  Set.prototype.union = function (otherSet) {
    // this: 集合对象A
    // otherSet: 集合对象B
    // 1. 创建新的集合
    var unionSet = new Set();

    // 2. 将A集合中所有的元素添加到新集合中
    var values = this.values();
    for (var i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }

    // 3. 取出B集合中的元素，判断是否需要加到新集合
    values = otherSet.values();
    for (var i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }

    return unionSet;
  };

  // 交集
  Set.prototype.intersection = function (otherSet) {
    // this: 集合A
    // otherSet：集合B
    // 1. 创建新的集合
    var intersectionSet = new Set();

    // 2. 从A中取出一个个元素，判断是否同时存在于集合B中，存在就放入新集合中
    var values = this.values();

    for (var i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i]);
      }
    }

    return intersectionSet;
  };

  // 差集
  Set.prototype.difference = function (otherSet) {
    // this: 集合A
    // otherSet: 集合B
    // 1. 创建新的集合
    var differenceSet = new Set();

    // 2. 取出A集合一个个元素，判断是否同时存在于B中，不存在B中，则添加到新集合中
    var values = this.values();
    for (var i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        differenceSet.add(values[i]);
      }
    }

    return differenceSet;
  };

  // 子集
  Set.prototype.subset = function (otherSet) {
    // this: 集合A
    // otherSet: 集合B

    // 遍历集合A中所有的元素，如果发现集合A中的元素，在集合B中不存在，那么false；如果遍历完整个集合，依然没有返回false，那么返回true即可
    var values = this.values();
    for (var i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        return false;
      }
    }

    return true;
  };
}

// test
// var set = new Set();
// set.add("chloe");
// set.add("18");
// set.add("alba");
// console.log(set.add("chloe"));
// console.log(set.values());
// set.remove("18");
// console.log(set.values());
// console.log(set.size());
// console.log(set.has("chloe"));
// set.clear();
// console.log(set.size());

// 并集测试
var setA = new Set();
setA.add("abc");
setA.add("cba");
setA.add("nba");

var setB = new Set();
setB.add("aaa");
setB.add("nba");
setB.add("cca");
setB.add("abc");
setB.add("cba");

var unionSet = setA.union(setB);
var intersectionSet = setA.intersection(setB);
var differenceSet = setA.difference(setB);
var subset = setA.subset(setB);
console.log("unionSet: ", unionSet.values());
console.log("intersectionSet: ", intersectionSet.values());
console.log("differenceSet: ", differenceSet.values());
console.log("subset: ", subset);
