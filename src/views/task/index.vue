<template>
    <div class="app-container">
        <el-form :model="query" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="图书查询" prop="configName">
                <el-input v-model="query.name" placeholder="请输入参数名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item label="状态" prop="configType">
                <el-select v-model="query.staus" style="width: 130px" placeholder="请选择" clearable>
                 
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">查询</el-button>
                <el-button icon="Refresh" @click="resetFun">重置</el-button>
                <el-button icon="delete" type="danger">删除</el-button>
                <el-button type="danger" plain>清空采集过滤数据</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
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
        </el-row>
        <el-table v-loading="loading" :data="configList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" align="center" prop="configId">
                <template #default="{ row, $index }">
                    {{ (page.current_page - 1) * page.page_size + $index + 1 }}
                </template>
            </el-table-column>
           
            <el-table-column label="任务id" align="center" prop="task_id" :show-overflow-tooltip="true" /> 
            <el-table-column label="任务名称" align="center" prop="name" :show-overflow-tooltip="true" />
            <el-table-column label="任务状态" align="center" prop="status" :show-overflow-tooltip="true" />
            <el-table-column label="结果内容" align="center" prop="result" :show-overflow-tooltip="true" />
            
            <el-table-column label="状态" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="创建时间" align="center" prop="start_time" width="180">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="完成时间" align="center" prop="task_end_time" width="180">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
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
import { listConfig, getConfig, delConfig, addConfig, updateConfig, } from "@/api/system/config";
import { useTableListFun } from "@/hooks/getTabel.js"

import {getQuery } from "@/api/task/index"


const { page,open,loading, query, tableList, searchFun,resetFun,closeFun,handleCurrentChange,handleSizeChange,getQueryList} = useTableListFun(getQuery)
const { proxy } = getCurrentInstance();
//const { sys_yes_no } = proxy.useDict("sys_yes_no");

const configList = ref([]);


const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);






/** 查询参数列表 */


/** 多选框选中数据 */
function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.configId);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
}






</script>
