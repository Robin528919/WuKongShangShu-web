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
            <el-form-item label="发布结果">
                <el-select v-model="query.publish_result" placeholder="请选择"  clearable style="width: 240px" >
                    <el-option :key="1" label="发布成功" value="发布成功">
                    </el-option>
                    <el-option :key="2" label="发布失败" value="发布失败">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">搜索</el-button>
                <el-button icon="Refresh" @click="resetFunaa">重置</el-button>
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
                    <img style="height: 100px; width: 100px; object-fit: contain;"
                        :src="computedImg(scope.row.watermarks[0])" alt="">
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
            <el-table-column label="原价" align="center" prop="original_price" width="80" :show-overflow-tooltip="true" />
            <el-table-column label="加价" align="center" prop="add_price" width="80" :show-overflow-tooltip="true" />
            <el-table-column label="发布结果" align="center" prop="publish_result" width="200">
                <template #default="scope">
                    <el-popover placement="top-start" title="发布接口详情" :width="300" trigger="hover"
                        :content="scope.row.publish_result">
                        <template #reference>
                            <div
                                style="white-space: nowrap; overflow: hidden;  text-overflow: ellipsis;  width: 200px;">
                                {{ scope.row.publish_result }}</div>
                        </template>
                    </el-popover>

                </template>

            </el-table-column>
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
            <el-pagination @size-change="handleSizeChange" :current-page="page.current_page" @current-change="handleCurrentChange"
                style="margin-top: 20px;" background layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </div>



    </div>
</template>

<script setup name="Config">

import { useTableListFun } from "@/hooks/getTabel.js"



import { onMounted, reactive, } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
console.log("route.query", route.query)
const { proxy } = getCurrentInstance();
import { getAdminReleaseRecord } from "@/api/admin/index"
let urlQuery = route.query
let parms = {
    task_id: urlQuery.task_id
}
if (urlQuery.id) {
    parms = {
        task_id: urlQuery.id
    }
} else {
    parms = {}
}


const { page, open, query, loading, tableList, searchFun, resetFun, closeFun, handleCurrentChange, handleSizeChange, getQueryList } = useTableListFun(getAdminReleaseRecord, parms)

const resetFunaa = () => {
    // 获取当前的哈希路径部分，不包含查询参数
    if (urlQuery.id) {
        query.task_id = ''
        const newHash = window.location.hash.split('?')[0];
        window.location.href = `${window.location.origin}${window.location.pathname}${newHash}`;
        window.location.reload();
    } else {
        resetFun()
    }
}





console.log("getQueryList", getQueryList)

const computedImg = (str) => {
    return import.meta.env.VITE_APP_BASE_API + '/' + str

}


const sys_yes_no = [{
    value: true,
    label: '是'
}, {
    value: false,
    label: '否'
}]

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