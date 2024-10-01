import request from '@/utils/request'

// /api/v1/word 增加词库 /api/v1/price/add

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

export function delWord(data) {
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

  // 查询书籍列表 /api/v1/
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






