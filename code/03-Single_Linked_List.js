// 链表类
function LinkedList() {
  // 内部类：节点类
  function Node(data) {
    this.data = data;
    this.next = null;
  }

  // props
  this.head = null;
  this.length = 0;

  // methods
  // append
  LinkedList.prototype.append = function (data) {
    // 1. 创建一个新节点
    var newNode = new Node(data);

    // 2. 判断是否添加的是第一个节点
    if (this.length == 0) {
      this.head = newNode;
    } else {
      // 找到最后一个节点
      var current = this.head;
      while (current.next) {
        current = current.next;
      }
      // 最后一个节点的next指向新的节点
      current.next = newNode;
    }

    // 3. length+1
    this.length += 1;
  };

  // insert
  LinkedList.prototype.insert = function (position, data) {
    // 1. 对position进行越界判断
    if (position < 0 || position > this.length) return false;

    // 2. 根据data创建newNode
    var newNode = new Node(data);

    // 3. 判断插入的位置是否为第一个
    if (position == 0) {
      // 将要插入的节点的next指向当前的第一个元素，再把head指向新插入的节点
      newNode.next = this.head;
      this.head = newNode;
    } else {
      var index = 0;
      var current = this.head;
      // 找到要插入的位置的前一个元素，将前一个元素本来的next赋给要插入的新节点，再把前一个元素的next指向要插入的新节点
      while (index++ < position - 1) {
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
    }

    // 4. length+1
    this.length += 1;

    return true;
  };

  // get
  LinkedList.prototype.get = function (position) {
    // 1. 越界判断
    if (position < 0 || position >= this.length) return null;

    // 2. 获取对应的data
    var current = this.head;
    var index = 0;
    while (index++ < position) {
      current = current.next;
    }
    return current.data;
  };

  // indexOf
  LinkedList.prototype.indexOf = function (ele) {
    // 1. 定义变量
    var index = 0;
    var current = this.head;

    // 2. 开始查找
    // 老师的方法
    while (current) {
      if (current.data === ele) return index;
      current = current.next;
      index += 1;
    }

    // 3. 找到最后没有找到，返回-1
    return -1;

    // 自己的方法
    // while (index < this.length) {
    //   if (current.data == ele) break;
    //   if (index == this.length - 1 && current.data != ele) {
    //     index = -1;
    //     break;
    //   }
    //   index += 1;
    //   current = current.next;
    // }
    // return index;
  };

  // update
  LinkedList.prototype.update = function (position, data) {
    // 1. 越界判断
    if (position < 0 || position >= this.length) return false;

    // 2. 查找要修改的节点
    var index = 0;
    var current = this.head;
    while (index++ < position) {
      current = current.next;
    }

    // 3. 将position位置的节点data修改为新数据
    current.data = data;
    return true;
  };

  // removeAt
  LinkedList.prototype.removeAt = function (position) {
    // 1. 越界判断
    if (position < 0 || position >= this.length) return null;

    // 2. 判断删除的是否为第一个节点
    var current = this.head;
    if (position === 0) {
      this.head = this.head.next;
      return;
    } else {
      // 3. 查找要删除的节点
      var index = 0;
      var previous = null;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      // 前一个节点的next指向current的next即可
      previous.next = current.next;
    }

    // 4. length -1
    this.length -= 1;
    return current.data;
  };

  // remove
  LinkedList.prototype.remove = function (data) {
    // 1. 获取data的位置
    var position = this.indexOf(data);

    // 2. 根绝位置信息，删除节点
    return this.removeAt(position);
  };

  // isEmpty
  LinkedList.prototype.isEmpty = function () {
    return this.length === 0;
  };

  // size
  LinkedList.prototype.size = function () {
    return this.length;
  };

  // toString
  LinkedList.prototype.toString = function () {
    // 1. 定义变量
    var current = this.head;
    var listStr = "";

    // 2. 循环获取一个个的节点
    while (current) {
      listStr += current.data + " ";
      current = current.next;
    }

    return listStr;
  };
}

// test
let list = new LinkedList();
list.append("abc");
list.append("cba");
list.append("nba");
list.insert(2, "chloe");
console.log(list.get(3));
console.log(list.indexOf("cba"));
console.log(list.update(2, "hellen"));
console.log(list.toString());
list.removeAt(2);
list.remove("cba");
console.log(list.isEmpty());
console.log(list.size());
console.log(list.toString());
