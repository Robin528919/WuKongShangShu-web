<template>
    <div class="app-container">
        <el-form ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="图书名称">
                <el-input v-model="query.book_name" placeholder="请输入参数名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item label="原价">
                <el-input v-model="query.original_price" placeholder="请输入参数名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item label="加价">
                <el-input v-model="query.add_price" placeholder="请输入参数名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item label="任务ID">
                <el-input v-model="query.task_id" placeholder="请输入参数名称" clearable style="width: 240px" />
            </el-form-item>
            <!-- <el-form-item label="启用状态" prop="configType">
                <el-select v-model="queryParams.configType" placeholder="系统内置" clearable>
                    <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">搜索</el-button>
                <el-button icon="Refresh" @click="resetFun">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" width="100">
                <template #default="{ row, $index }">
                    {{ (page.current_page - 1) * page.page_size + $index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="任务ID" align="center" prop="task_id" :show-overflow-tooltip="true" />
            <el-table-column label="原图" align="center" prop="original_img" :show-overflow-tooltip="true">
                <template #default="scope">
                    <img style="height: 100px; width: 100px; object-fit: contain;" :src="scope.row.original_img" alt="">
                </template>
            </el-table-column>
            <el-table-column label="水印图片" align="center" prop="original_img" :show-overflow-tooltip="true">
                <template #default="scope">
                    <img style="height: 100px; width: 100px; object-fit: contain;" :src="computedImg(scope.row.watermarks[0])" alt="">
                </template>
            </el-table-column>

            <!-- <el-table-column label="水印" align="center" prop="watermark_img" width="180">
                <template #default="scope" >
                    <img style="height: 100px; width: 100px; object-fit: contain;" :src="computedImg(scope.row.watermark_img)" alt="">
                </template>
            </el-table-column> -->
            <el-table-column label="淘宝店铺ID" align="center" prop="shop_id" :show-overflow-tooltip="true" />
            <el-table-column label="淘宝店铺名称" align="center" prop="shop_name" :show-overflow-tooltip="true" />

            <el-table-column label="图书ID" align="center" prop="book_id" :show-overflow-tooltip="true" />
            <el-table-column label="图书名称" align="center" prop="book_name" :show-overflow-tooltip="true" />
            <el-table-column label="原价" align="center" prop="original_price" :show-overflow-tooltip="true" />
            <el-table-column label="加价" align="center" prop="add_price" :show-overflow-tooltip="true" />
            <el-table-column label="发布结果" align="center" prop="publish_result" :show-overflow-tooltip="true" />
            <el-table-column label="淘宝链接" align="center" prop="tb_url" :show-overflow-tooltip="true">
                
                <template #default="scope">
                    <el-link :href="scope.row.tb_url" :underline="false" target="_blank">
                        {{ scope.row.tb_url }}
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="记录ID" align="center" prop="record_id" :show-overflow-tooltip="true" />

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
import { getReleaseRecord } from "@/api/admin/index"

const { page, open, query, tableList, searchFun, resetFun, closeFun, handleCurrentChange, handleSizeChange, getQueryList } = useTableListFun(getReleaseRecord)

console.log("getQueryList", getQueryList)

const computedImg=(str)=>{
    return import.meta.env.VITE_APP_BASE_API +'/' + str

}


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
    ids.value = selection.map(item => item.group_id);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
}

// 批量启用 禁用价格

const someDisableFun = async () => {
    if (ids.value.length == 0) return proxy.$modal.msgWarning("请选择要操作的数据")
    let res = await batchEnable({
        ids: ids.value,
        is_enable: 0
    })
    if (res.code == 200) {
        proxy.$modal.msgSuccess("操作成功");
        getQueryList()
    }
}
// 启用价格

const someTrueFun = async () => {
    if (ids.value.length == 0) return proxy.$modal.msgWarning("请选择要操作的数据")
    let res = await batchEnable({
        ids: ids.value,
        is_enable: 1
    })
    if (res.code == 200) {
        proxy.$modal.msgSuccess("操作成功");
        getQueryList()
    }
}






/** 删除按钮操作 */
function handleDelete(row) {
    const configIds = row.group_id || ids.value;
    proxy.$modal.confirm('确定删除').then(async () => {
        let res = await delBookGroup(configIds);
        console.log("删除成功----", res)
        if (res.code == 200) {
            proxy.$modal.msgSuccess("删除成功");
            getQueryList()

        }
    })
}






//getList();
</script>