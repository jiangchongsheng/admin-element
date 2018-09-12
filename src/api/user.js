import request from '@/utils/request'

// 用户管理 S
// 编辑用户信息
export function updateList(query) {
  return request({
    url: '/api/user/update',
    method: 'post',
    data: query
  })
}

// 查询所有用户信息
export function fetchList(query) {
  return request({
    url: '/api/user/query',
    method: 'post',
    data: query
  })
}

// 新增用户信息
export function createUser(query) {
  return request({
    url: 'api/user/simpleCreate',
    method: 'post',
    data: query
  })
}

// 用户禁用启用状态
export function openUserStatus(query) {
  return request({
    url: '/api/user/status/update',
    method: 'post',
    data: query
  })
}

// 查询用户角色列表
export function fetchRoleList(query) {
  return request({
    url: '/api/user/role/query',
    method: 'post',
    data: query
  })
}
// 编辑用户角色
export function updateRole(query) {
  return request({
    url: '/api/user/role/update',
    method: 'post',
    data: query
  })
}
// 查询当前用户信息
export function fetchInfoList(query) {
  return request({
    url: '/api/user/info',
    method: 'post',
    data: query
  })
}
// 查询所有用户角色
export function queryAllROle(query) {
  return request({
    url: '/userRole/role/all',
    method: 'post',
    data: query
  })
}
// 用户管理 E

// 用户实名管理
// 查询用户实名信息
export function fetchRealNameList(query) {
  return request({
    url: '/userReal/findUserReal',
    method: 'post',
    data: query
  })
}
// 查询当前id的状态
export function getRealStatus(query) {
  return request({
    url: '/userReal/status',
    method: 'post',
    data: query
  })
}
