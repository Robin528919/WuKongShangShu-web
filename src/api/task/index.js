import request from "@/utils/request";

// 创建任务
export function createTask(data) {
  return request({
    url: "/tasks",
    headers: {
      isToken: true,
    },
    method: "post",
    data: data,
  });
}

// 创建发布任务 /api/v1/tasks/publish
export function publish(data) {
  return request({
    url: "tasks/publish",
    headers: {
      isToken: true,
    },
    method: "post",
    data: data,
  });
}

// 查询任务列表
export function getQuery(data) {
  return request({
    url: `/tasks/query?page=${data.current_page}&page_size=${data.page_size}`,
    headers: {
      isToken: true,
    },
    method: "post",
    data: data.body,
  });
}

// 采集结果  /api/v1/books/query 查询图书列表

export function getQueryBook(data) {
  return request({
    url: `/books/query?page=${data.current_page}&page_size=${data.page_size}`,
    headers: {
      isToken: true,
    },
    method: "post",
    data: data.body,
  });
}

// 删除图书  // 删除价格 /api/v1/books  // http://120.27.8.117/api/v1/books/conditional

export function delBook(data) {
  return request({
    url: "/books/conditional",
    headers: {
      isToken: true,
    },
    method: "delete",
    data: data,
  });
}

export function seleDelBook(data) {
  return request({
    url: "/books",
    headers: {
      isToken: true,
    },
    method: "delete",
    data: data,
  });
}

// 获取在售商品

// 采集结果  /api/v1/books/query 查询图书列表 /api/v1/tb/product_list

export function getProductList(data) {
  console.log(" console.log(data)", data);
  const queryString = new URLSearchParams(data).toString();
  return request({
    url: `/tb/product_list`,
    headers: {
      isToken: true,
    },
    method: "post",
    data: data,
  });
}

// 停止采集
export function stop(id) {
  return request({
    url: `/tasks/stop/${id}`,
    headers: {
      isToken: true,
    },
    method: "post",
  });
}
// 获取库存商品 /api/v1/tb/inventory_list

export function getInventoryList(data) {
  return request({
    url: `/tb/inventory_list`,
    headers: {
      isToken: true,
    },
    method: "post",
    data: data,
  });
}



// 查询任务列表
export function getTaskListAdmin(data) {
  return request({
    url: `/admin/tasks/query?page=${data.current_page}&page_size=${data.page_size}`,
    headers: {
      isToken: true,
    },
    method: "post",
    data: data.body,
  });
}

// /api/v1/admin/tasks/stop/{task_id} 查询 房贷首付是的


// 停止采集 /api/v1/admin/tasks/stop/{task_id}
export function stopAdmin(id) {
  return request({
    url: `/admin/tasks/stop/${id}`,
    headers: {
      isToken: true,
    },
    method: "post",
  });
}

// /api/v1/admin/release/record/query /api/v1/admin/release/record/query
export function releaseRecord(id) {
  return request({
    url: `/admin/release/record/query`,
    headers: {
      isToken: true,
    },
    method: "post",
  });
}
