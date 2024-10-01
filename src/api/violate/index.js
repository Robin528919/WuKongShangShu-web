import request from '@/utils/request'

// /api/v1/word 增加词库

export function addWord(data) {
    return request({
      url: '/word',
      headers: {
        isToken: true
      },
      method: 'post',
      data: data
    })
  }

  // /api/v1/word 删除词库

export function delWord(data) {
    return request({
      url: '/word',
      headers: {
        isToken: true
      },
      method: 'delete',
      data: data
    })
  }
// 更新词库
  export function putWord(data) {
    return request({
      url: '/word',
      headers: {
        isToken: true
      },
      method: 'put',
      data: data
    })
  }

  // 查询词库 /api/v1/word/query
  export function getQuery(data) {
    return request({
      url: `/word/query?page=${data.current_page}&page_size=${data.page_size}`,
      headers: {
        isToken: true
      },
      method: 'post',
      data: data.body
    })
  }






// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
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
      isToken: false
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
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

