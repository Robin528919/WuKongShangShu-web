import request from '@/utils/request'

// /api/v1/word 增加词库 /api/v1/admin/vip/word

export function addWord(data) {
    return request({
      url: '/admin/vip/word',
      headers: {
        isToken: true
      },
      method: 'post',
      data: data
    })
  }

  // /api/v1/word 删除词库 /api/v1/admin/vip/word

export function delWord(data) {
    return request({
      url: '/admin/vip/word',
      headers: {
        isToken: true
      },
      method: 'delete',
      data: data
    })
  }
// 更新词库 /api/v1/admin/vip/word
  export function putWord(data) {
    return request({
      url: '/admin/vip/word',
      headers: {
        isToken: true
      },
      method: 'put',
      data: data
    })
  }

  // 查询词库 /api/v1/word/query /api/v1/admin/vip/word/query
  export function getQuery(data) {
    return request({
      url: `/admin/vip/word/query?page=${data.current_page}&page_size=${data.page_size}`,
      headers: {
        isToken: true
      },
      method: 'post',
      data: data.body
    })
  }
// 清空违禁词  http://120.27.8.117/api/v1/word/all
export function delAllWord(data) {
  return request({
    url: '/admin/vip/word/all',
    headers: {
      isToken: true
    },
    method: 'delete',
    data: data
  })
}

// 
export function uploadWord(data) {
  return request({
    url: "/admin/vip/word/upload",
    headers: {
      isToken: true,
      "Content-Type": "multipart/form-data",
    },
    method: "post",
    data: data,
  });
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

// /api/v1/release/record/query 获取发布记录
export function getReleaseRecord(data) {
 
  let arr = data.body.map(item=>{
    if(item.field=="publish_result"&&item.value=="发布失败"){
      item.value = '发布成功'
      item.operator="!="
    }
    return item
  })
  return request({
    url: `/release/record/query?page=${data.current_page}&page_size=${data.page_size}`,
    method: 'post',
    data: arr
  })
}
// 管理员发布记录

export function getAdminReleaseRecord(data) {
  let arr = data.body.map(item=>{
    if(item.field=="publish_result"&&item.value=="发布失败"){
      item.value = '发布成功'
      item.operator="!="
    }
    return item
  })
  return request({
    url: `/admin/release/record/query?page=${data.current_page}&page_size=${data.page_size}`,
    method: 'post',
    data: arr
  })
}

