<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="120px">

            <el-form-item label="计费名称" prop="configType">
                <el-select v-model="queryParams.configType" placeholder="请选择" clearable style="width: 240px">
                    <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="发布成功状态" prop="configType">
                <el-select v-model="queryParams.configType" placeholder="请选择" clearable style="width: 240px">
                    <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="扣豆状态" prop="configType">
                <el-select v-model="queryParams.configType" placeholder="请选择" clearable style="width: 240px">
                    <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="计费api" prop="configType">
                <el-select v-model="queryParams.configType" placeholder="请选择" clearable style="width: 240px">
                    <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="handleQuery">查询</el-button>
                <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                <el-button icon="Delete" type="danger" @click="resetQuery">清空全部数据</el-button>
            </el-form-item>
            <el-form-item label="金豆消耗：" prop="configType">
                <el-button type="success">个</el-button>
            </el-form-item>
        </el-form>


        <el-table v-loading="loading" :data="configList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" align="center" prop="configId" />
            <el-table-column label="计费id" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="计量名称" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="计费数量" align="center" prop="configName" :show-overflow-tooltip="true" />
            <el-table-column label="发布成功" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="淘宝店铺名称" align="center" prop="configName" :show-overflow-tooltip="true" />
            <el-table-column label="扣除金额" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="是否计费api" align="center" prop="configName" :show-overflow-tooltip="true" />
            <el-table-column label="图书id" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="创建时间" align="center" prop="createTime" width="180">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
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
        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize" @pagination="getList" />
    </div>
</template>

<script setup name="Config">
import { listConfig, getConfig, delConfig, addConfig, updateConfig, } from "@/api/system/config";

const { proxy } = getCurrentInstance();
const { sys_yes_no } = proxy.useDict("sys_yes_no");

const configList = ref([]);
const open = ref(false);
const loading = ref(true);
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





getList();
</script>
