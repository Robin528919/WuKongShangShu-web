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

  // 查询任务列表 /api/v1/word/query /api/v1/tasks/query
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

  







