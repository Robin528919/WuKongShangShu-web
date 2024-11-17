<template>
    <div class="app-container">
        <!-- v-show="showSearch" -->
        <el-form ref="queryRef"  :inline="true"  label-width="100px">
            <el-form-item label="api名称">
                <el-input v-model.trim="query.api_name" placeholder="请输入档位名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item label="API调用时间">
                <el-date-picker v-model="timeDate" @change="chageTimeFun" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange" range-separator="到"
                    start-placeholder="开始时间" end-placeholder="结束时间" />
            </el-form-item>
             <el-form-item label="是否收费" >
                <el-select v-model="query.is_charge" placeholder="全部" style="width: 120px" clearable>
                    <el-option  :key="true" label="是" :value="'1'" />
                    <el-option  :key="false" label="否" :value="'0'" />
                </el-select>
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">搜索</el-button>
                <el-button icon="Refresh" @click="resetFunTime">重置</el-button>
                <!-- <el-button type="primary" @click="addFun">新增</el-button>
                <el-button type="danger" @click="handleQuery">批量禁用</el-button>
                <el-button type="success" @click="handleQuery">批量启用</el-button> -->
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" align="center" prop="configId">
                <template #default="{ row, $index }">
                    {{ (page.current_page - 1) * page.page_size + $index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="api名称" align="center" prop="api_name" :show-overflow-tooltip="true" />
            <el-table-column label="api中文名称" align="center" prop="api_name_zh" :show-overflow-tooltip="true" />
            <el-table-column label="是否收费" align="center"  :show-overflow-tooltip="true" >
                <template #default="scope">
                    <el-tag v-if="scope.row.is_charge==1" type="success">是</el-tag>
                    <el-tag v-else type="error">否</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否成功" align="center" prop="status" :show-overflow-tooltip="true" >
                <template #default="scope">
                    <el-tag v-if="scope.row.status==1" type="success">成功</el-tag>
                    <el-tag v-else type="error">失败</el-tag>
                </template>
            </el-table-column>

            <!-- <el-table-column label="密码" align="center" prop="start_price" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="原价" align="center" prop="original_price" :show-overflow-tooltip="true" />
            <el-table-column label="运算符1" align="center" prop="operator1" :show-overflow-tooltip="true" />
            <el-table-column label="数字1" align="center" prop="number1" :show-overflow-tooltip="true" />
            <el-table-column label="运算符2" align="center" prop="operator2" :show-overflow-tooltip="true" />
            <el-table-column label="数字2" align="center" prop="number2" :show-overflow-tooltip="true" />
            <el-table-column label="说明" align="center" prop="description" :show-overflow-tooltip="true" />
            <el-table-column label="状是否启用态" align="center" prop="is_enable">
                <template #default="scope">
                    <el-tag v-if="scope.row.is_enable" type="success">是</el-tag>
                    <el-tag v-else type="error">否</el-tag>
                </template>
            </el-table-column>
            -->
            <!-- <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
                   
                </template>
            </el-table-column> -->
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
import { getCallLogs } from "@/api/price/index"
import addPop from "./addPop.vue"
import { getUser } from "@/api/price/index"
import { reactive, } from "vue";

const { proxy } = getCurrentInstance();


const { page,open, query, tableList, searchFun,resetFun,closeFun,handleCurrentChange,handleSizeChange,getQueryList} = useTableListFun(getCallLogs)


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
const timeDate = ref([])
// 时间选择
function chageTimeFun(arr){
    if(arr&&Array.isArray(arr)){
        query.start_time = arr[0]
        query.end_time = arr[1]
    }else{
        query.start_time = ""
        query.end_time = ""
    }

}

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
    ids.value = selection.map(item => item.configId);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
}


const resetFunTime = ()=>{
    resetFun()
    timeDate.value = []
}










//getList();
</script>
