<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="图书名称">
                <el-input v-model="query.item_name" placeholder="图书名称" clearable style="width: 240px" />
            </el-form-item>
            <!-- <el-form-item label="图书分类" prop="configType">
                <el-select v-model="queryParams.configType" placeholder="请选择" clearable style="width: 240px">
                    <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">查询</el-button>
                <el-button icon="Refresh" @click="resetFun">重置</el-button>
                <el-button type="danger" @click="handleQuery">清空采集所有数据</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">

            <el-col :span="1.5">
                <el-form-item label="书店id">
                    <el-input v-model="queryParams.book_id" placeholder="请输入要删除书店id,用,分割" clearable style="width: 240px"
                        @keyup.enter="handleQuery" />
                </el-form-item>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain @click="handleRefreshCache">根据书店id删除</el-button>
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
            <!-- <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar> -->
        </el-row>
        <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" align="center" prop="item_id" />
            <el-table-column label="主图" align="center" prop="img_big">
                <template #default="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.img_big" :zoom-rate="1.2"
                        :max-scale="7" :min-scale="0.2" :z-index="999" :initial-index="4" fit="cover" />
                </template>
            </el-table-column>
            <el-table-column label="图书id" align="center" prop="shop_id" :show-overflow-tooltip="true" />
            <el-table-column label="图书名称" align="center" width="200" prop="item_name" :show-overflow-tooltip="true">
                <template #default="scope">
                    <el-link :href="scope.row.pc_url" target="_blank">{{ scope.row.item_name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="作者" align="center" prop="author" :show-overflow-tooltip="true" />
            <el-table-column label="出版社" align="center" prop="author" :show-overflow-tooltip="true" />
            <el-table-column label="年代" align="center" prop="pub_date" :show-overflow-tooltip="true" />
            <el-table-column label="书店id" align="center" prop="book_id" :show-overflow-tooltip="true" />
            <el-table-column label="书店名称" align="center" prop="shop_name" :show-overflow-tooltip="true" />
            <el-table-column label="价格" align="center" prop="price" :show-overflow-tooltip="true" />
            <el-table-column label="品相" align="center" prop="quality" :show-overflow-tooltip="true" />
            <el-table-column label="发布时间" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="发布状态" align="center" prop="publish_status">
                <template #default="scope">
                    {{ transform(publish_status, scope.row.publish_status) }}
                </template>
            </el-table-column>
            <el-table-column label="发布结果" align="center" prop="publish_result" >
                <template #default="scope">
                   {{ scope.row.publish_result==1?"发布成功":"未发布" }}
                </template>
                </el-table-column>
            <el-table-column label="图书信息" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="图书介绍" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="是否上传" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template #default="scope">
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

<script setup name="Config">
import { listConfig, getConfig, delConfig, addConfig, updateConfig, } from "@/api/system/config";
import { useTableListFun } from "@/hooks/getTabel.js"

const { proxy } = getCurrentInstance();
//const { sys_yes_no } = proxy.useDict("sys_yes_no");
import { getQueryBook, delBook } from "@/api/task/index"
const { page, open, query, transform, tableList, searchFun, resetFun, closeFun, handleCurrentChange, handleSizeChange, getQueryList } = useTableListFun(getQueryBook)



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

const { queryParams, form, rules } = toRefs(data);

/** 查询参数列表 */
function getList() {
    loading.value = true;
    listConfig(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
        configList.value = response.rows;
        total.value = response.total;
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

/** 修改按钮操作 */
function handleUpdate(row) {
    reset();
    const configId = row.configId || ids.value;
    getConfig(configId).then(response => {
        form.value = response.data;
        open.value = true;
        title.value = "修改参数";
    });
}

/** 提交按钮 */
function submitForm() {
    proxy.$refs["configRef"].validate(valid => {
        if (valid) {
            if (form.value.configId != undefined) {
                updateConfig(form.value).then(response => {
                    proxy.$modal.msgSuccess("修改成功");
                    open.value = false;
                    getList();
                });
            } else {
                addConfig(form.value).then(response => {
                    proxy.$modal.msgSuccess("新增成功");
                    open.value = false;
                    getList();
                });
            }
        }
    });
}
/** 删除按钮操作 */
function handleDelete(row) {
    const configIds = row.configId || ids.value;
    proxy.$modal.confirm('是否确认删除参数编号为"' + configIds + '"的数据项？').then(function () {
        return delConfig(configIds);
    }).then(() => {
        getList();
        proxy.$modal.msgSuccess("删除成功");
    }).catch(() => { });
}






</script>
