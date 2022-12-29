function ArrayList() {
  // props
  this.array = [];

  // methods
  // 将数据可以插入到数组中的方法
  ArrayList.prototype.insert = function (item) {
    this.array.push(item);
  };

  // toString
  ArrayList.prototype.toString = function () {
    return this.array.join("-");
  };

  // swap
  ArrayList.prototype.swap = function (m, n) {
    var temp = this.array[m];
    this.array[m] = this.array[n];
    this.array[n] = temp;
  };

  // 排序算法
  // 冒泡排序
  ArrayList.prototype.bubbleSort = function () {
    // 1. 获取数组的长度
    var length = this.array.length;

    for (var j = length - 1; j >= 0; j--) {
      // 第一次进来：i = 0，比较 0 和 1 位置的两个数据
      // 最后一个进来：i = length -2，比较length - 2 和length - 1的两个数据
      for (var i = 0; i < j; i++) {
        if (this.array[i] > this.array[i + 1]) {
          this.swap(i, i + 1);
        }
      }
    }
  };

  // 选择排序
  ArrayList.prototype.selectionSort = function () {
    // 1. 获取数组长度
    var length = this.array.length;

    // 2. 外层循环：从0位置开始取数据
    for (var j = 0; j < length - 1; j++) {
      // 内层循环：从i + 1位置开始，和后面的数值进行比较
      var min = j;
      for (var i = min + 1; i < length; i++) {
        if (this.array[min] > this.array[i]) {
          min = i;
        }
      }
      this.swap(min, j);
    }
  };

  // 插入排序
  ArrayList.prototype.insertionSort = function () {
    // 1. 获取数组长度
    var length = this.array.length;

    // 2. 外层循环：从第一个位置开始获取数据，向前面局部有序进行插入
    for (var i = 0; i < length; i++) {
      // 3. 内层循环：获取i位置的元素，和前面的数据依次进行比较
      var temp = this.array[i];
      var j = i;
      while (this.array[j - 1] > temp && j > 0) {
        this.array[j] = this.array[j - 1];
        j--;
      }

      // 4. 将j位置的数据，放置temp就可以了
      this.array[j] = temp;
    }
  };

  // 希尔排序
  ArrayList.prototype.shellSort = function () {
    // 1. 获取长度
    var length = this.array.length;

    // 2. 计算增量值
    var gap = Math.floor(length / 2);

    // 2. 第一层循环：while循环(使gap不断减小)
    while (gap >= 1) {
      // 4. 第一层循环：以gap为增量，进行分组，对分组进行插入排序
      // 重点为：把index = gap作为选中的第一个数据
      for (let i = gap; i < length; i++) {
        let temp = this.array[i];
        let j = i;

        // 5. 第三层循环：寻找正确的插入位置
        while (this.array[j - gap] > temp && j > gap - 1) {
          this.array[j] = this.array[j - gap];
          j -= gap;
        }

        // 6. 将j位置的元素设置为temp
        this.array[j] = temp;
      }

      gap = Math.floor(gap / 2);
    }
  };

  // 快速排序
  ArrayList.prototype.quickSort = function () {
    return this.QuickSort(this.array);
  };
  ArrayList.prototype.QuickSort = function (arr) {
    if (arr.length <= 1) return arr;

    // 1. 选取枢纽(基准元素)
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    // 2. 取出比枢纽元素小的放于左边，比枢纽元素大的放于右边
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    // 3. 递归左边元素和右边元素，并进行拼接
    return [...this.QuickSort(left), pivot, ...this.QuickSort(right)];
  };
}

// test
var list = new ArrayList();

list.insert(66);
list.insert(88);
list.insert(12);
list.insert(87);
list.insert(100);
list.insert(5);
list.insert(566);
list.insert(23);
console.log(list.toString());
// list.bubbleSort();
// list.selectionSort();
// list.insertionSort();
list.shellSort();
console.log(list.toString());
// console.log(list.quickSort());
