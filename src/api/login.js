import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/login',
    method: 'get',
    params: {
      username,
      password
    }
  })
}

export function getInfo(data) {
  return request({
    url: '/api/getRoleInfo',
    method: 'get',
    params: data
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
