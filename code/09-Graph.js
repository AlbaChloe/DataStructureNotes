var dic = require("./06-Dictionary");
var que = require("./02-Queue");

function Graph() {
  // props: 顶点(数组)/边(字典)
  this.vertexes = []; // 顶点
  this.edges = new dic.Dictionary(); // 边

  // methods
  // 添加顶点
  Graph.prototype.addVertex = function (v) {
    this.vertexes.push(v);
    this.edges.set(v, []);
  };

  // 添加边
  Graph.prototype.addEdge = function (v1, v2) {
    this.edges.get(v1).push(v2);
    this.edges.get(v2).push(v1);
  };

  // toString
  Graph.prototype.toString = function () {
    // 1. 定义字符串，保存最终结果
    var resStr = "";

    // 2. 遍历所有顶点，以及顶点对应的边
    for (var i = 0; i < this.vertexes.length; i++) {
      resStr += this.vertexes[i] + "->";
      var vEdges = this.edges.get(this.vertexes[i]);
      for (var j = 0; j < vEdges.length; j++) {
        resStr += vEdges[j] + " ";
      }
      resStr += "\n";
    }

    return resStr;
  };

  // 初始化颜色
  Graph.prototype.initializeColor = function () {
    var colors = [];
    for (var i = 0; i < this.vertexes.length; i++) {
      colors[this.vertexes[i]] = "white";
    }
    return colors;
  };

  // BFS广度优先搜索: 其中节点的颜色代表状态，白色表示初始颜色未探测，灰色表示探测过但还没有访问完，黑色则表示已经探测完成
  Graph.prototype.bfs = function (initV, handler) {
    // 1. 初始化颜色
    var colors = this.initializeColor();

    // 2. 创建队列
    var queue = new que.Queue();

    // 3. 将顶点加入到队列中
    queue.enqueue(initV);

    // 4. 循环从队列中取出元素
    while (!queue.isEmpty()) {
      // 4.1 从队列中取出一个顶点
      var v = queue.dequeue();

      // 4.2 获取和顶点相连的其他顶点
      var vList = this.edges.get(v);

      // 4.3 将v的颜色变为灰色
      colors[v] = "grey";

      // 4.4 遍历所有的顶点，并且加入到队列中
      for (var i = 0; i < vList.length; i++) {
        var e = vList[i];
        if (colors[e] == "white") {
          colors[e] = "grey";
          queue.enqueue(e);
        }
      }

      // 4.5 访问顶点
      handler(v);

      // 4.6 将顶点颜色设置为黑色
      colors[v] = "black";
    }
  };

  // DFS深度优先搜索
  Graph.prototype.dfs = function (initV, handler) {
    // 1. 初始化颜色
    var colors = this.initializeColor();

    // 2. 从某个顶点开始依次递归访问
    this.dfsVisit(initV, colors, handler);
  };
  Graph.prototype.dfsVisit = function (v, colors, handler) {
    // 1. 将颜色设置为灰色
    colors[v] = "grey";

    // 2. 处理v顶点
    handler(v);

    // 3. 访问v相连的其他顶点
    var vList = this.edges.get(v);
    for (var i = 0; i < vList.length; i++) {
      var e = vList[i];
      if (colors[e] == "white") {
        this.dfsVisit(e, colors, handler);
      }
    }
    // 4. 将v设置为黑色
    colors[v] = "black";
  };
}

// test
var graph = new Graph();

var myVertexes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
myVertexes.forEach((item) => {
  graph.addVertex(item);
});

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");
console.log(graph.toString());

var bfsResStr = "";
graph.bfs(graph.vertexes[0], function (v) {
  bfsResStr += v + "";
});
console.log("bfs: ", bfsResStr);

var dfsResStr = "";
graph.dfs(graph.vertexes[0], function (v) {
  dfsResStr += v + "";
});
console.log("dfs: ", dfsResStr);
