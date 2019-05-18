import request from '@/utils/request'

// 待处理列表查询
export function selectByTaskList(data) {
  return request({
    url: '/admin/customerBase/selectByTaskList',
    method: 'post',
    data: data
  })
}

// 处理列表查询
export function selectByProcessedTask(data) {
  return request({
    url: '/admin/taskList/selectByProcessedTask',
    method: 'post',
    data: data
  })
}

// 查询所有下拉框
export function queryAll(data) {
  return request({
    url: '/admin/dictionaries/queryAll',
    method: 'post',
    data: data
  })
}

// 客户基本信息展示
export function selectByCustomerBase(data) {
  return request({
    url: '/admin/customerBase/selectByCustomerBase',
    method: 'post',
    data: data
  })
}

// 借贷信息展示
export function selectByRelevantPerson(data) {
  return request({
    url: '/admin/customerRelevantPerson/selectAllRelevantPerson',
    method: 'post',
    data: data
  })
}

// 银行卡展示
export function queryListByCustomerId(data) {
  return request({
    url: '/admin/bankCard/queryListByCustomerId',
    method: 'post',
    data: data
  })
}

// 查询关联人信息展示
export function queryListByrelaCustomerId(data) {
  return request({
    url: '/admin/relationship/queryListByCustomerId',
    method: 'post',
    data: data
  })
}

// 查询业务基本信息
export function queryByCustomerId(data) {
  return request({
    url: '/admin/customerBusiness/queryByCustomerId',
    method: 'post',
    data: data
  })
}

// 图片分类和其数量
export function queryImgByCustomerId(data) {
  return request({
    url: '/admin/resources/queryListByCustomerId',
    method: 'post',
    data: data
  })
}

// 图片分类下的图片
// export function queryListByWhere(data) {
//   return request({
//     url: '/admin/resources/queryListByWhere',
//     method: 'post',
//     data: data
//   })
// }

// 任务处理
export function addTaskList(data) {
  return request({
    url: '/admin/taskList/addTaskList',
    method: 'post',
    data: data
  })
}
