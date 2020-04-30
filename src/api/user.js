import request from '@/utils/request'
// 用户列表
export function userList(query) {
  return request({
    url: '/api/getUserInfoList',
    method: 'get',
    data: query
  })
}

// 用户管理 S
// 编辑用户信息
export function update(query) {
  return request({
    url: '/admin/user/update',
    method: 'post',
    data: query
  })
}

// 查询所有用户信息
export function fetchList(query) {
  return request({
    url: '/admin/user/getList',
    method: 'post',
    data: query
  })
}

// 新增用户信息
export function add(query) {
  return request({
    url: 'admin/user/add',
    method: 'post',
    data: query
  })
}

export function del(query) {
  return request({
    url: 'admin/user/delete',
    method: 'post',
    data: query
  })
}

export function getById(query) {
  return request({
    url: 'admin/user/getInfoById',
    method: 'post',
    data: query
  })
}

//  用户权限下拉框
export function queryListRole(query) {
  return request({
    url: '/admin/role/queryListRole',
    method: 'post',
    data: query
  })
}
