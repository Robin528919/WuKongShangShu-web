import request from '@/utils/request'


// 创建任务
export function createTask(data) {
    return request({
      url: "/tasks",
      headers: {
        isToken: true
      },
      method: 'post',
      data: data
    })
  }

  // 创建发布任务 /api/v1/tasks/publish
export function publish(data) {
    return request({
      url: "tasks/publish",
      headers: {
        isToken: true
      },
      method: 'post',
      data: data
    })
  }

 
  export function getQuery(data) {
    return request({
      url: `/tasks/query?page=${data.current_page}&page_size=${data.page_size}`,
      headers: {
        isToken: true
      },
      method: 'post',
      data: data.body
    })
  }

  




// 采集结果  /api/v1/books/query 查询图书列表

export function getQueryBook(data) {
  return request({
    url: `/books/query?page=${data.current_page}&page_size=${data.page_size}`,
    headers: {
      isToken: true
    },
    method: 'post',
    data: data.body
  })
}


 // 删除图书  // 删除价格 /api/v1/books

export function delBook(data) {
    return request({
      url: '/books',
      headers: {
        isToken: true
      },
      method: 'delete',
      data: data
    })
  }
