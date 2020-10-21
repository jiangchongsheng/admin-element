var express = require('express');
var router = express.Router();

var db = require("../config/db"); //引入数据库封装模块

// 处理前端请求
/* GET home page. */
/* 这边的 router.get 是接收前端的 get 请求
  第一个参数是路由地址，这边的 '/' 就指根路由，也就是http://localhost:3000 啦
  第二个参数是一个响应接口的回调函数，里面有三个参数，分别是 请求头request 响应体response，和一个next
*/

/* GET home page. */
router.get('/', function(req, res, next) {
    // // 处理好要返回给前端的数据
    // let data = {
    //   name:'xhm',
    //   age:12 }
    // // 用 res.json 方法写接口
    // res.json({
    //   code:1,
    //   msg:'ok',
    //   data:data
    // })

    //查询users表
    db.query("SELECT * FROM user_info", [], function(data, fields){
      res.json(data)
      // res.render('index', { title: 'Express11' });
    })
});

module.exports = router;
