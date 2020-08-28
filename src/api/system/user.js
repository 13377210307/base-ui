import request from '@/utils/request'

// 用户列表
export function userList (params) {
  return request({
    url: '/user/user/page',
    method: 'get',
    params: params
  })
}

// 批量删除用户
export function deleteByIds (ids) {
  return request({
    url: '/user/user/page',
    method: 'delete',
    params: { ids: ids }
  })
}

// 重置密码
export function resetPassword (data) {
  return request({
    url: '/user/user/resetPassword',
    method: 'put',
    data: data
  })
}

// 修改用户状态
export function updateUserStatus (data) {
  return request({
    url: '/user/user/updateUserStatus',
    method: 'put',
    data: data
  })
}


