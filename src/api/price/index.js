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
// 批量启用 禁用价格 /api/v1/price/batch_enable

export function batchEnable(data) {
  return request({
    url: '/price/batch_enable',
    headers: {
      isToken: true
    },
    method: 'put',
    data: data
  })
}



// 新增价格
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

  // 查询用户 /api/v1/admin/user/query

  export function getUser(data) {
    return request({
      url: `/admin/user/query?page=${data.current_page}&page_size=${data.page_size}`,
      headers: {
        isToken: true
      },
      method: 'post',
      data: data.body
    })
  }

  // 更新用户信息  /api/v1/admin/user/update /api/v1/admin/user/update

  export function updatetUser(data) {
    return request({
      url: `/admin/user/update`,
      headers: {
        isToken: true
      },
      method: 'post',
      data: data
    })
  }

  //  用户-书籍分组 /api/v1/book/group/query

  export function getbookGroup(data) {
    return request({
      url: `/book/group/query?page=${data.current_page}&page_size=${data.page_size}`,
      headers: {
        isToken: true
      },
      method: 'post',
      data: data.body
    })
  }
  // 创建书籍分组  /api/v1/book/group

  export function createbookGroup(data) {
    return request({
      url: `/book/group`,
      headers: {
        isToken: true
      },
      method: 'post',
      data: data
    })
  }



  // 删除书籍分组 

   // /api/v1/word 删除词库 /api/v1/book/group  /api/v1/book/group

export function delBookGroup(data) {
  return request({
    url: `/book/group?group_id=${data}`,
    headers: {
      isToken: true
    },
    method: 'delete',
    //data: data
  })
}

// 

//  获取水印列表

export function getwatermarkList(data) {
  return request({
    url: `watermark/query?page=${data.current_page}&page_size=${data.page_size}`,
    headers: {
      isToken: true
    },
    method: 'post',
    data: data.body
  })
}

// 添加水印 

export function addwatermark(data) {
  return request({
    url: `watermark`,
    headers: {
      isToken: true,
      "Content-Type":"form-data;charset=utf-8"
    },
    method: 'post',
    data: data
  })
}

// 删除水印

export function delwatermark(id) {
  return request({
    url: `watermark/${id}`,
    headers: {
      isToken: true
    },
    method: 'delete',
    // data: data
  })
}

// 更新水印

export function putwatermark(data) {
  return request({
    url: `watermark/${data.watermark_id}`,
    headers: {
      isToken: true,
      // "Content-Type":"form-data;charset=utf-8"
    },
    method: 'put',
    data: data
  })
}











