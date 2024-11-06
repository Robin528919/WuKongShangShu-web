<template>
    <div class="app-container">
        <el-form :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="图书名称">
                <el-input v-model="query.item_name" placeholder="图书名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item label="图书分组">
                <el-select v-model="query.group_id" placeholder="请选择" clearable style="width: 240px">
                    <el-option v-for="dict in bookGroupList" :key="dict.group_id" :label="dict.group_name"
                        :value="dict.group_id" />
                </el-select>
            </el-form-item>
            <el-form-item label="发布状态">
                <el-select v-model="query.publish_status" placeholder="请选择" clearable style="width: 240px">
                    <el-option v-for="dict in publish_status" :key="dict.value" :label="dict.label"
                        :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="是否违规">
                <el-select v-model="query.is_illegal" placeholder="请选择" clearable style="width: 240px">
                    <el-option v-for="dict in is_violation" :key="dict.value" :label="dict.label"
                        :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="书店id">
                <el-input v-model="query.shop_id" placeholder="请输入要删除书店id,用,分割" clearable style="width: 240px" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">查询</el-button>
                <el-button icon="Refresh" @click="resetFun">重置</el-button>
                <el-button type="danger" @click="delAllFun">清空指定分组所有数据</el-button>
                <el-button type="danger" @click="deltiFun">根据条件删除(除分组外)</el-button>
                <el-button type="danger" @click="delselectFun">多选删除</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" width="100">
                <template #default="{ row, $index }">
                    {{ (page.current_page - 1) * page.page_size + $index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="主图" align="center" prop="img_big">
                <template #default="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.img_big" :zoom-rate="1.2"
                        :max-scale="7" :min-scale="0.2" :z-index="999" :initial-index="4" fit="cover" />
                </template>
            </el-table-column>
            <el-table-column label="图书id" align="center" prop="book_id" :show-overflow-tooltip="true" />
            <el-table-column label="图书名称" align="center" width="200" prop="item_name" :show-overflow-tooltip="true">
                <template #default="scope">
                    <el-link :href="scope.row.pc_url" target="_blank">{{ scope.row.item_name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="作者" align="center" prop="author" :show-overflow-tooltip="true" />
            <el-table-column label="出版社" align="center" prop="publisher" :show-overflow-tooltip="true" />
            <el-table-column label="年代" align="center" prop="pub_date" :show-overflow-tooltip="true" />
            <el-table-column label="书店id" align="center" prop="shop_id" :show-overflow-tooltip="true" />
            <el-table-column label="书店名称" align="center" prop="shop_name" :show-overflow-tooltip="true" />
            <el-table-column label="价格" align="center" prop="price" :show-overflow-tooltip="true" />
            <el-table-column label="品相" align="center" prop="quality" :show-overflow-tooltip="true" />

            <el-table-column label="是否违规" align="center" prop="is_illegal" :show-overflow-tooltip="true">
                <template #default="scope">
                  <el-tag  v-if="scope.row.is_illegal" type="error"> 是</el-tag>
                  <el-tag  v-else type="success"> 否</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="违规词" align="center" prop="illegal_words" :show-overflow-tooltip="true" />
         
            <el-table-column label="发布状态" align="center" prop="publish_status">
                <template #default="scope">
                    {{ transform(publish_status, scope.row.publish_status) }}
                </template>
            </el-table-column>
            <el-table-column label="发布结果" align="center" prop="publish_result">
                <template #default="scope">
                    {{ scope.row.publish_result == 1 ? "发布成功" : "未发布" }}
                </template>
            </el-table-column>
            <el-table-column label="图书信息" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="图书介绍" align="center" prop="configKey" :show-overflow-tooltip="true" />
            <el-table-column label="是否上传" align="center" prop="configKey" :show-overflow-tooltip="true" />
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
import { getQueryBook, delBook, seleDelBook } from "@/api/task/index"
import { ElMessage } from "element-plus";
const { page, open, query, transform, tableList, searchFun, resetFun, closeFun, handleCurrentChange, handleSizeChange } = useTableListFun(getQueryBook)



const configList = ref([]);

const loading = ref(false);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref([]);
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
function getGetbookGroupFun() {
    getbookGroup({
        current_page: 1,
        page_size: 10000000
    }).then(res => {
        console.log("group_namegroup_name", res)
        bookGroupList.value = res.data.data
    })

}
getGetbookGroupFun()


/** 查询参数列表 */
function getList() {
    loading.value = true;
    listConfig(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
        configList.value = response.rows;
        total.value = response.total;
        loading.value = false;
    });
}




// :0-等待发布 2-发布成功 3-发布失败 4-同步失败

const publish_status = [
    {
        label: "等待发布",
        value: '0'
    },
    {
        label: "发布成功",
        value: '2'
    },
    {
        label: "发布失败",
        value: '3'
    },
    {
        label: "同步失败",
        value: '4'

    }
]

// 是否违规 1-是 2-否

const is_violation = [
    {
        label: "是",
        value: 1
    },
    {
        label: "否",
        value: '0'
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
    multiple.value = selection
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

// 删除所有数据 delAllFun

function delAllFun() {
    if (!query.group_id) {
        return proxy.$modal.msgError("请选择分组");
    }
    proxy.$modal.confirm('是否确认删除整个分组数据？').then(function () {
        delBook([query.group_id]).then(res => {
            if (res.code == 200) {
                ElMessage.success("删除成功");
                searchFun()
            }
        })
    }).catch(() => { });
}
// 根据条件删除  除分组外

function deltiFun() {
    let body = proxy.objToArrayFun(query);
    console.log("deltiFun", body)
    proxy.$modal.confirm('确定删除数据？').then(function () {
        delBook(body).then(res => {
            if (res.code == 200) {
                ElMessage.success("删除成功");
                searchFun()
            }
        })
    }).catch(() => { });

}

// 根据条件删除
function delselectFun() {

    console.log("delselectFundelselectFun", multiple)
    if (multiple.value.length <= 0) {
        return ElMessage.warning("请选择要删除的数据");
    }

    proxy.$modal.confirm('确定删除数据？').then(() => {
        let query = {
            book_ids: multiple.value.map(item => item.book_id)
        }

        seleDelBook(multiple.value.map(item => item.book_id)).then(res => {
            if (res.code == 200) {
                ElMessage.success("删除成功");
                searchFun()
            }
        })
    }).catch(() => { });

}





</script>
