var $id = function(id) { return document.getElementById(id); }

sigma.parsers.json(FILE_PATH, {
  // container: 'container',
  renderer: {
    container: "graph-container",
    type: "canvas"
  },
  settings: SETTINGS
},
function(s) {
  var renderer = s.renderers[0];
  var container = renderer.container;
  container.style.cursor = "pointer";
  // container.style.width = SCREEN_SIZE;
  // container.style.height = SCREEN_SIZE;
  var angUnit = 360 / s.graph.nodes().length * 1000;
  var origin = SCREEN_SIZE * 0.5;
  // var radius = SCREEN_SIZE * 0.5;

  // node初期設定
  s.graph.nodes().forEach(function(n, i) {
    // 位置
    var deg = angUnit * i * RAD_UNIT;
    var r = 30 + i;
    n.x = origin + r * Math.cos(deg);
    n.y = origin + r * Math.sin(deg);
    // n.x = Math.random() * SCREEN_SIZE;
    // n.y = Math.random() * SCREEN_SIZE;

    n.color = n.originalColor = TYPE_COLOR_TABLE[n.idolType];
    n.size = NODE_SIZE;
  });

  // edge setup
  s.graph.edges().forEach(function(edge) {
    edge.size = EDGE_SIZE;
    edge.hidden = true;
    // edge.originalLabel = edge.label || "no label";
  });

  // ホバー or click操作
  s.bind('clickNode', function(e) {
  // s.bind('overNode', function(e) {
    var node = e.data.node;
    var targetNodes = [];
    var sourceNodes = [];

    // edge操作、 関連性チェック
    s.graph.edges().forEach(function(edge) {
      // to
      if (edge.source === node.id) {
        edge.color = EDGE_ACTIVE_COLOR["source"];
        if (edge.hidden) edge.hidden = false;
        // edge.label = edge.originalLabel;
        targetNodes.push(s.graph.nodes(edge.target));
      }

      // from
      else if (edge.target === node.id) {
        edge.color = EDGE_ACTIVE_COLOR["target"];
        // edge.label = edge.originalLabel;
        if (edge.hidden) edge.hidden = false;
        sourceNodes.push(s.graph.nodes(edge.source));
      }

      // no connection
      else {
        edge.hidden = true;
      }
    });

    // node操作
    s.graph.nodes().forEach(function(n) {
      if (n.id === node.id) {
        // self
        n.color = "#ff0000";
      } else {
        // 非アクティブ
        n.color = INACTIVE_COLOR;
      }
    });

    // 紹介された
    $id("recommending-idols").innerHTML = "";
    $id('recommending-idols-title').innerText = node.label + "は…";
    sourceNodes.forEach(function(n) {
      n.color = NODE_ACTIVE_COLOR["source"];

      var li = document.createElement('li');
      var div = document.createElement('div');
      div.className = "p-tag "+ TYPE_CSS_CLASS_TABLE[n.idolType];
      var content = "<p>"+ n.label +"<\/p><q class='u-quote t-stress'>"+ n.title +"<q>"
      div.innerHTML = content;
      li.appendChild(div);
      $id("recommending-idols").appendChild(li);
    });

    // 紹介した
    $id("recommended-idols").innerHTML = "";
    targetNodes.forEach(function(n) {
      n.color = NODE_ACTIVE_COLOR["target"];

      var li = document.createElement('li');
      li.innerText = n.label;
      li.className = "p-tag "+ TYPE_CSS_CLASS_TABLE[n.idolType];
      $id("recommended-idols").appendChild(li);
    });

    // タイトルを変える
    $id("focused-idol").innerHTML = node.title;
    $id("focused-idol-comment").innerHTML = node.comment;

    s.refresh();
  });

  // リセットする？
  // s.bind('clickStage', function(e) {
  //   s.graph.nodes().forEach(function(n) {
  //     n.color = n.originalColor;
  //   });
  //   s.graph.edges().forEach(function(edge) {
  //     edge.hidden = true;
  //   });
  //   s.refresh();
  // });

  // アルゴリズムで並び替える、めっちゃ重い
  // var config = {
  //   nodeMargin: 3.0,
  //   scaleNodes: 1.3
  // };
  // var listener = s.configNoverlap(config);
  // s.startNoverlap(config);
  // s.startForceAtlas2(config);

  // s.bind('overEdge', function(e) {
  //   console.log(e)
  // })

  // s.bind('outNode', function(e) {
    // console.log("oout", e)
  // })

  s.refresh();
});
