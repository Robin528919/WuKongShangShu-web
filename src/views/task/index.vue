<template>
    <div class="app-container">
        <el-form :model="query" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="任务名称" prop="configName">
                <el-input v-model="query.name" placeholder="请输入任务名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item label="任务类型" prop="configType">
              <el-select v-model="query.task_type" placeholder="" style="width: 240px;" clearable> 
                  <el-option v-for="item in task_typeArr" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">查询</el-button>
                <el-button icon="Refresh" @click="resetFun">重置</el-button>
                <!-- <el-button icon="delete" type="danger">删除</el-button>
                <el-button type="danger" plain>清空采集过滤数据</el-button> -->
            </el-form-item>
        </el-form>
        <!-- <el-row :gutter="10" class="mb8">
            <el-col :span="1.5" style="line-height: 28px;">
                <span>自动刷新(秒)</span>
            </el-col>
            <el-col :span="1.5">
                <el-input-number />
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary">开始</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" @click="handleQuery">手动刷新</el-button>
            </el-col>
        </el-row> -->
        <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" align="center" prop="configId">
                <template #default="{ row, $index }">
                    {{ (page.current_page - 1) * page.page_size + $index + 1 }}
                </template>
            </el-table-column>

            <el-table-column label="任务id" align="center" prop="task_id" :show-overflow-tooltip="true" />
            <el-table-column label="任务名称" align="center" prop="task_name" :show-overflow-tooltip="true" />
            <el-table-column label="任务类型" align="center" prop="task_type" :show-overflow-tooltip="true">
                <template v-slot:default="scope">
                    {{ transform(task_typeArr, scope.row.task_type) }}
                </template>
            </el-table-column>
            <el-table-column label="任务状态" align="center" prop="status" :show-overflow-tooltip="true">
                <template #default="scope">
                    {{ transform(statusOptions, scope.row.status) }}
                </template>
            </el-table-column>
            <el-table-column label="结果内容" align="center" prop="result" :show-overflow-tooltip="true">
                <template #default="scope">
                    {{ scope.row.result.msg }}
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="任务开始时间" align="center" prop="task_start_time" width="180">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.task_start_time) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="任务结束时间" align="center" prop="task_end_time" width="180">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.task_end_time) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button type="text" @click="goRecordFun(scope.row)">查看记录</el-button>
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

<script setup name="任务">

import { useTableListFun } from "@/hooks/getTabel.js"

import { getQuery } from "@/api/task/index"


const { page, open, transform, loading, query, tableList, searchFun, resetFun, closeFun, handleCurrentChange, handleSizeChange, getQueryList } = useTableListFun(getQuery)
const { proxy } = getCurrentInstance();
//const { sys_yes_no } = proxy.useDict("sys_yes_no");

const configList = ref([]);

function goRecordFun(row) {
    proxy.$router.push({
        path: '/issue/record',
        query: {
            id: row.task_id,
            title: row.task_name,
        },
    });
    // this.$router.push({ path: '/user', query: { id: 123 } });
}

const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);

// :0-待执行 1-执行中 2-执行完成 3-执行失败 4-已取消 5-已暂停 6-已恢复 7-已超时 8-已取消
const statusOptions = ref([
    {
        value: "0",
        label: "待执行",
    },
    {
        value: "1",
        label: "执行中",
    },
    {
        value: "2",
        label: "执行完成",
    },
    {
        value: "3",
        label: "执行失败",
    },
    {
        value: "4",
        label: "已取消",
    },
    {
        value: "5",
        label: "已暂停",
    },
    {
        value: "6",
        label: "已恢复",
    },
    {
        value: "7",
        label: "已超时",
    },
    {
        value: "8",
        label: "已取消",
    }

])
//  任务类型
let task_typeArr = [
    {
        value: "1",
        label: "采集",
    },
    {
        value: "2",
        label: "发布",
    },
    {
        value: "3",
        label: "删除",
    }]






/** 查询参数列表 */


/** 多选框选中数据 */
function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.configId);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
}






</script>
