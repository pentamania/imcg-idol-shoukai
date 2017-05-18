/**
 * 元のハッシュデータをsigma.js用に加工する
 * "node preprocess.js [min]" in Command line
 *
 */
var args = process.argv.slice(2);
var minimize = (args[0] === 'min') ? true : false;
console.log("Json minimizing: "+minimize);

var fs = require('fs');
var data = require('./imas_cg_hash/recommend2017.json');
var processedData = {nodes: [], edges: []};
var edgeId = 0;
var idolType = "Cu";
var outPutPath = (minimize) ? './data/draw_data.min.json' : './data/draw_data.json';

for (id in data) {
  var idolData = data[id];

  // タイプ切り替え（id順に並んでいる場合）
  if (idolData.idol_name === "渋谷凛") idolType = "Co";
  if (idolData.idol_name === "本田未央") idolType = "Pa";

  // node
  processedData.nodes.push({
    "id": Number(id),
    "label": idolData.idol_name,
    "title": idolData.title,
    "comment": idolData.comment,
    "idolType": idolType,
  });

  // edge
  var rec_idols = idolData.idols;
  rec_idols.forEach((rIdol)=>{
    processedData.edges.push({
      "id": "e"+ edgeId,
      // "label": idolData.comment,
      // "type": "arrow",
      "source": idolData.idol_id,
      "target": rIdol.idol_id
    });
    edgeId++;
  });
}

// データ出力
// console.log(processedData);
if (minimize) {
  fs.writeFile(outPutPath, JSON.stringify(processedData));
} else {
  fs.writeFile(outPutPath, JSON.stringify(processedData, null, '    '));
}