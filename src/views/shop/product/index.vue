<template>
    <div class="app-container">
        <el-form :inline="true" v-show="showSearch" label-width="160px">
            <el-form-item label="商品标题：">
                <el-input v-model="query.q" placeholder="图书名称" clearable style="width: 240px" />
            </el-form-item>
            <el-form-item label="商品类目：">
                <el-select v-model="query.cid" filterable remote reserve-keyword style="width: 240px"
                    placeholder="请选择发布类目" remote-show-suffix :remote-method="remoteMethod" :loading="loading">
                    <el-option v-for="item in category_infoList" :key="item.cid" :label="item.name" :value="item.cid" />
                </el-select>
            </el-form-item>
            <!--  -->
            <el-form-item label="卖家自定义类目ID:">
                <el-input v-model="query.seller_cids" placeholder="多个之间用“,”分隔。"  clearable style="width: 240px" />
            </el-form-item>
            <!--  -->
            <el-form-item label="是否参与会员折扣:">
                <el-select v-model="query.has_discount" style="width: 240px" clearable placeholder="请选择是否参与会员折扣">
                    <el-option :key="1" label="是" :value="true" />
                    <el-option :key="2" label="否" :value="false" />
                </el-select>
            </el-form-item>
            <!--  -->
            <el-form-item label="是否橱窗推荐:">
                <el-select v-model="query.has_showcase" style="width: 240px" clearable placeholder="请选择是否橱窗推荐">
                    <el-option :key="1" label="是" :value="true" />
                    <el-option :key="2" label="否" :value="false" />
                </el-select>
            </el-form-item>
            <!-- 商品是否在淘宝显示 -->

            <el-form-item label="是否显示外部店:">
                <el-select v-model="query.is_ex" style="width: 240px" clearable placeholder="是否显示外部店">
                    <el-option :key="1" label="是" :value="true" />
                    <el-option :key="2" label="否" :value="false" />
                </el-select>
            </el-form-item>

            <el-form-item label="组合商品:">
                <el-select v-model="query.is_combine" style="width: 240px" clearable placeholder="是否是组合商品">
                    <el-option :key="1" label="是" :value="true" />
                    <el-option :key="2" label="否" :value="false" />
                </el-select>
            </el-form-item>

            <el-form-item label="商品类型:">
                <el-select v-model="query.auction_type" style="width: 240px" clearable placeholder="商品类型">
                    <el-option :key="1" label="拍卖" value="a" />
                    <el-option :key="2" label="一口价" value="b" />
                </el-select>
            </el-form-item>
            <!-- seller_gids -->
             <el-form-item label="选择分类：">
                <el-select v-model="query.seller_cids" clearable placeholder="选择分类" style="width: 240px" >
                    <el-option v-for="item in categoryList" :key="item.cid" :label="item.name" :value="item.cid">
                    </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchFun">查询</el-button>
                <el-button icon="Refresh" @click="resetFun">重置</el-button>
                <el-button type="danger" @click="selectFun">多选删除</el-button>
                <el-button type="danger" @click="selectAllFun">全量删除</el-button>
                <el-button type="danger" @click="anTiaojian">按查询条件删除</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table :data="tableList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" align="center" prop="configId">
                <template #default="{ row, $index }">
                    {{ (page.current_page - 1) * page.page_size + $index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="主图" align="center" prop="img_big">
                <template #default="scope">
                    <el-image style="width: 20px; height: 20px" :src="scope.row.pic_url" :zoom-rate="1.2" :max-scale="7"
                        :min-scale="0.2" :z-index="999" :initial-index="4" fit="cover" />
                </template>
            </el-table-column>
            <!-- <el-table-column label="图书id" align="center" prop="shop_id" :show-overflow-tooltip="true" /> -->
            <el-table-column label="商品标题" align="center" width="200" prop="title" :show-overflow-tooltip="true">

            </el-table-column>
            <el-table-column label="商品类目ID" align="center" prop="cid" :show-overflow-tooltip="true" />
            <!-- 商品数字id -->
            <el-table-column label="商品数字ID" align="center" prop="num_iid" :show-overflow-tooltip="true" />
            <el-table-column label="卖家店铺内自定义类目ID" align="center" prop="seller_cids" :show-overflow-tooltip="true" />

            <el-table-column label="是否参与会员折扣" align="center" prop="has_discount" :show-overflow-tooltip="true">
                <template #default="scope">
                    {{ scope.row.has_discount ? '是' : '否' }}
                </template>
            </el-table-column>
            <el-table-column label="是否橱窗推荐" align="center" prop="has_showcase" :show-overflow-tooltip="true">
                <template #default="scope">
                    {{ scope.row.has_showcase ? '是' : '否' }}
                </template>
            </el-table-column>


            <el-table-column label="商品是否在淘宝显示" align="center" prop="is_taobao" :show-overflow-tooltip="true">
                <template #default="scope">
                    {{ scope.row.is_taobao ? '是' : '否' }}
                </template>
            </el-table-column>

            <el-table-column label="商品是否在外部网店显示" align="center" prop="is_ex" :show-overflow-tooltip="true">
                <template #default="scope">
                    {{ scope.row.is_ex ? '是' : '否' }}
                </template>
            </el-table-column>

            <el-table-column label="起始的修改时间" width="160" align="center" prop="list_time"
                :show-overflow-tooltip="true" />
            <el-table-column label="结束的修改时间" width="160" align="center" prop="modified" :show-overflow-tooltip="true" />
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
import { category_info } from "@/api/price/index"
import { createTask } from "@/api/task/index"
const { proxy } = getCurrentInstance();
import { getbookGroup ,getCategory} from "@/api/price/index"
//const { sys_yes_no } = proxy.useDict("sys_yes_no");
import { getProductList } from "@/api/task/index"
import { ElMessage, ElMessageBox } from 'element-plus'
const { page, open, query, transform, tableList, searchFun, resetFun, closeFun, handleCurrentChange, handleSizeChange, getQueryList } = useTableListFun(getProductList,{isTb:true})



const configList = ref([]);


const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref([]);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);



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

// 获取发布类目
let loading = ref(false)
const category_infoList = ref([])
const remoteMethod = async (e) => {
    loading.value = true
    console.log("FFFF", e)
    let res = await category_info(e)
    loading.value = false
    category_infoList.value = res.data.item_cats
}
remoteMethod()

// 删除商品
const selectFun = async (id) => {
    if (multiple.value.length == 0) {
        ElMessage.warning("请选择要删除商品")
        return
    }
    let res = await createTask({
        task_type: 3,  // 删除
        task_params: {
            ids: multiple.value.map(item => item.num_iid),

        },
        task_name: "删除商品", // 任务名称
        task_desc: "",// 任务描述
    })
    if (res.code == 200) {
        ElMessage({
            type: "success",
            message: "操作成功",
        });
        searchFun()

    }
}
function selectAllFun() {
    ElMessageBox.confirm(
        '确定全部删除么？此操作不可逆',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let res = await createTask({
                task_type: 3,  // 删除
                task_params: {
                    ids: [],

                },
                task_name: "删除商品", // 任务名称
                task_desc: "",// 任务描述
            })
            if (res.code == 200) {
                ElMessage({
                    type: "success",
                    message: "操作成功",
                });
                searchFun()

            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已经取消',
            })
        })

}
// 
function anTiaojian(){
    ElMessageBox.confirm(
        '确定按照条件删除？此操作不可逆',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            delete query.isTb
            let res = await createTask({
                task_type: 3,  // 删除
                task_params: {
                   ...query
                },
                task_name: "按照查询条件删除", // 任务名称
                task_desc: "",// 任务描述
            })
            if (res.code == 200) {
                ElMessage({
                    type: "success",
                    message: "操作成功",
                });
                searchFun()

            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已经取消',
            })
        })

}








/*=


/** 多选框选中数据 */
function handleSelectionChange(selection) {
    multiple.value = selection
}










// 店铺分类
const categoryList = ref([])
const categoryListFun = async () => {
    let res = await getCategory({ current_page: 1, page_size: 10000 })
    categoryList.value = res.data.seller_cats.map(item=>{
        item.cid = item.cid.toString()
        return item
    })
    console.log("toString()toString()",categoryList.value)
}
categoryListFun()

</script>
