const db = require('../../db');
const seq = require('sequelize');

var Model = db.defineModel('notices', {
  content: seq.STRING(9000),
  title: seq.STRING(30),
  startDate: seq.BIGINT,
  expireDate: seq.BIGINT,
  gmId: seq.INTEGER(10),
});
Model.sync({force: false});
// 导出模型对象
module.exports = Model;







