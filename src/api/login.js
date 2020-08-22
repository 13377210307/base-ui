import request from '@/utils/request'

const userApi = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */

// 登录
export function login (params) {
  return request({
    url: '/oauth/oauth/token',
    method: 'post',
    headers: { 'Authorization': 'Basic YmFzZTpiYXNl' },
    params: {
      grant_type: 'password',
      username: params.username,
      password: params.password
    }
  })
}

// 退出登录
/* export function logout (accessToken) {
  return request({
    url: '/oauth/oauth/token',
    method: 'delete',
    headers: { 'Authorization': 'Basic YmFzZTpiYXNl' },
    params: {
      access_token: accessToken
    }
  })
} */

// 获取用户信息
export function getInfo () {
  return request({
    url: '/user/user/info',
    method: 'get'
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}
