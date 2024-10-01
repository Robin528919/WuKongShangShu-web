import request from '@/utils/request'

// /api/v1/word 增加词库 /api/v1/price/add

// 系统配置 /api/v1/system/config

export function configFun(){
  return request({
    url: '/system/config',
    headers: {
      isToken: false
    },
    method: 'get',
   
  })

}


export function addprice(data) {
    return request({
      url: '/price/add',
      headers: {
        isToken: true
      },
      method: 'post',
      data: data
    })
  }

  // 删除价格

export function delPrice(data) {
    return request({
      url: '/price',
      headers: {
        isToken: true
      },
      method: 'delete',
      data: data
    })
  }
// 更新价格 /api/v1/price
  export function putPrice(data) {
    return request({
      url: '/price',
      headers: {
        isToken: true
      },
      method: 'put',
      data: data
    })
  }

  // 查询价格列表 /api/v1/
  export function getQuery(data) {
    return request({
      url: `/price/query?page=${data.current_page}&page_size=${data.page_size}`,
      headers: {
        isToken: true
      },
      method: 'post',
      data: data.body
    })
  }






