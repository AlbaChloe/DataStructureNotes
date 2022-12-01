// function Queue() {
//   // prop
//   this.items = [];

//   // method
//   Queue.prototype.enqueue = function (item) {
//     this.items.push(item);
//   };

//   Queue.prototype.dequeue = function () {
//     return this.items.shift();
//   };

//   Queue.prototype.front = function () {
//     return this.items[0];
//   };

//   Queue.prototype.isEmpty = function () {
//     return this.items.length == 0;
//   };

//   Queue.prototype.size = function () {
//     return this.items.length;
//   };

//   Queue.prototype.toString = function () {
//     var resStr = "";
//     for (let i = 0; i < this.items.length; i++) {
//       resStr += this.items[i] + "";
//     }
//     return resStr;
//   };
// }

// // test
// var queue = new Queue();
// queue.enqueue("abc");
// queue.enqueue("cba");
// queue.enqueue("cba");
// queue.dequeue();
// console.log(queue.front());
// console.log(queue);
// console.log(queue.toString());

// // 应用：击鼓传花
// function getFinalWinner(nameList, num) {
//   let queue = new Queue();
//   for (let i = 0; i < nameList.length; i++) {
//     queue.enqueue(nameList[i]);
//   }

//   while (queue.size() > 1) {
//     for (let i = 0; i < num - 1; i++) {
//       queue.enqueue(queue.dequeue());
//     }
//     queue.dequeue();
//   }

//   const winnerIndex = queue.front();
//   return winnerIndex;
// }

// let res = getFinalWinner(["lily", "lucy", "Tom", "lilei", "why"], 3);
// console.log(res);

// 应用：优先级队列
function PriorityQueue() {
  // 创建一个内部类
  function QueueElement(element, priority) {
    this.element = element;
    this.priority = priority;
  }
  this.items = [];

  // 实现插入方法
  PriorityQueue.prototype.enqueue = function (ele, priority) {
    // 1. 创建优先级对象
    var queueEle = new QueueElement(ele, priority);

    // 2. 判断队列是否为空
    if (this.items.length == 0) {
      this.items.push(queueEle);
    } else {
      var added = false;
      for (var i = 0; i < this.items.length; i++) {
        if (queueEle.priority < this.items[i].priority) {
          this.items.splice(i, 0, queueEle);
          added = true;
          break;
        }
      }

      if (!added) {
        this.items.push(queueEle);
      }
    }
  };

  PriorityQueue.prototype.dequeue = function () {
    return this.items.shift();
  };

  PriorityQueue.prototype.front = function () {
    return this.items[0];
  };

  PriorityQueue.prototype.isEmpty = function () {
    return this.items.length == 0;
  };

  PriorityQueue.prototype.size = function () {
    return this.items.length;
  };

  PriorityQueue.prototype.toString = function () {
    var resStr = "";
    for (let i = 0; i < this.items.length; i++) {
      resStr += this.items[i].element + "-" + this.items[i].priority + " ";
    }
    return resStr;
  };
}

// test
var pq = new PriorityQueue();
pq.enqueue("abc", 111);
pq.enqueue("cba", 200);
pq.enqueue("nba", 50);
pq.enqueue("nba", 66);
console.log(pq.toString());
