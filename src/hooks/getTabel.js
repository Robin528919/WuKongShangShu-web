import { pa } from "element-plus/es/locales.mjs";
import { ref, reactive } from "vue";

export function useTableListFun(fetchFunction) {
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
    try {
      loading.value = true;
    
      let body = proxy.objToArrayFun(query);
      let params = { ...page, body };
     
      const response = await fetchFunction(params);
      tableList.value = response.data.data;
      page.total = response.data.total_records;
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
    console.log("queryquery",query)
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        query[key] = ''; 
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
 const closeFun=()=>{
  open.value = false
  getQueryList();


 }
  return {
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
