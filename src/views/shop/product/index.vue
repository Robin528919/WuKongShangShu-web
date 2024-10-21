<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="图书名称">
                <el-input v-model="query.item_name" placeholder="图书名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item label="图书分组" prop="configType">
                <el-select v-model="query.group_id" placeholder="请选择" clearable style="width: 240px">
                    <el-option v-for="dict in bookGroupList" :key="dict.group_id" :label="dict.group_name" :value="dict.group_id" />
                </el-select>
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">查询</el-button>
                <el-button icon="Refresh" @click="resetFun">重置</el-button>
                <el-button type="danger" @click="handleQuery">全量删除</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">

       
            <!-- <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar> -->
        </el-row>
        <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
        
            <el-table-column label="序号" align="center" prop="configId">
                <template #default="{ row, $index }">
                    {{ (page.current_page - 1) * page.page_size + $index + 1 }}
                </template>
            </el-table-column>
          
            <el-table-column label="主图" align="center" prop="img_big">
                <template #default="scope">
                    <el-image style="width: 20px; height: 20px" :src="scope.row.pic_url" :zoom-rate="1.2"
                        :max-scale="7" :min-scale="0.2" :z-index="999" :initial-index="4" fit="cover" />
                </template>
            </el-table-column>
            <!-- <el-table-column label="图书id" align="center" prop="shop_id" :show-overflow-tooltip="true" /> -->
            <el-table-column label="图书名称" align="center" width="200" prop="title" :show-overflow-tooltip="true">
               
            </el-table-column>
<!--           
            <el-table-column label="发布结果" align="center" prop="publish_result">
                <template #default="scope">
                    {{ scope.row.publish_result == 1 ? "发布成功" : "未发布" }}
                </template>
            </el-table-column>
            <el-table-column label="图书信息" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="图书介绍" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="是否上传" align="center" prop="configKey" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column> -->
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

const { proxy } = getCurrentInstance();
import { getbookGroup } from "@/api/price/index"
//const { sys_yes_no } = proxy.useDict("sys_yes_no");
import { getProductList } from "@/api/task/index"
const { page, open, query, transform, tableList, searchFun, resetFun, closeFun, handleCurrentChange, handleSizeChange, getQueryList } = useTableListFun(getProductList)



const configList = ref([]);

const loading = ref(false);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);

const data = reactive({
    form: {},
    queryParams: {
        pageNum: 1,
        pageSize: 10,
        configName: undefined,
        configKey: undefined,
        configType: undefined
    },
    rules: {
        configName: [{ required: true, message: "参数名称不能为空", trigger: "blur" }],
        configKey: [{ required: true, message: "参数键名不能为空", trigger: "blur" }],
        configValue: [{ required: true, message: "参数键值不能为空", trigger: "blur" }]
    }
});


// 图书分组
let bookGroupList = ref([])
 function getGetbookGroupFun(){
    getbookGroup({
        current_page:1,
        page_size:10000000
    }).then(res => {
        console.log("group_namegroup_name",res)
        bookGroupList.value = res.data.data
    })

 }
 getGetbookGroupFun()



/** 取消按钮 */
function cancel() {
    open.value = false;
    reset();
}

/** 表单重置 */
function reset() {
    form.value = {
        configId: undefined,
        configName: undefined,
        configKey: undefined,
        configValue: undefined,
        configType: "Y",
        remark: undefined
    };
    proxy.resetForm("configRef");
}
// :0-等待发布 2-发布成功 3-发布失败 4-同步失败

const publish_status = [
    {
        label: "等待发布",
        value: 0
    },
    {
        label: "发布成功",
        value: 2
    },
    {
        label: "发布失败",
        value: 3
    },
    {
        label: "同步失败",
        value: 4

    }
]

/** 搜索按钮操作 */
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
}

/** 重置按钮操作 */
function resetQuery() {
    dateRange.value = [];
    proxy.resetForm("queryRef");
    handleQuery();
}

/** 多选框选中数据 */
function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.configId);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
    reset();
    open.value = true;
    title.value = "添加参数";
}








</script>
