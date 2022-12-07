// 链地址法
function HashTable() {
  // props
  // loadFactor > 0.75 -> expand
  // loadFactor < 0.25 -> minimize
  this.storage = [];
  this.count = 0;
  this.limit = 7;

  // methods
  // 哈希函数
  // 1. 把字符串转成比较大的数组：hashCode
  // 2. 将大的数字hashCode压缩到数组范围(大小)之内
  HashTable.prototype.hashFunc = function (str, size) {
    // 1. 定义hashCode变量
    var hashCode = 0;

    // 2. 霍纳算法，来计算hashCode的值
    for (var i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i);
    }

    // 3. 取余操作
    var index = hashCode % size;

    return index;
  };

  // 插入&修改数据
  HashTable.prototype.put = function (key, value) {
    // 1. 根据key获取对应的index
    var index = this.hashFunc(key, this.limit);

    // 2. 根据index取出对应的bucket
    var bucket = this.storage[index];

    // 3. 判断bucket是否为空，如为空说明之前没有任何内容，则创建一个
    if (bucket == null) {
      bucket = [];
      this.storage[index] = bucket;
    }

    // 4. 判断是否是修改数据
    for (var i = 0; i < bucket.length; i++) {
      // 这里tuple为bucket中存储key和value的数组；eg: bucket: [['name', 'chloe'], ['age', 18]]
      var tuple = bucket[i];
      if (tuple[0] == key) {
        tuple[1] = value;
        return;
      }
    }

    // 5. 进行添加操作
    bucket.push([key, value]);
    this.count += 1;

    // 6. 判断loadFactor > 0.75，如大于则做扩容操作
    if (this.count > this.limit * 0.75) {
      var newSize = this.limit * 2;
      var newPrime = this.getPrime(newSize);
      this.resize(newPrime);
    }
  };

  // 获取
  HashTable.prototype.get = function (key) {
    // 1. 根据key获取对应的index
    var index = this.hashFunc(key, this.limit);

    // 2. 根据index获取对应的bucket
    var bucket = this.storage[index];

    // 3. 判断bucket是否为null
    if (bucket == null) {
      return null;
    }

    // 4. bucket有值的话查找与key相同键的键值对(线性查找)
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i];
      if (tuple[0] == key) {
        return tuple[1];
      }
    }

    // 5. 依然没有找到，那么返回null
    return null;
  };

  // 删除
  HashTable.prototype.remove = function (key) {
    // 1. 根据key获取index
    var index = this.hashFunc(key, this.limit);

    // 2. 根据index获取bucket
    var bucket = this.storage[index];

    // 3. 判断bucket是否为null
    if (bucket == null) return null;

    // 4. 查找与该key相同键的键值对，并赋值为null
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i];
      if (tuple[0] == key) {
        bucket.splice(i, 1);
        this.count -= 1;

        // 5. 判断loadFactor < 0.25，若小于则做缩小容量的操作
        if (this.limit > 7 && this.count < this.limit * 0.25) {
          var newSize = Math.floor(this.limit / 2);
          var newPrime = this.getPrime(newSize);
          this.resize(newPrime);
        }

        return tuple[1];
      }
    }

    // 6. 依然没有找到
    return null;
  };

  // isEmpty
  HashTable.prototype.isEmpty = function () {
    return this.count == 0;
  };

  // size
  HashTable.prototype.size = function () {
    return this.count;
  };

  // 扩容/缩小容量
  HashTable.prototype.resize = function (newLimit) {
    // 1. 保存旧的数组
    var oldStorage = this.storage;

    // 2. 重置所有的属性
    this.storage = [];
    this.count = 0;
    this.limit = newLimit;

    // 3. 遍历oldStorage中所有的bucket
    for (var i = 0; i < oldStorage.length; i++) {
      // 3. 取出对应的bucket
      var bucket = oldStorage[i];

      // 3.2 判断bucket是否为null
      if (bucket == null) {
        continue;
      }

      // 3.3 bucket中有数据，那么取出数据，重新插入
      for (var j = 0; j < bucket.length; j++) {
        var tuple = bucket[j];
        this.put(tuple[0], tuple[1]);
      }
    }
  };

  // 判断是否质数
  HashTable.prototype.isPrime = function (num) {
    // 更高效的判断质数的方法：
    // 因为一个数若可以进行因数分解，那么分解时得到的两个数一定是一个小于sqrt(n)，一个大于sqrt(n)的，所以我们遍历到sqrt(n)即可
    // eg: 16它的平方根为4，进行因数分解一个一定是小于4的，另一个一定是大于4的，比如 2 * 8

    // 1. 获取num的平方根
    var temp = parseInt(Math.sqrt(num));

    // 2. 循环判断
    for (var i = 2; i <= temp; i++) {
      if (num % i == 0) {
        return false;
      }
    }

    return true;
  };

  // 获取质数
  HashTable.prototype.getPrime = function (num) {
    while (!this.isPrime(num)) {
      num++;
    }
    return num;
  };
}

// test
var ht = new HashTable();
ht.put("abc", "123");
ht.put("cba", "321");
ht.put("nba", "521");
ht.put("mba", "520");
console.log(ht);
console.log("get: ", ht.get("abc"));
ht.put("abc", "111");
console.log("get: ", ht.get("abc"));
ht.remove("abc");
console.log("get: ", ht.get("abc"));
ht.put("test", "msg1");
ht.put("test2", "msg2");
ht.put("test3", "msg3");
ht.put("here", "load factor greater than 0.75");
console.log(ht);
