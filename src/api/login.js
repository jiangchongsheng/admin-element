import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  console.log('getInfo ....')
  return request({
    url: '/admin/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
