var RAD_UNIT = Math.PI / 180;
var FILE_PATH = './data/draw_data.min.json';

var SCREEN_SIZE = 100;
var NODE_SIZE = 6
var EDGE_SIZE = 3;
var TYPE_COLOR_TABLE = {
  "Cu": '#FF65CA',
  "Co": '#4246FA',
  "Pa": '#F2CB17',
};
var TYPE_CSS_CLASS_TABLE = {
  "Cu": 't-cute',
  "Co": 't-cool',
  "Pa": 't-passion',
};
var EDGE_ACTIVE_COLOR = {
  "source": "rgba(50, 224, 47, 0.6)",
  "target": "rgba(234, 44, 209, 0.6)",
  // "both": "rgba(226, 24, 24, 0.7)",
};
var NODE_ACTIVE_COLOR = {
  "source": "#C7103F",
  "target": "#17BA0B",
};
var INACTIVE_COLOR = "rgba(100,100,100, 0.3)";
var NODE_LABEL_COLOR = "#3399aa";
// var NODE_LABEL_COLOR = '#A80D0D';

var SETTINGS = {
  autoRescale: false,
  defaultLabelSize: 10,　
  defaultNodeSize: 4,　
  // maxNodeSize: 10,　
  // minNodeSize: 10,
  // defaultNodeColor: NODE_LABEL_COLOR,

  labelThreshold: 1, // どの拡大率でも表示
  labelSize: "proportional", // グラフ比率に応じて変更
  labelSizeRatio: 1.5, // 上のlabelSizeの設定とセットで使う
  // labelHoverShadow: 'node',
  defaultLabelColor: NODE_LABEL_COLOR,
  labelColor: "node", //ノードの色と合わせる

  // 以下どれかtrueにすると異常に重くなる？
  // enableHovering: true,
  // enableEdgeHovering: true,
  // edgeHoverColor: 'edge',
  defaultEdgeType: 'arrow',
  minArrowSize: 3,
  edgeLabelThreshold: 4,
  maxEdgeSize: 3,
  // edgeLabelSize: 'proportional',
  // defaultLabelAlignment: "center" //効かない
};