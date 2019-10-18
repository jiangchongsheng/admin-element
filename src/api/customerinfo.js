import request from '@/utils/request'

// 客户基本信息修改
export function updateByCustomer(data) {
  return request({
    url: '/admin/customerBase/updateByCustomerBaseId',
    method: 'post',
    data: data
  })
}

// 借款人信息修改
export function updateRelevantPerson(data) {
  return request({
    url: '/admin/customerRelevantPerson/updateRelevantPerson',
    method: 'post',
    data: data
  })
}

// 批量修改关联银行卡信息
export function updateBank(data) {
  return request({
    url: '/admin/bankCard/batchUpdate',
    method: 'post',
    data: data
  })
}

// 批量修改关联人
export function updateConnect(data) {
  return request({
    url: '/admin/relationship/batchUpdate',
    method: 'post',
    data: data
  })
}

// 修改业务基本信息
export function updateBusiness(data) {
  return request({
    url: '/admin/customerBusiness/update',
    method: 'post',
    data: data
  })
}
// =============================================== 添 加 =======================================================
// 客户基本信息添加
export function addCustomer(data) {
  return request({
    url: '/admin/customerBase/addCustomerBase',
    method: 'post',
    data: data
  })
}

// 客户基本信息展示
export function selectByCustomer(data) {
  return request({
    url: '/admin/customerBase/selectByCustomerBase',
    method: 'post',
    data: data
  })
}

// 借款人信息添加
export function addRelevantPerson(data) {
  return request({
    url: '/admin/customerRelevantPerson/addRelevantPerson',
    method: 'post',
    data: data
  })
}

// 房贷申请录入列表
export function selectByLoanApply(data) {
  return request({
    url: '/admin/customerBase/selectByLoanApply',
    method: 'post',
    data: data
  })
}

// 录单员
export function selectByName() {
  return request({
    url: '/admin/user/selectByName',
    method: 'post'
  })
}

// 添加关联银行卡信息
export function batchInsert(data) {
  return request({
    url: '/admin/bankCard/batchInsert',
    method: 'post',
    data: data
  })
}

// 添加关联人
export function relationshipinsert(data) {
  return request({
    url: '/admin/relationship/batchInsert',
    method: 'post',
    data: data
  })
}

// 添加业务基本信息
export function businessinsert(data) {
  return request({
    url: '/admin/customerBusiness/insert',
    method: 'post',
    data: data
  })
}

// 批量添加图片
export function addImgList(data) {
  return request({
    url: '/admin/resources/batchInsert',
    method: 'post',
    data: data
  })
}

// 删除影像资料
export function delImgList(data) {
  return request({
    url: '/admin/resources/delete',
    method: 'post',
    data: data
  })
}
// =============================================== 删 除 =======================================================
// 借款人信息删除
export function delRelevantPerson(data) {
  return request({
    url: '/admin/customerRelevantPerson/deleteById',
    method: 'post',
    data: data
  })
}

// 删除关联银行卡信息
export function delbankCard(data) {
  return request({
    url: '/admin/bankCard/delete',
    method: 'post',
    data: data
  })
}

// 删除关联人信息
export function delrelationship(data) {
  return request({
    url: '/admin/relationship/delete',
    method: 'post',
    data: data
  })
}

// 批量下载
export function downloads(query) {
  return request({
    url: '/videoPicture/downloads',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
