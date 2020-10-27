import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'get',
    params: {
      username,
      password
    }
  })
}

export function getInfo(data) {
  return request({
    url: '/user/info',
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
