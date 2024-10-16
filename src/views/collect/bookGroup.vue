<template>
    <div class="app-container">
        <el-form ref="queryRef" :model="query" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="分组名称">
                <el-input v-model.trim="query.name" placeholder="请输入档位名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">搜索</el-button>
                <el-button icon="Refresh" @click="resetFun">重置</el-button>
                <el-button type="primary" @click="addFun">新增</el-button>
                <!-- <el-button type="danger" @click="someDisableFun">批量禁用</el-button>
                <el-button type="success" @click="someTrueFun">批量启用</el-button> -->
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <el-table-column label="序号" align="center" prop="configId">
                <template #default="{ row, $index }">
                    {{ (page.current_page - 1) * page.page_size + $index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="分组名称" align="center" prop="group_name" :show-overflow-tooltip="true" />
            <el-table-column label="分组描述" align="center" prop="description" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="创建时间" align="center" prop="createTime" width="180">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
                <template #default="scope">
                    <!-- <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button> -->
                    <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
                    <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">查看</el-button>
                    <!-- <el-button type="danger"  @click="disableFun(scope.row)">禁用</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <div style="display: flex; justify-content: end;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                style="margin-top: 20px;" background layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </div>
        <!-- 添加或修改参数配置对话框 -->
        <addPop :open="open" :editObj="editObj" v-if="open" :title="title" @close="closeFun" />
    </div>
</template>

<script setup name="Config">

import { useTableListFun } from "@/hooks/getTabel.js"

import addPop from "./components/addPop.vue"

import { reactive, } from "vue";

const { proxy } = getCurrentInstance();
import { delBookGroup,getbookGroup,batchEnable } from "@/api/price/index"

const { page,open, query, tableList, searchFun,resetFun,closeFun,handleCurrentChange,handleSizeChange,getQueryList} = useTableListFun(getbookGroup)

console.log("getQueryList",getQueryList)

const sys_yes_no = [{
    value: true,
    label: '是'
},{
    value: false,
    label: '否'
}]
const loading = ref(false);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
// 新增价格管理 弹出层相关内容-------------------

const title = ref("");
function addFun() {
    open.value = true
    title.value = "新增"
}
/** 修改按钮操作 */
let editObj = reactive({})
function handleUpdate(row) {
    editObj=row
    open.value = true
    title.value = "修改"
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.group_id);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
}

// 批量启用 禁用价格

const someDisableFun = async ()=>{
    if(ids.value.length==0) return  proxy.$modal.msgWarning("请选择要操作的数据")
  let res = await batchEnable({
    ids:ids.value,
    is_enable:0
  })
  if(res.code==200){
    proxy.$modal.msgSuccess("操作成功");
    getQueryList()
  }
}
// 启用价格

const someTrueFun = async ()=>{
    if(ids.value.length==0) return  proxy.$modal.msgWarning("请选择要操作的数据")
  let res = await batchEnable({
    ids:ids.value,
    is_enable:1
  })
  if(res.code==200){
    proxy.$modal.msgSuccess("操作成功");
    getQueryList()
  }
}






/** 删除按钮操作 */
function handleDelete(row) {
    const configIds = row.group_id || ids.value;
    proxy.$modal.confirm('确定删除').then(async ()=> {
         let res = await delBookGroup(configIds);
         console.log("删除成功----",res)
         if(res.code==200){
            proxy.$modal.msgSuccess("删除成功");
           getQueryList()
            
         }
    })
}






//getList();
</script>
