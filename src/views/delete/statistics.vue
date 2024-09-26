<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="统计名称" prop="configName">
                <el-input v-model="queryParams.configName" placeholder="图书名称,书店名称,书店id" clearable style="width: 240px"
                    @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="handleQuery">查询</el-button>
                <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                <el-button icon="Delete" type="danger" @click="resetQuery">删除</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-form-item label="选择时间：" prop="configName">
                    <el-date-picker v-model="form.resource" value-format="YYYY-MM-DD" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain @click="handleRefreshCache">选择时间点击：个</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain @click="handleRefreshCache">清空统计日志数据</el-button>
            </el-col>
            <el-col :span="1.5" style="line-height: 28px;">
                <span>自动刷新(秒)</span>
            </el-col>

        </el-row>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-form-item label="删除总数：" prop="configName">
                    <el-button type="success">个</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="1.5">
                <el-form-item label="24小时内" prop="configName">
                    <el-button type="success">个</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="1.5">
                <el-form-item label="今日删除：" prop="configName">
                    <el-button type="success">个</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="1.5">
                <el-form-item label="昨日删除：" prop="configName">
                    <el-button type="success">个</el-button>
                </el-form-item>
            </el-col>

            <el-col :span="1.5">
                <el-form-item label="一周前删除：" prop="configName">
                    <el-button type="success">个</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="1.5">
                <el-form-item label="本月删除：" prop="configName">
                    <el-button type="success">个</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="1.5">
                <el-form-item label="本年删除：" prop="configName">
                    <el-button type="success">个</el-button>
                </el-form-item>
            </el-col>

            <!-- <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar> -->
        </el-row>

        <el-table v-loading="loading" :data="configList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" align="center" prop="configId" />
            <el-table-column label="统计id" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="统计名称" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="删除成功" align="center" prop="configName" :show-overflow-tooltip="true" />
            <el-table-column label="预计删除" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="消耗时间" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="结果内容" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="排序" align="center" prop="configKey" :show-overflow-tooltip="true" />
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
