import { pa } from "element-plus/es/locales.mjs";
import { ref, reactive } from "vue";

export function useFetch(fetchFunction) {
    // 拿到全局方法
    const { proxy } = getCurrentInstance();
  // 分页相关内容
  const page = reactive({
    current_page: 1,
    page_size: 10,
    total: 10,
  });

  let query = reactive({
    word: "",
  });

  // 列表信息 数据
  const tableList = ref([]);
  // 列表loading
  const loading = ref(false);
  const getQueryList = async () => {
    try {
      loading.value = true;
      let body = proxy.objToArrayFun(query)
      query.body = body
      const response = await fetchFunction(query);
      data.value = response.data;
    } catch (err) {
    } finally {
      loading.value = false;
    }
  };
  // 获取列表数据
  getQueryList();

  // 查询

  const searchFun=()=>{
    page.current_page=1
    getQueryList();

  }
  // 重置

  const resetFun = ()=>{
    query={}
  }
 // 分页
  function handleCurrentChange(e) {
    page.current_page = e
    getQueryList()
}

function handleSizeChange(size) {
    page.current_page = 1
    page.page_size =size
    getQueryList()

}



  return { tableList, getQueryList, loading, page,query ,searchFun,resetFun,handleCurrentChange,handleSizeChange};
}
