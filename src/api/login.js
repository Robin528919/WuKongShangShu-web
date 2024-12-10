import request from '@/utils/request'

// 登录方法
export function login(data) {
  
  return request({
    url: '/user/login',
    headers: {
      isToken: false,
      isYun:true,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  })
}

// 登录方法
export function loginLocal(data) {
  
  return request({
    url: '/user/login',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法 /api/v1/user/register
export function register(data) {
  return request({
    url: '/user/register',
    headers: {
      isToken: false,
      isYun:false 
    },
    method: 'post',
    data: data
  })
}

// 注册方法 /api/v1/user/register
export function registerIsYun(data) {
  return request({
    url: '/user/register',
    headers: {
      isToken: false,
      isYun:true 
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法


