function Stack() {
  this.items = [];

  Stack.prototype.push = function (item) {
    this.items.push(item);
    return this.items.length;
  };

  Stack.prototype.pop = function () {
    return this.items.pop();
  };

  Stack.prototype.peek = function () {
    return this.items[this.items.length - 1];
  };

  Stack.prototype.size = function () {
    return this.items.length;
  };

  Stack.prototype.isEmpty = function () {
    return this.items.length == 0;
  };

  Stack.prototype.toString = function () {
    var resStr = "";
    for (let i = 0; i < this.items.length; i++) {
      resStr += this.items[i] + "";
    }
    return resStr;
  };
}

// test
// var s = new Stack();
// s.push(20);
// s.push(10);

// 应用：
// 将十进制转成二进制
function decToBin(decNumber) {
  // 1. 定义栈对象
  var stack = new Stack();

  // 2. 循环操作
  while (decNumber > 0) {
    // 2.1 获取余数，并且放入栈中
    stack.push(decNumber % 2);

    // 2.2 获取整除后的结果作为下一次运算的数字
    decNumber = Math.floor(decNumber / 2);
  }

  // 3. 从栈中取出0和1
  var binaryStr = "";
  while (!stack.isEmpty()) {
    binaryStr += stack.pop();
  }
  return binaryStr;
}

let res = decToBin(1000);
console.log(res);
