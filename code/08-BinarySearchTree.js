function BinarySearchTree() {
  function Node(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  // props
  this.root = null;

  // methods
  // insert
  BinarySearchTree.prototype.insert = function (key) {
    // 1. 根据key创建节点
    var newNode = new Node(key);

    // 2. 判断根节点是否有值
    if (this.root == null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  };
  BinarySearchTree.prototype.insertNode = function (node, newNode) {
    // 小于根节点，则向左查找，判断根节点的左节点
    if (newNode.key < node.key) {
      // 被对比的节点的左节点为空则直接赋值
      if (node.left == null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    }
    // 大于根节点，则向右查找，判断根节点的右节点
    else {
      if (node.right == null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  };

  // preOrderTraverse
  BinarySearchTree.prototype.preOrderTraversal = function (handler) {
    this.preOrderTraversalNode(this.root, handler);
    // 打印 -> 用于调试
    var resStr = "";
    this.preOrderTraversalNode(this.root, function (key) {
      resStr += key + " ";
    });
    return resStr;
  };
  BinarySearchTree.prototype.preOrderTraversalNode = function (node, handler) {
    if (node != null) {
      // 1. 处理经过的节点
      handler(node.key);

      // 2. 查找经过节点的左子节点
      this.preOrderTraversalNode(node.left, handler);

      // 3. 查找经过节点的右子节点
      this.preOrderTraversalNode(node.right, handler);
    }
  };

  // inOrderTraverse
  BinarySearchTree.prototype.inOrderTraversal = function (handler) {
    this.inOrderTraversalNode(this.root, handler);
    // 打印 -> 用于调试
    var resStr = "";
    this.inOrderTraversalNode(this.root, function (key) {
      resStr += key + " ";
    });
    return resStr;
  };
  BinarySearchTree.prototype.inOrderTraversalNode = function (node, handler) {
    if (node != null) {
      // 1. 查找左节点
      this.inOrderTraversalNode(node.left, handler);

      // 2. 处理经过的节点
      handler(node.key);

      // 3. 查找右节点
      this.inOrderTraversalNode(node.right, handler);
    }
  };

  // postOrderTraverse
  BinarySearchTree.prototype.postOrderTraversal = function (handler) {
    this.postOrderTraversalNode(this.root, handler);
    // 打印 -> 用于调试
    var resStr = "";
    this.postOrderTraversalNode(this.root, function (key) {
      resStr += key + " ";
    });
    return resStr;
  };
  BinarySearchTree.prototype.postOrderTraversalNode = function (node, handler) {
    if (node != null) {
      // 1. 查找左子树的节点
      this.postOrderTraversalNode(node.left, handler);
      // 2. 查找右子树的节点
      this.postOrderTraversalNode(node.right, handler);
      // 3. 处理经过的节点
      handler(node.key);
    }
  };

  // min & max value
  BinarySearchTree.prototype.min = function () {
    var node = this.root;
    while (node.left != null) {
      node = node.left;
    }
    return node.key;
  };
  BinarySearchTree.prototype.max = function () {
    var node = this.root;
    while (node.right != null) {
      node = node.right;
    }
    return node.key;
  };

  // search
  BinarySearchTree.prototype.search = function (key) {
    // 1. 获取根节点
    var node = this.root;

    // 2. 循环搜索key
    while (node != null) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else if (node.key == key) {
        return true;
      }
    }

    return false;
  };

  // remove(该部分需结合讲解视频)
  BinarySearchTree.prototype.remove = function (key) {
    // 1. 寻找要删除的节点
    // 1.1 定义变量，保存一些信息
    var current = this.root;
    var parent = null;
    var isLeft = true;

    // 1.2 开始寻找删除的节点
    while (current.key != key) {
      parent = current;
      if (key < current.key) {
        current = current.left;
        isLeft = true;
      } else {
        current = current.right;
        isLeft = false;
      }

      // 已经找到最后的叶子节点了，依然没有找到==key
      if (current == null) return false;
    }

    // 2. 根据对应的情况删除节点
    // 2.1 删除的节点是叶子节点(没有子节点)
    if (current.left == null && current.right == null) {
      // 如果刚好是根节点且根节点没有任何子节点
      if (current == this.root) {
        this.root = null;
      } else {
        isLeft && (parent.left = null);
        !isLeft && (parent.right = null);
      }
    }
    // 2.2 删除的节点有一个子节点
    // 2.3.1 子节点为左子节点
    else if (current.right == null) {
      // 特殊情况：当删除的是根且根节点有一个子节点时，则删除操作就是把当前的子节点赋值给root
      if (current == this.root) {
        this.root = current.left;
      } else if (isLeft) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    }
    // 2.3.2 子节点为右子节点
    else if (current.left == null) {
      if (current == this.root) {
        this.root = current.right;
      } else if (isLeft) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    }
    // 2.3 删除的节点有两个子节点(这种情况找删除节点的前驱节点或后继节点都可，这里找的是后继节点)
    // ps: 前驱节点指删除节点左子树的最大值；后继节点指删除节点右子树的最小值；为什么要找这两点节点是因为要删除节点的话，找这两个节点中的任何一个替换被删除的节点，所做的操作(指向的处理)是最少的
    else {
      // 2.3.1 获取后继节点
      var successor = this.getSuccessor(current);

      // 2.3.2 处理被删除节点的父节点的指向
      if (current == this.root) {
        successor.left = current.left;
        this.root = successor;
      } else if (isLeft) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }
      // 2.3.3 将删除节点的左子树赋值给后继节点
      successor.left = current.left;
    }

    return true;
  };
  // 寻找删除节点的后继节点的方法(并携带被删除节点的右子树)
  BinarySearchTree.prototype.getSuccessor = function (delNode) {
    // 1. 定义变量，来存储临时节点
    var successorParent = delNode;
    var successor = delNode;
    let current = delNode.right;

    // 2. 寻找节点
    while (current != null) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }

    // 3. 如果后继节点不是删除节点的右节点(意思是找到的后继节点是被删除节点的右子树中除了右节点的其他节点，就需要处理该后继节点的父节点指向)
    if (successor != delNode.right) {
      successorParent.left = successor.right;
      successor.right = delNode.right;
    }

    return successor;
  };
}

// test
var bst = new BinarySearchTree();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);
console.log("bst content", bst);
console.log("min value: ", bst.min());
console.log("max value: ", bst.max());
console.log("search value: ", bst.search(15));

console.log(
  "preOrderTraverse: ",
  bst.preOrderTraversal(() => {})
);
console.log(
  "inOrderTraverse: ",
  bst.inOrderTraversal(() => {})
);
console.log(
  "postOrderTraverse: ",
  bst.postOrderTraversal(() => {})
);

bst.remove(8);
bst.remove(11);
// console.log(bst.remove(24));
console.log(
  "res of removal finished: ",
  bst.inOrderTraversal(() => {})
);
