<template>
    <div class="app-container">
        <el-form :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="指令查询" prop="configName">
                <el-input v-model="query.configName" placeholder="请输入参数名称" clearable style="width: 240px" />
            </el-form-item>

            <el-form-item label="状态" prop="configType">
                <el-select v-model="query.configType" placeholder="系统内置" clearable>
                    <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">查询</el-button>
                <el-button icon="Refresh" @click="resetFun">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="danger" plain @click="handleRefreshCache">清空违禁词所有数据</el-button>
            </el-col>
            <el-col :span="1.5" style="line-height: 28px;">
                <span>自动刷新(秒)</span>
            </el-col>
            <el-col :span="1.5">
                <el-input-number />
            </el-col>

            <el-col :span="1.5">
                <el-button type="primary" @click="handleQuery">开始</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" @click="handleQuery">手动刷新</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" @click="handleQuery">一键停止采集指令</el-button>
            </el-col>
            <!-- <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar> -->
        </el-row>

        <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" align="center" prop="configId">
                <template #default="{ row, $index }">
                    {{ (page.current_page - 1) * page.page_size + $index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="任务类型" align="center" prop="task_type" :show-overflow-tooltip="true">
                 <template #default="scope">
                    <span>{{ scope.row.task_type == 1 ? '采集' : '发布' }}</span>
                </template> 
            </el-table-column>
            <el-table-column label="任务名称" align="center" prop="task_name" :show-overflow-tooltip="true" />
            <el-table-column label="任务描述" align="center" prop="task_desc" :show-overflow-tooltip="true" />
            <el-table-column label="任务ID" align="center" prop="task_id" :show-overflow-tooltip="true" />
            <el-table-column label="结果信息" align="center" prop="result" :show-overflow-tooltip="true" />
            <el-table-column label="任务状态" align="center" prop="stauts" :show-overflow-tooltip="true" />

            <el-table-column label="任务开始时间" align="center" prop="task_start_time" width="180">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.task_start_time) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="任务结束时间" align="center" prop="task_end_time">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.task_end_time) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                        v-hasPermi="['system:config:edit']">修改</el-button>
                    <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                        v-hasPermi="['system:config:remove']">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="display: flex; justify-content: end;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                style="margin-top: 20px;" background layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </div>

    </div>
</template>

<script setup name="Config">

import { useTableListFun } from "@/hooks/getTabel.js"



import { reactive, } from "vue";

const { proxy } = getCurrentInstance();
import { getQuery, } from "@/api/task/index"

const { page, open, query, tableList, searchFun, resetFun, closeFun, handleCurrentChange, handleSizeChange, getQueryList } = useTableListFun(getQuery)



const sys_yes_no = [{
    value: true,
    label: '是'
}, {
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
    editObj = row
    open.value = true
    title.value = "修改"
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.price_id);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
}

// 批量启用 禁用价格


// 启用价格








/** 删除按钮操作 */


// 禁用操作

function disableFun(row) {


}





//getList();
</script>
