var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('./../db/dbconfig');
var userSQL = require('./../db/usersql');
var pool = mysql.createPool(dbconfig.mysql);
var responseJSON = function (res, ret) {
  if (typeof ret === "undefined") {
    res.json({
      code: '-200', msg: '操作失败 '
    });
  } else {
    res.json(ret);
  }
}
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
let users = null;
router.get('/getAll', function (req, res, next) {
  pool.getConnection(function (err, conn) {
    var param = req.query || req.params;
    conn.query(userSQL.queryAll, null,
      function (err, ret) {
        if (!err) {
          if (ret) {
            users = JSON.stringify(ret);
            ret = {
              code: 200,
              msg: 'get all user',
              data: ret
            }
          }
        } else {
          ret = {
            code: 500,
            msg: 'Serve is error',
            data: err
          }
        }
        responseJSON(res, ret);
        conn.release();
      });
  });
});
// 添加用户
router.get('/addUser', function (req, res, next) {


  // res.send('mason test here erer1234');
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.query || req.params;
    // 建立连接 增加一个用户信息 
    connection.query(userSQL.insert, [param.id, param.name], function (err, result) {
      if (!err) {
        if (result) {
          result = {
            code: 200,
            msg: '增加成功'
          };
        }
      } else {
        console.log('err detail: ', JSON.stringify(err));
      }

      // 以json形式，把操作结果返回给前台页面     
      responseJSON(res, result);

      // 释放连接  
      connection.release();

    });
  });
});

module.exports = router;
