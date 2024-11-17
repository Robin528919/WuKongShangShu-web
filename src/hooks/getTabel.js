import { pa } from "element-plus/es/locales.mjs";
import { ref, reactive } from "vue";

export function useTableListFun(fetchFunction, deparams) {
  console.log("fetchFunctionfetchFunction", deparams);
  // 拿到全局方法
  const { proxy } = getCurrentInstance();
  // 分页相关内容
  const page = reactive({
    current_page: 1,
    page_size: 10,
    total: 10,
  });
  // 查询参数
  let query = reactive({});
  // 列表信息 数据
  const tableList = ref([]);
  // 列表loading
  const loading = ref(false);
  const getQueryList = async () => {
    let params = {};
    let body = {};
    try {
      loading.value = true;

      // 不是淘宝的接口
      if (deparams && Object.keys(deparams).length > 0) {
        query = Object.assign(query, deparams);
      }
      body = proxy.objToArrayFun(query);
      params = { ...page, body };
      console.log("不是淘宝接口----------");

      if (deparams && deparams.isTb) {
        params = { ...page, ...query };
      }
      const response = await fetchFunction(params);
      if (response.data.data) {
        tableList.value = response.data.data;
        page.total = response.data.total_records;
      }
      if (response.data.items) {
        tableList.value = response.data.items;
        page.total = response.data.total_results;
      }
      if (deparams && deparams.isTb && !response.data.items) {
        tableList.value = [];
        page.total = response.data.total_results;
      }
    } catch (err) {
      console.log("errr", err);
    } finally {
      loading.value = false;
    }
  };

  // 获取列表数据
  getQueryList();

  // 查询
  const searchFun = () => {
    page.current_page = 1;
    getQueryList();
  };
  // 重置

  const resetFun = () => {
  
 
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        query[key] = "";
      }
    }
  };
  // 分页相关--------------------------------------------------
  function handleCurrentChange(e) {
    page.current_page = e;
    getQueryList();
  }

  function handleSizeChange(size) {
    page.current_page = 1;
    page.page_size = size;
    getQueryList();
  }

  // 关闭弹出--------------
  const open = ref(false);
  const closeFun = () => {
    open.value = false;
    getQueryList();
  };

  const transform = (data, code) => {
    let str = "";
    data.forEach((item) => {
      item.value == code && (str = item.label);
    });
    return str;
  };
  return {
    transform,
    open,
    closeFun, // 关闭弹出
    tableList,
    getQueryList,
    loading,
    page,
    query,
    searchFun,
    resetFun,
    handleCurrentChange,
    handleSizeChange,
  };
}
