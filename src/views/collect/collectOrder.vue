<template>
    <div class="app-container">
        <el-form :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="任务名称" >
                <el-input v-model="query.task_name" placeholder="请输入参数名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item label="任务类型" >
                <el-select v-model="query.task_type" placeholder="请选择任务类型" style="width: 240px" :disabled="true">
                    <el-option v-for="item in task_typeOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="任务状态" >
                <el-select v-model="query.status" placeholder="请选择任务类型" style="width: 240px">
                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">查询</el-button>
                <el-button icon="Refresh" @click="resetFun">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <!-- <el-button type="primary" @click="handleQuery">一键停止采集指令</el-button> -->
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
                    <span>{{ transform( task_typeOptions, scope.row.task_type) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="任务名称" align="center" prop="task_name" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="任务描述" align="center" prop="task_desc" :show-overflow-tooltip="true" /> -->
            <el-table-column label="任务ID" align="center" prop="task_id" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="结果信息" align="center" prop="result" :show-overflow-tooltip="true" /> -->

            <!-- :0-待执行 1-执行中 2-执行完成 3-执行失败 4-已取消 5-已暂停 6-已恢复 7-已超时 8-已取消 -->
            <el-table-column label="任务状态" align="center" prop="status" :show-overflow-tooltip="true">
                <template #default="scope">
                    {{ transform(statusOptions, scope.row.status) }}
                </template>
            </el-table-column>
            <el-table-column label="采集结果" align="center" prop="result" width="180">
                <template #default="scope">
                    <span>{{ scope.row.result.msg }}</span>
                </template>
            </el-table-column>

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
                    <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">停止采集</el-button>
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



import { onMounted, reactive, } from "vue";

const { proxy } = getCurrentInstance();
import { getQuery, stop } from "@/api/task/index"
import { ElMessage } from "element-plus";

const { page, open, query, tableList, searchFun, resetFun, closeFun, handleCurrentChange, handleSizeChange } = useTableListFun(getQuery,{task_type:1})





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
    console.log("handleUpdate", row)
    stop(row.task_id).then((res) => {
        
        if (res.code == 200) {
          
            ElMessage.success("操作成功");
            searchFun()
        }

    })
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.price_id);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
}
// 任务类型 1采集 2发布 3删除
const task_typeOptions = [
    {
        label: "采集",
        value: 1
    },
    {
        label: "发布",
        value: 2
    },
    {
        label: "删除",
        value: 3
    }
]

// :0-待执行 1-执行中 2-执行完成 3-执行失败 4-已取消 5-已暂停 6-已恢复 7-已超时 8-已取消 
const statusOptions = [
    {
        label: "待执行",
        value: 0
    },
    {
        label: "执行中",
        value: 1
    },
    {
        label: "执行完成",
        value: 2
    },
    {
        label: "执行失败",
        value: 3
    },
    {
        label: "已取消",
        value: 4
    },

    {
        label: "已暂停",
        value: 5
    },
    {
        label: "已恢复",
        value: 6
    },
    {
        label: "已超时",
        value: 7
    },
    {
        label: "已超时",
        value: 8
    },
    {
        label: "任务初始化中",
        value: 9
    },
    {
        label: "停止中",
        value: 10
    },
]

function transform(data, code) {
    let str = ""
    data.forEach(item => {
        item.value == code && (str = item.label)
    })
    return str
}
// 批量启用 禁用价格


// 启用价格








/** 删除按钮操作 */


// 禁用操作

function disableFun(row) {


}





//getList();
</script>
