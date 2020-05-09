const express = require('express')
const mysql = require('mysql')

const moment = require('moment')
var jwt = require('jsonwebtoken')

const cors = require('cors')		// 跨域
const bodyParser = require('body-parser') // 解析参数
const app = express()
const router = express.Router()
// 上面是引入各种模块

// 启动项目，端口号为8000
app.listen('8088', () => console.log('服务启动'))

// 数据库信息，密码一般，默认root，我是修改过
const option = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'jiang', // 改成你的数据库名称
  connectTimeout: 5000, // 连接超时
  multipleStatements: false // 是否允许一个query中包含多条sql语句
}

app.use(cors()) // 解决跨域
app.use(bodyParser.json()) // json请求
app.use(bodyParser.urlencoded({ extended: false })) // 表单请求

// 连接数据库
const conn = mysql.createConnection(option)

// all代表所有的请求方式(包括get/post)  '/user' 给一个路径(自己定义)  req代表发起请求(request)   res代表接收请求(response)
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 登录
app.get('/api/login', (req, res) => {
  const name = req.query.username
  const password = req.query.password
  const sqlStr = 'select * from user_info where user = ?'
  conn.query(sqlStr, name, (err, results) => {
    if (err) {
      return res.json({ code: 0, message: '用户名不存在或密码错误', affectedRows: 0 })
    } else {
      var isTrue = false
      var data = {}
      for (var i = 0; i < results.length; i++) {
        if (results[i].user == name && results[i].password == password) {
          isTrue = true
          data = results[i]
        }
      }
      if (isTrue) {
        res.json({
          code: 1, message: '登陆成功', data: data, affectedRows: 0
        })
      } else {
        return res.json({ code: 0, message: '用户名不存在或密码错误', affectedRows: 0 })
      }
    }
  })
})

// 用户列表信息
app.get('/api/getUserInfoList', (req, res) => {
  // DESC(倒序，ASC正序(默认)
  let n = +req.query.currentPage
  let s = req.query.pageSize
  const sqlAllRole = `SELECT * FROM user_info`
  const sqlRole = `SELECT * FROM user_info WHERE userName LIKE '%${req.query.userName}%' Order By creationTime Desc LIMIT ${(n - 1) * s},${s}`
  console.log(sqlRole)
  // 查所有
  conn.query(sqlAllRole, (err1, results1) => {
    if (err1) {
      return res.json({ code: 0, message: '获取数据失败', affectedRows: 0 })
    } else {
      let total = results1.length || 0
      conn.query(sqlRole, (err2, results2) => {
        if (err2) {
          return res.json({ code: 0, message: '获取数据失败', affectedRows: 0 })
        } else {
          console.log(results2)
          res.json({
            code: 1, message: '获取成功', total: total, data: results2, affectedRows: 0
          })
        }
      })
    }
  })
})






// 根据name查询角色信息
app.get('/api/getRoleInfo', (req, res) => {
  const name = req.query.roleName
  const sqlStr = 'select * from role_info where roleName = ?'
  conn.query(sqlStr, name, (err, results) => {
    if (err) {
      return res.json({ code: 0, message: '获取数据失败', affectedRows: 0 })
    } else if (results.length !== 1) {
      return res.json({ code: 0, message: '数据不存在', affectedRows: 0 })
    } else {
      res.json({
        code: 1, message: '获取成功', data: results[0], affectedRows: 0
      })
    }
  })
})

// 角色列表信息
app.get('/api/getRoleInfoList', (req, res) => {
  // DESC(倒序，ASC正序(默认)
  let n = +req.query.currentPage
  let s = req.query.pageSize
  const sqlAllRole = `SELECT * FROM role_info`
  const sqlRole = `SELECT * FROM role_info WHERE roleName LIKE '%${req.query.roleName}%' Order By creationTime Desc LIMIT ${(n - 1) * s},${s}`
  // 查所有
  conn.query(sqlAllRole, (err1, results1) => {
    if (err1) {
      return res.json({ code: 0, message: '获取数据失败', affectedRows: 0 })
    } else {
      let total = results1.length || 0
      conn.query(sqlRole, (err2, results2) => {
        if (err2) {
          return res.json({ code: 0, message: '获取数据失败', affectedRows: 0 })
        } else {
          res.json({
            code: 1, message: '获取成功', total: total, data: results2, affectedRows: 0
          })
        }
      })
    }
  })
})

