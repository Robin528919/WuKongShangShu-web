<template>
    <div class="app-container">
        <el-form ref="queryRef" :model="query" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="分组名称">
                <el-input v-model.trim="query.group_name" placeholder="请输入档位名称" clearable style="width: 240px" />
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
            <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
                <template #default="scope">
                    <!-- <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button> -->
                    <el-button link type="primary" icon="View" @click="lookResult(scope.row)">查看</el-button>
                    <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
                    <el-button link type="danger" @click="weiguiFun(scope.row)">违规检测</el-button>
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
import { delBookGroup, getbookGroup, batchEnable } from "@/api/price/index"
import { createTask } from "@/api/task/index"
import { ElMessage } from "element-plus";
const router = useRouter();
const lookResult = (row) => {
    router.push({ path: '/collect/result', query: { group_id: row.group_id } })
}

const { page, open, query, tableList, searchFun, resetFun, closeFun, handleCurrentChange, handleSizeChange, getQueryList } = useTableListFun(getbookGroup)

console.log("getQueryList", getQueryList)

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
// 违规 检测

const weiguiFun = async (row) => {
    let res = await createTask({
        task_type: 4,  // 删除
        task_params: {
            book_group_id: row.group_id
        },
        task_name: "违规检测", // 任务名称
        task_desc: "",// 任务描述
    })
    if (res && res.code == 200) {
        ElMessage({
            type: "success",
            message: "操作成功",
        });
    }

}


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
