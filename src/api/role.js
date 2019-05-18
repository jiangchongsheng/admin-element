import request from '@/utils/request'

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
