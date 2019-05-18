import request from '@/utils/request'

// 上传图片接口
export function upload(query) {
  return request({
    url: '/api/upload',
    method: 'post',
    data: query
  })
}

export function getList(query) {
  return request({
    url: '/admin/housemortgage/getList',
    method: 'post',
    data: query
  })
}

export function add(query) {
  return request({
    url: '/admin/housemortgage/add',
    method: 'post',
    data: query
  })
}

export function update(query) {
  return request({
    url: '/admin/housemortgage/update',
    method: 'post',
    data: query
  })
}

export function del(query) {
  return request({
    url: '/admin/housemortgage/delete',
    method: 'post',
    data: query
  })
}

export function getDetail(query) {
  return request({
    url: '/admin/housemortgage/getInfoById',
    method: 'post',
    data: query
  })
}
