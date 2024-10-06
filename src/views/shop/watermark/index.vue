<template>
    <div class="app-container">
        <el-form :inline="true" label-width="68px">
            <el-form-item label="水印位置" prop="configName">
                <el-input v-model="query.configName" placeholder="请输入参数名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item label="启用状态" prop="configType">
                <el-select v-model="query.configType" placeholder="系统内置" clearable>
                    <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">搜索</el-button>
                <el-button icon="Refresh" @click="resetFun">重置</el-button>
                <el-button type="primary" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="2" style="line-height: 100px;">水印位置:</el-col>
            <el-col :span="22" style="display: flex;">
                <el-radio-group v-model="radio">
                    <el-radio v-for="item in position" :key="item.id" :value="item.id">{{ item.text }}</el-radio>
                </el-radio-group>
                <div style="display: flex;align-items: center;margin-left: 20px;">
                    <el-button type="primary">水印预览</el-button>
                    <div class="box"></div>
                </div>
            </el-col>
        </el-row>
        <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" align="center" prop="configId">
                <template #default="{ $index }">
                    {{ (page.current_page - 1) * page.page_size + $index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="水印名称" align="center" prop="name" :show-overflow-tooltip="true" />
            <el-table-column label="水印id" align="center" prop="watermark_id" :show-overflow-tooltip="true" />
            <el-table-column label="水印图片" align="center" prop="image_url" :show-overflow-tooltip="true" />
            <el-table-column label="水印位置" align="center" prop="position" :show-overflow-tooltip="true">
                <template #default="scope">
                    {{ translateFun(scope.row.position, position) }}
                </template>
            </el-table-column>
            <el-table-column label="排序" align="center" prop="sort" :show-overflow-tooltip="true" />
            <el-table-column label="是否禁用" align="center" prop="is_enable" :show-overflow-tooltip="true" >
                <template #default="scope">
                <el-tag type="success" v-if="scope.row.is_enable" > 是</el-tag>
                <el-tag type="error" v-else > 否</el-tag>
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
        <addPop :position="position" :open="open" :editObj="editObj" v-if="open" :title="title" @close="closeFun" />
    </div>
</template>

<script setup name="Config">
import { useTableListFun } from "@/hooks/getTabel.js"
import { delwatermark, getwatermarkList, batchEnable } from "@/api/price/index"
const { page, open, query, tableList, searchFun, resetFun, closeFun, handleCurrentChange, handleSizeChange, getQueryList } = useTableListFun(getwatermarkList)
const { proxy } = getCurrentInstance();
import addPop from "./addPop"
const loading = ref(false);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const title = ref("");
const position = [{ id: 1, text: '左上角' }, { id: 2, text: '左下角' }, { id: 3, text: '右上角' }, { id: 4, text: '右下角' }, { id: 5, text: '正面' }]
const radio = ref(null)


function translateFun(num, position) {
    let str = ''
    position.forEach(item => {
        if (num == item.id) {
            str = item.text
        }
    })
    return str

}


/** 多选框选中数据 */
function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.watermark_id);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
    open.value = true;
    title.value = "添加水印";
}

/** 修改按钮操作 */
let editObj = reactive({})
function handleUpdate(row) {
    editObj=row
    open.value = true
    title.value = "修改水印"
}


/** 删除按钮操作 */
function handleDelete(row) {
    const configIds = row.watermark_id || ids.value;
    proxy.$modal.confirm('是否确认删除参数水印id为"' + configIds + '"的数据项？').then(function () {
        return delwatermark(configIds);
    }).then(() => {
        getQueryList();
        proxy.$modal.msgSuccess("删除成功");
    }).catch(() => { });
}





//getList();
</script>

<style lang="scss">
.box {
    height: 100px;
    width: 100px;
    border: 1px solid yellow;
    margin-left: 20px;
}
</style>
