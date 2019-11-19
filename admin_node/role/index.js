
const express = require('express')
const mysql = require('mysql')

const moment = require('moment');


const cors = require('cors')		// 跨域
const bodyParser = require('body-parser')   // 解析参数
const app = express()
const router = express.Router()
//上面是引入各种模块



// 角色列表信息
app.get('/api/getRoleInfoList', (req, res) => {
  const sqlRole = 'SELECT * From role_info'
  conn.query(sqlRole, (err, results) => {
    if (err) {
      return res.json({ code: 0, message: '获取数据失败', affectedRows: 0 })
    } else {
		var arr = { ...results };
		arr.forEach(item => {
			item.creationTime = moment(item.creationTime).format('YYYY-MM-DD HH:mm:ss')
		})
		console.log(arr)
      res.json({
        code: 1, message: "获取成功", data: arr, affectedRows: 0
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
  // var createtime = moment().format('YYYY-MM-DD HH:mm:ss');
  var data = [req.body.roleName, req.body.roleDescription, 1, req.body.perms]
  conn.query(sqlStr, data, (err, results) => {
    if (err) return res.json({ code: 0, message: '添加失败', affectedRows: 0 })
    if (results.affectedRows !== 1) return res.json({ code: 0, message: '添加失败', affectedRows: 0 })
    res.json({ code: 1, message: '添加成功', affectedRows: results.affectedRows })
  })
})

