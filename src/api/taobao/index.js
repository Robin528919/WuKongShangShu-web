import request from '@/utils/request'


// 创建任务  import request from '@/utils/request'


// 创建任务import request from '@/utils/request'


//获取淘宝信息  /api/v1/tb
export function getTb(data) {
    return request({
      url: "tb",
      headers: {
        isToken: true,
        isYun:true,
      },
      method: 'get',
      //data: data
    })
  }



  // 绑定或更新淘宝信息
export function postTb(data) {
    return request({
      url: `tb?session_key=${data.session_key}`,
      headers: {
        isToken: true,
        isYun:true,
      },
      method: 'post',
      data: data
    })
  }

  // 获取在授总数

export function getSell_count(data) {
    return request({
      url: "/tb/sell_count",
      headers: {
        isToken: true,
        isYun:true,
      },
      method: 'get',
     // data: data
    })
  }

  // 获取店铺分类 /api/v1/tb/category
   
export function getCategory(data) {
    return request({
      url: "tb/category",
      headers: {
        isToken: true,
        isYun:true,
      },
      method: 'get',
      //data: data
    })
  }
  // 获取分类模版 /api/v1/tb/template
   
export function getTemplate(data) {
    return request({
      url: "tb/template",
      headers: {
        isToken: true,
        isYun:true,
      },
      method: 'get',
     // data: data
    })
  }

  //  获取授权链接 /api/v1/callback/get_auth_url

  export function getAuthuUrl(data) {
    return request({
      url: "callback/get_auth_url",
      headers: {
        isToken: true,
        isYun:true,
      },
      method: 'get',
     // data: data
    })
  }

// 获取授权信息

export function tbInfo(data) {
  return request({
    url: "tb/info",
    headers: {
      isToken: true,
      isYun:true,
    },
    method: 'get',
   // data: data
  })
}

// 同步授权信息

export function settbInfo(data) {
  return request({
    url: "tb/set_info",
    headers: {
      isToken: true,
      //  isYun:true,
    },
    method: 'post',
     data: data
  })
}

