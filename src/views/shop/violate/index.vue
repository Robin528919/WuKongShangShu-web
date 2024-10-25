<template>
    <div class="app-container">
        <el-form ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="违禁词">
                <el-input v-model="query.word" placeholder="请输入参数名称" clearable style="width: 240px" />
            </el-form-item>
            <!-- <el-form-item label="启用状态" prop="configType">
                <el-select v-model="queryParams.configType" placeholder="系统内置" clearable>
                    <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" icon="page" @click="getList">搜索</el-button>
                <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="Delete" @click="handleDelete">删除</el-button>
            </el-col>

            <!-- <el-col :span="1.5">
                <el-button type="primary" @click="uploadWjcStatus = true">上传违禁词 {{ uploadWjcStatus }}</el-button>
            </el-col> -->
            <el-col :span="1.5">
                <el-button type="primary" @click="moreAddFun">批量新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="Delete" @click="delectAllFun">清空违禁词</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain icon="Plus" @click="handleAdd">上传违禁词txt文件</el-button>
            </el-col>
            <!-- <el-col :span="1.5">
                <el-button type="danger" plain icon="Refresh" @click="handleRefreshCache">清空违禁词所有数据</el-button>
            </el-col> -->
            <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="configList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" width="100">
                <template #default="{ row, $index }">
                    {{ (page.current_page - 1) * page.page_size + $index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="违禁词id" align="center" prop="word_id" :show-overflow-tooltip="true" />
            <el-table-column label="违禁词" align="center" prop="word" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="是否启用" align="center" prop="configType">
                <template #default="scope">
                    <dict-tag :options="sys_yes_no" :value="scope.row.configType" />
                </template>
</el-table-column> -->
            <el-table-column label="创建时间" align="center" prop="createTime" width="180">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.created_time) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button link type="primary" @click="updateFun(scope.row)">修改</el-button>
                    <el-button link type="primary" @click="handleDelete(scope.row)">删除</el-button>
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
        <el-dialog :title="title" v-model="open" width="500px" append-to-body>
            <el-form ref="configRef" label-width="80px">
                <el-form-item label="违禁词：" :required="true">
                    <el-input v-model="Words" placeholder="请输入参数名称" />
                </el-form-item>

            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" v-if="title == '新增违禁词'" @click="addWordsFun">确 定</el-button>
                    <el-button type="primary" v-else @click="modifyFun">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 批量上传违禁词 -->
        <addWjc :open="addWjcStatus" v-if="addWjcStatus" @close="addWjcStatusFun" />
        <!-- 上传文件按钮 -->
        <uploadWjc :open="uploadWjcStatus" v-if="uploadWjcStatus" @close="uploadWjcStatus = false" />

    </div>
</template>

<script setup>

// 
import { addWord, delWord, putWord, getQuery, delAllWord } from "@/api/violate/index";
// 批量上新
import addWjc from "./components/addWjc.vue"
import uploadWjc from "./components/uploadWjc.vue"
import { ElMessage } from "element-plus";
import { reactive } from "vue";
const { proxy } = getCurrentInstance();
// const { sys_yes_no } = proxy.useDict("sys_yes_no");

const configList = ref([]);
const open = ref(false);
const loading = ref(false);
const showSearch = ref(true);
// 选择的dos
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);

const title = ref("");

// 批量新增按钮
const addWjcStatus = ref(false)
// 上传文件按钮
const uploadWjcStatus = ref(false)
// 批量新增违禁词
const moreAddFun = () => {
    addWjcStatus.value = true
}
function addWjcStatusFun() {
    addWjcStatus.value = false
    getList()
}
// 增加违禁词
const Words = ref('')
function addWordsFun() {
    let WordsArr = Words.value.split(",")
    addWord(WordsArr).then(res => {
        if (res.code == 200) {
            ElMessage.success("上传违禁词成功")
            open.value = false
            getList()
        }
    })
}
/** 新增按钮操作 */
function handleAdd() {
    Words.value = ''
    open.value = true;
    title.value = "新增违禁词";
}

/** 删除按钮操作 */
const handleDelete = async (row) => {
    let configIds = null
    if (row && row.word_id) {
        configIds = [row.word_id]
    } else {
        configIds = ids.value;
    }
    if (configIds.length == 0) {
        ElMessage.warning("请选择要删除的违禁词")
        return
    }
    let res = await delWord(configIds)
    if (res.code == 200) {
        proxy.$modal.msgSuccess("删除成功");
        getList();
    }
}


// 违禁词 修改
let modifyObj = {}
const updateFun = async (item) => {
    modifyObj = {}
    open.value = true
    Words.value = item.word
    item.word = Words.value
    title.value = "修改违禁词";
    modifyObj = item

}
const modifyFun = async () => {
    delete modifyObj.created_time
    let res = await putWord({ word: Words.value, word_id: modifyObj.word_id, })
    if (res.code == 200) {
        proxy.$modal.msgSuccess("更新成功")
        open.value = false
        getList()
    }
}
function handleSizeChange(size) {
    page.current_page = 1
    page.page_size = size
    getList()

}
function handleCurrentChange(e) {
    page.current_page = e
    getList()
}
const page = reactive({
    current_page: 1,
    page_size: 10,
    total: 10
});

// 对象转数组
function objToArrayFun(params) {
    let newQueryArr = []
    for (let key in params) {
        console.log("paramsparams", key)
        newQueryArr.push({
            field: key, value: query[key], operator: "=="
        })

    }
    return newQueryArr
}
/** 查询参数列表 */
let query = reactive({
    word: ''
})
function getList() {
    let body = objToArrayFun(query)
    page.body = body
    loading.value = true;
    getQuery(page).then(response => {
        console.log("responseresponse", response)
        configList.value = response.data.data;
        page.total = response.data.total_records
        loading.value = false;
    });
}

/** 取消按钮 */
function cancel() {
    open.value = false;
    reset();
}

/** 表单重置 */
function reset() {


}

/** 搜索按钮操作 */
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
}

/** 重置按钮操作 */
function resetQuery() {
    page.current_page = 1
    query.word = ''
}

/** 多选框选中数据 */
function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.word_id);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
}
// 清空所有数据
function delectAllFun() {
    proxy.$modal.confirm('是否清空所有违禁词').then(async () => {
        let res = await delAllWord()
        if (res.code == 200) {
            proxy.$modal.msgSuccess("清空成功")
            getList()
        }
    })

}







getList();
</script>
