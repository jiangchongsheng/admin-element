import request from '@/utils/request'
// 用户列表
export function userList(query) {
  return request({
    url: '/api/getUserInfoList',
    method: 'get',
    params: query
  })
}

// 新增用户
export function addUser(query) {
  return request({
    url: '/api/addUser',
    method: 'post',
    data: query
  })
}

// 编辑用户
export function updateUser(query) {
  return request({
    url: '/api/updateUser',
    method: 'post',
    data: query
  })
}

// 角色下拉框
export function selectRole(query) {
  return request({
    url: '/api/getSelectRole',
    method: 'get',
    params: query
  })
}

// 删除用户
export function delUser(query) {
  return request({
    url: '/api/delUser',
    method: 'get',
    params: query
  })
}

// 根据id查询用户详情
export function getUserDetails(query) {
  return request({
    url: '/api/getUserDetails',
    method: 'get',
    params: query
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
