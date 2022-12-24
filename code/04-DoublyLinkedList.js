function DoublyLinkedList() {
  // 内部类：节点类
  function Node(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }

  // props
  this.head = null;
  this.tail = null;
  this.length = 0;

  // methods
  // append
  DoublyLinkedList.prototype.append = function (data) {
    // 1. 创建新元素
    var newNode = new Node(data);

    // 2. 判断数组是否为空
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 因为是双向链表，tail指向最后一个节点，所以可以通过tail找到最后一个节点
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    // 3. 数组长度+1
    this.length += 1;
  };

  // insert
  DoublyLinkedList.prototype.insert = function (position, data) {
    // 1. 越界判断
    if (position < 0 || position > this.length) return false;

    // 2. 创建新节点
    var newNode = new Node(data);

    // 3. 判断多种插入情况
    // 3.1 插入头部
    // 3.1.1 数组为空时直接插入
    if (position === 0) {
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      }
      // 3.1.2 数组已有元素时的插入
      else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
    }
    // 3.2 插入末尾
    else if (position === this.length) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    // 3.2 中间插入
    else {
      var index = 0;
      var current = this.head;
      var previous = null;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }

      previous.next = newNode;
      newNode.prev = previous;
      newNode.next = current;
      current.prev = newNode;
    }

    // 4. length + 1
    this.length += 1;

    return true;
  };

  // get
  DoublyLinkedList.prototype.get = function (position) {
    // 1. 越界判断
    if (position < 0 || position >= this.length) return null;

    // 2. 查找元素
    var mid = this.length / 2;
    var index;
    var current;
    if (position < mid) {
      index = 0;
      current = this.head;
      while (index++ < position) {
        current = current.next;
      }
    } else {
      index = this.length - 1;
      current = this.tail;
      while (index-- > position) {
        current = current.prev;
      }
    }

    return current.data;
  };

  // indexOf
  DoublyLinkedList.prototype.indexOf = function (ele) {
    if (this.length === 0) return -1;
    var index = 0;
    var current = this.head;
    while (current) {
      if (current.data === ele) {
        return index;
      }
      current = current.next;
      index += 1;
    }

    return -1;
  };

  // position
  DoublyLinkedList.prototype.position = function (data) {};

  // update
  DoublyLinkedList.prototype.update = function (position, newData) {
    // 1. 越界判断
    if (position < 0 || position >= this.length) return false;

    // 2. 查找要修改的节点
    var index = 0;
    var current = this.head;
    while (index++ < position) {
      current = current.next;
    }

    // 3. 修改节点信息
    current.data = newData;

    return true;
  };

  // removeAt
  DoublyLinkedList.prototype.removeAt = function (position) {
    // 1. 越界判断
    if (position < 0 || position >= this.length) return null;

    // 2. 查找节点
    var current = this.head;
    // 2.1 当前数组只有一个元素时
    if (this.length === 1) {
      current = this.head;
      this.head = null;
      this.tail = null;
    }
    // 2.2 当前数组元素大于一个时
    else {
      // 2.2.1 删除第一个元素时
      if (position === 0) {
        this.head = this.head.next;
        this.head.prev = null;
      }
      // 2.2.2 删除最后一个元素时
      else if (position === this.length - 1) {
        current = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
      // 2.2.3 删除其他某个元素时
      else {
        var index;
        var mid = this.length / 2;
        if (position < mid) {
          index = 0;
          current = this.head;
          while (index++ < position) {
            current = current.next;
          }
        } else {
          index = this.length - 1;
          current = this.tail;
          while (index-- > position) {
            current = current.prev;
          }
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;
      }
    }

    // 3. length - 1
    this.length -= 1;

    return current.data;
  };

  // remove
  DoublyLinkedList.prototype.remove = function (ele) {
    // 1. 根据要删除的元素获取index
    var index = this.indexOf(ele);

    // 2. 根据index删除对应的元素
    return this.removeAt(index);
  };

  // isEmpty
  DoublyLinkedList.prototype.isEmpty = function () {
    return this.length == 0;
  };

  // size
  DoublyLinkedList.prototype.size = function () {
    return this.length;
  };

  // getHead
  DoublyLinkedList.prototype.getHead = function () {
    return this.head.data;
  };

  // getTail
  DoublyLinkedList.prototype.getTail = function () {
    return this.tail.data;
  };

  // toString & forwardString & backwardString
  DoublyLinkedList.prototype.toString = function () {
    return this.backwardString();
  };
  DoublyLinkedList.prototype.forwardString = function () {
    var current = this.tail;
    var resStr = "";

    while (current) {
      resStr += current.data + " ";
      current = current.prev;
    }

    return resStr;
  };
  DoublyLinkedList.prototype.backwardString = function () {
    var current = this.head;
    var resStr = "";

    while (current) {
      resStr += current.data + " ";
      current = current.next;
    }

    return resStr;
  };
}

// test
var list = new DoublyLinkedList();

list.append("cba");
list.append("abc");
list.append("nba");
list.insert(2, "chloe");
list.insert(0, "npc");
list.insert(5, "end");
list.update(1, "aaa");
console.log("toString:", list.toString());
console.log("removeAt:", list.removeAt(3));
console.log("remove:", list.remove("end"));
console.log("toString:", list.toString());
console.log("getHead:", list.getHead());
console.log("getTail:", list.getTail());
console.log("isEmpty:", list.isEmpty());
console.log("size:", list.size());
console.log("get:", list.get(2));
console.log("indexOf:", list.indexOf("abc"));
console.log("forwardString:", list.forwardString());
