const express = require('express')
const mysql = require('mysql')

// var sd = require('silly-datetime');

const cors = require('cors')		// 跨域
const bodyParser = require('body-parser')   // 解析参数
const app = express()
const router = express.Router()
//上面是引入各种模块

//启动项目，端口号为8000
app.listen('8088', () => console.log('服务启动'))

//数据库信息，密码一般，默认root，我是修改过
const option = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'jiang', // 改成你的数据库名称
  connectTimeout: 5000, // 连接超时
  multipleStatements: false // 是否允许一个query中包含多条sql语句
}

app.use(cors()) //解决跨域
app.use(bodyParser.json()) //json请求
app.use(bodyParser.urlencoded({ extended: false })) // 表单请求

//连接数据库
const conn = mysql.createConnection(option)

//all代表所有的请求方式(包括get/post)  '/user' 给一个路径(自己定义)  req代表发起请求(request)   res代表接收请求(response) 
// app.all('/user',(req,res)=>{
//     console.log(req);
//     // 选择user表 根据你自己的表名  用json的格式输出
// 	conn.query('SELECT * From user_info',(err,result)=>res.json(result))
// })


// 角色列表信息
app.get('/api/getRoleInfoList', (req, res) => {
  const sqlRole = 'SELECT * From role_info'
  conn.query(sqlRole, (err, results) => {
    if (err) {
      return res.json({ code: 0, message: '获取数据失败', affectedRows: 0 })
    } else {
      res.json({
        code: 1, message: "获取成功", data: results, affectedRows: 0
      })
    }
  })
})

// 根据id查询角色详情
app.get('/api/getRoleDetails', (req, res) => {
  const id = req.query.id
  console.log(req.query.id)

  const sqlStr = 'select * from role_info where roleId = ?'
  conn.query(sqlStr, id, (err, results) => {
    if (err) {
      return res.json({ code: 0, message: '获取数据失败', affectedRows: 0 })
    } else if (results.length !== 1) {
      return res.json({ code: 0, message: '数据不存在', affectedRows: 0 })
    } else {
      res.json({
        code: 1, message: "获取成功", data: results, affectedRows: 0
      })
    }
  })
})



// 根据ID 删除数据
app.get('/api/delRole', (req, res) => {
  const id = req.query.id
  const sqlStr = 'delete role_info from role_info where roleId = ? '
  conn.query(sqlStr, id, (err, results) => {
    if (err) return res.json({ code: 0, message: '删除失败', affectedRows: 0 })
    if (results.affectedRows !== 1) return res.json({ code: 0, message: '删除失败', affectedRows: 0 })
    res.json({ code: 1, message: '删除成功', affectedRows: results.affectedRows })
  })
})



// 添加数据
app.post('/api/addRole', (req, res) => {
  // const hero = req.body
  const sqlStr = 'INSERT INTO role_info(roleName,roleDescription,roleStatus, perms) VALUES(?,?,?,?)'
  // var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
  var data = [req.body.roleName, req.body.roleDescription, 1, req.body.perms]
  conn.query(sqlStr, data, (err, results) => {
    if (err) return res.json({ code: 0, message: '添加失败', affectedRows: 0 })
    if (results.affectedRows !== 1) return res.json({ code: 0, message: '添加失败', affectedRows: 0 })
    res.json({ code: 1, message: '添加成功', affectedRows: results.affectedRows })
  })
})


// 输出的内容
function Result ({ code = 1, msg = '', data = {} }) {
  this.code = code;
  this.msg = msg;
  this.data = data
}
