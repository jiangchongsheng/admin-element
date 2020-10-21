var mysql = require('mysql');
var dbConfig = require('./db.config'); 
var token = require("./token"); // 引入token来判断


module.exports = {
    query : function(sql, params, callback){
        // 先校验token权限 (有问题)
        // token.setToken('测试', '123456')
        // if (token.verToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5rWL6K-VIiwiX2lkIjoiMTIzNDU2IiwiaWF0IjoxNjAzMjQ1NTQ4LCJleHAiOjE2MDMyNDYyNjh9.9uIepPvV6Knc8RNgTIguHJWOi6Z9bT_C962nXDnfHVU')) {
        //     callback({ code: 0, msg:'token不存在或过期', status: 401 })
        // }
        

        //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
        var connection = mysql.createConnection(dbConfig);        
        connection.connect(function(err){
            if(err){
                console.log('数据库链接失败');
                throw err;
            }
         //开始数据操作
        connection.query( sql, params, function(err,results,fields ){
           if(err){
                console.log('数据操作失败');
                throw err;
            }


            
            
            //将查询出来的数据返回给回调函数，这个时候就没有必要使用错误前置的思想了，因为我们在这个文件中已经对错误进行了处理，如果数据检索报错，直接就会阻塞到这个文件中
            callback && callback({ code: 1, msg:'操作成功', status: 200, data:results });
            // results作为数据操作后的结果，fields作为数据库连接的一些字段，大家可以打印到控制台观察一下
            // 停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
             connection.end(function(err){
                  if(err){
                      console.log('关闭数据库连接失败！');
                      throw err;
                  }
              });
           });
       });
    }
};