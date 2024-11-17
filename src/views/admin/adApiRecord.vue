<template>
    <div class="app-container">
        <!-- v-show="showSearch" -->
        <el-form ref="queryRef" :inline="true" label-width="100px">
            <el-form-item label="api名称">
                <el-input v-model.trim="query.api_name" placeholder="请输入档位名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item label="用户">
                <!-- <el-input v-model.trim="query.user_id" placeholder="请输入档位名称" clearable style="width: 240px" /> -->
                <el-select v-model="query.user_id" filterable remote reserve-keyword clearable placeholder="请选择用户"
                    remote-show-suffix :remote-method="remoteMethod" :loading="loading" style="width: 240px">
                    <el-option v-for="item in userList" :key="item.user_id" :label="item.email" :value="item.user_id" />
                </el-select>
            </el-form-item>
            <el-form-item label="API调用时间">
                <el-date-picker v-model="timeDate" @change="chageTimeFun" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange" range-separator="到"
                    start-placeholder="开始时间" end-placeholder="结束时间" />
            </el-form-item>
            <el-form-item label="是否收费">
                <el-select v-model="query.is_charge" placeholder="全部" style="width: 120px" clearable>
                    <el-option :key="true" label="是" :value="'1'" />
                    <el-option :key="false" label="否" :value="'0'" />
                </el-select>
            </el-form-item>
          
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">搜索</el-button>
                <el-button icon="Refresh" @click="resetFunTime">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" align="center" prop="configId">
                <template #default="{ row, $index }">
                    {{ (page.current_page - 1) * page.page_size + $index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="用户账号" align="center" prop="user_name" :show-overflow-tooltip="true" />
            <el-table-column label="api名称" align="center" prop="api_name" :show-overflow-tooltip="true" />
            <el-table-column label="api中文名称" align="center" prop="api_name_zh" :show-overflow-tooltip="true" />
            <el-table-column label="是否收费" align="center" :show-overflow-tooltip="true">
                <template #default="scope">
                    <el-tag v-if="scope.row.is_charge == 1" type="success">是</el-tag>
                    <el-tag v-else type="error">否</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否成功" align="center" prop="status" :show-overflow-tooltip="true">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == 1" type="success">成功</el-tag>
                    <el-tag v-else type="error">失败</el-tag>
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
import { getCallLogsAdmin } from "@/api/price/index"
import { getUser } from "@/api/price/index"
// import addPop from "./addPop.vue"

import { reactive, } from "vue";

const { proxy } = getCurrentInstance();


const { page, open, query, tableList, searchFun, resetFun, closeFun, handleCurrentChange, handleSizeChange, getQueryList } = useTableListFun(getCallLogsAdmin)


const timeDate = ref([])
const loading = ref(false);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
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
// 新增价格管理 弹出层相关内容-------------------

// 获取用户
const userList = ref([])

function remoteMethod(query) {
    if (query !== '') {
        getUser({
            current_page: 1,
            page_size: 1000000000,
            body: [{ field: "email", value: query, operator: "like" }]
        }).then(res => {
            userList.value = res.data.data
        })
    } else {
        getUserList()


    }
}

function getUserList() {
    getUser({
        current_page: 1,
        page_size: 1000000000,

    }).then(res => {
        userList.value = res.data.data
    })

}

getUserList()


const title = ref("");
function addFun() {
    open.value = true
    title.value = "新增"
}
/** 修改按钮操作 */
let editObj = reactive({})
function handleUpdate(row) {
    editObj = row
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