// 根据id查询角色详情
app.get('/api/getRoleDetails', (req, res) => {
  const id = req.query.id
  const sqlStr = 'select * from role_info where roleId = ?'
  conn.query(sqlStr, id, (err, results) => {
    if (err) {
      return res.json({ code: 0, message: '获取数据失败', affectedRows: 0 })
    } else if (results.length !== 1) {
      return res.json({ code: 0, message: '数据不存在', affectedRows: 0 })
    } else {
      res.json({
        code: 1, message: '获取成功', data: results, affectedRows: 0
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
  const name = req.body.roleName
  const sqlStr = 'select * from role_info where roleName = ?'
  conn.query(sqlStr, name, (err, results) => {
    if (err) {
      return res.json({ code: 0, message: '添加失败', affectedRows: 0 })
    } else if (results.length !== 0) {
      return res.json({ code: 0, message: '角色名称已存在', affectedRows: 0 })
    } else {
      // 新增
      const addSqlStr = 'INSERT INTO role_info(roleName,roleDescription,roleStatus, perms, creationTime) VALUES(?,?,?,?,?)'
      var createtime = moment().format('YYYY-MM-DD HH:mm:ss')
      var data = [req.body.roleName, req.body.roleDescription, 1, req.body.perms, createtime]
      conn.query(addSqlStr, data, (addErr, addResults) => {
        if (addErr) return res.json({ code: 0, message: '添加失败', affectedRows: 0 })
        if (addResults.affectedRows !== 1) return res.json({ code: 0, message: '添加失败', affectedRows: 0 })
        res.json({ code: 1, message: '添加成功', affectedRows: addResults.affectedRows })
      })
    }
  })
})

// 修改 (name 不能重复)
app.post('/api/updateRole', (req, res) => {
  const id = req.body.id
  const name = req.body.roleName
  const sqlStr = 'select * from role_info where roleId = ?'
  conn.query(sqlStr, id, (err, results) => {
    if (err) {
      return res.json({ code: 0, message: '修改失败', affectedRows: 0 })
    } else if (results.length !== 1) {
      return res.json({ code: 0, message: '数据不存在', affectedRows: 0 })
    } else {
      let updateTime = moment().format('YYYY-MM-DD HH:mm:ss')
      let data = [req.body.roleName, req.body.roleDescription, req.body.perms, updateTime, req.body.id]
      const sqlStr3 = 'update role_info set roleName = ?,roleDescription= ?,perms = ?,updateTime = ? where roleId = ?'
      if (results[0].roleName === name) {


        conn.query(sqlStr3, data, (err3, results3) => {
          if (err3) return res.json({ code: 0, message: '修改失败', affevtedRows: 0 })
          // 影响行数不等于1
          if (results3.affectedRows !== 1) return res.json({ code: 0, message: '修改对象不存在', affectedRows: 0 })
          res.json({ code: 1, message: '修改成功', affectedRows: results3.affectedRows })
        })

      } else {
        const sqlStr1 = 'select * from role_info where roleName = ?'
        conn.query(sqlStr1, name, (err1, results1) => {
          if (err1) {
            return res.json({ code: 0, message: '添加失败', affectedRows: 0 })
          } else if (results1.length !== 0) {
            return res.json({ code: 0, message: '角色名称已存在', affectedRows: 0 })
          } else {
            conn.query(sqlStr3, data, (err3, results3) => {
              if (err3) return res.json({ code: 0, message: '修改失败', affevtedRows: 0 })
              // 影响行数不等于1
              if (results3.affectedRows !== 1) return res.json({ code: 0, message: '修改对象不存在', affectedRows: 0 })
              res.json({ code: 1, message: '修改成功', affectedRows: results3.affectedRows })
            })
          }
        })
      }
    }
  })
})


// 输出的内容
function Result ({ code = 1, msg = '', data = {} }) {
  this.code = code
  this.msg = msg
  this.data = data
}
