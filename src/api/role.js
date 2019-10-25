import request from '@/utils/request'

// 列表
export function getRoleInfoList(data) {
  return request({
    url: '/api/getRoleInfoList',
    method: 'get',
    data: data
  })
}

// 详情 id
export function getRoleDetails(data) {
  return request({
    url: '/api/getRoleDetails',
    method: 'get',
    params: data
  })
}

// 删除
export function delRole(data) {
  return request({
    url: '/api/delRole',
    method: 'get',
    params: data
  })
}

// 删除
export function addRole(data) {
  return request({
    url: '/api/addRole',
    method: 'post',
    data: data
  })
}

// 用户实名管理
// 查询用户实名信息

const url = 'role'

export function add(query) {
  return request({
    url: '/' + url + '/add',
    method: 'post',
    data: query
  })
}

export function del(data) {
  return request({
    url: '/' + url + '/delete',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: '/' + url + '/update',
    method: 'post',
    data: data
  })
}

export function query(data) {
  return request({
    url: '/' + url + '/query',
    method: 'post',
    data: data
  })
}

export function queryAll() {
  return request({
    url: '/' + url + '/queryAll',
    method: 'post'
  })
}

export function queryRolePermission(data) {
  return request({
    url: '/' + url + '/permission/query',
    method: 'post',
    data: data
  })
}
