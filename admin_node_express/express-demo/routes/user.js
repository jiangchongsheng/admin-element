var express = require('express');
var router = express.Router();
var db = require("../config/db"); //引入数据库封装模块
var jwt = require('jsonwebtoken');//引入token模块

router.get('/login', function(req, res, next) {
  const name = req.query.username
  const password = req.query.password
  const sqlStr = 
  db.query('SELECT * FROM user_info WHERE user = ? AND PASSWORD = ?', [name, password], function(results, fields){
    if (results.length === 1) {
      // token
      var token = jwt.sign({
        name: name,
        password: password
      }, 'signkey', {
        expiresIn : 60*60*24// 授权时效24小时
      });
      res.json({
        code: 1,
        msg: '登陆成功',
        data: results,
        token: token
      })
    } else {
      res.json({
        code: 0,
        msg: '用户名不存在或密码错误',
        data: null
      })
    } 
  })
});

router.get('/info', function(req, res, next) {
  const id = req.query.roleId
  db.query('SELECT * FROM role_info WHERE id = ?', [id], function(results, fields){
    if (results.length === 1) {
      res.json({
        code: 1,
        msg: '操作成功',
        data: results[0]
      })
    } else {
      res.json({
        code: 0,
        msg: '操作失败',
        data: null
      })
    } 
  })
});

module.exports = router;
