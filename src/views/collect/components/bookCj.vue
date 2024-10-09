<template>
    <div class="form-warp">
        <el-button type="primary">图书采集设置</el-button>
        <el-form :model="form" label-width="120px">
            <el-form-item label="采集任务名称：" :required="true">
                <el-input type="text" v-model="form.task_name" />
            </el-form-item>
          
            <!-- <el-form-item label="任务名称：" :required="true" placeholder="请输入采集任务名称">
                <el-input type="text" v-model="form.task_params.name" />
            </el-form-item> -->
            <el-form-item label="书店ID：" :required="true">
                <el-input type="textarea" v-model="form.task_params.shop_ids" placeholder="请输入书店ID" />
                <span>注意格式事例：22522,23221,25346</span>
            </el-form-item>
            <el-form-item label="违禁词库：" :required="true">
                注意: 官方违禁词库权限,需要联系管理员。作用：对书名标题进行过滤，不符合禁止发布
            </el-form-item>
            <el-form-item label="分类：" :required="true">
                <el-select v-model="form.task_params.book_category" placeholder="请选择分类">
                    <el-option v-for="item in bookType" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span style="margin-left: 20px;">注意：可分分类采集（全部all，文学cat）...</span>
            </el-form-item>
            <el-form-item label="图书分组：" :required="true">
                <el-select v-model="form.task_params.book_group_id" placeholder="请选择图书分组">
                    <el-option v-for="item in bookList" :key="item.group_id" :label="item.group_name"
                        :value="item.group_id" />
                </el-select>
            </el-form-item>
            <el-form-item label="时间选择：">
                <el-date-picker v-model="timeArr" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
                    start-placeholder="开始日期" @change="changeTime" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="采集数量：">
                <el-input-number v-model="form.task_params.num" :min="1" :max="10000000" />
            </el-form-item>
            <el-form-item label="任务描述：" :required="true">
                <el-input type="textarea" v-model="form.task_desc" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitFun">进行采集</el-button>
                <el-button type="primary" @click="publishFun">发布任务</el-button>
            </el-form-item>
        </el-form>

    </div>

</template>

<script setup>
import { ref, reactive, toRefs } from 'vue';
import { createTask, publish } from "@/api/task/index"
import { getbookGroup } from "@/api/price/index"
import { ElMessage} from "element-plus"

const form = reactive({
    task_type: 1, // 采集 2 发布
    task_params: { 
        shop_ids: "",
        start_time: null,
        end_time: null,
        num: 100,
        is_vip: true,
        book_category: "all",
        name: "",
        book_group_id: "",

    },
    task_name: "", // 任务名称
    task_desc: "",// 任务描述

})
// 时间数组
let timeArr = ref("")
const bookList = ref([])
const getbookGroupFun = async () => {
    let res = await getbookGroup({ current_page: 1, page_size: 10000 })
    bookList.value = res.data.data
}
getbookGroupFun()
function changeTime(arr) {
    console.log("时间改变", arr)
    if (Array.isArray(arr) && arr.length > 0) {
        form.task_params.start_time = arr[0]
        form.task_params.end_time = arr[1]
    } else {
        form.task_params.start_time = ""
        form.task_params.end_time = ""
    }
}
// 采集
const submitFun = async () => {
    if (!form.task_name) {
        ElMessage.warning("请输入采集任务名称")
        return
    }
    if (!form.task_type) {
        ElMessage.warning("请选择任务类型")
        return
    }
    if (!form.task_params.shop_ids) {
        ElMessage.warning("请输入书店id")
        return
    }
   
    form.task_params.shop_ids = form.task_params.shop_ids.split(",")
    let obj = {
        task_type: 1,
        task_params: {
            shop_ids: [
                '21905'
            ],
            start_time: null,
            end_time: null,
            num: 20,
            is_vip: false,
            book_group_id: "12",
            book_category: "all",
            name: "string"
        },
        task_name: "任务名称",
        task_desc: "任务描述"
    }
    let res = await createTask(form)
    if (res.code == 200) {
        ElMessage.success("开始采集")
    }
}
// 发布任务

const publishFun = async () => {

    form.task_params.shop_ids = form.task_params.shop_ids.split(",")
    let obj = {
        "shop_ids": [
            757192

        ],
        "start_time": null,
        "end_time": null,
        "num": 100,
        "is_vip": false,
        "book_category": "all",
        "name": "精包增织题图"
    }
    let res = await publish(form)
    if (res.code == 200) {
       
        ElMessage.success("发布任务成功")
    }
}




const bookType = [{
    value: 'all',
    label: '全部'

}, {
    value: 'cat',
    label: '文学'
}]

const taskType = [{
    value: 1,
    label: '任务类型1'

}, {
    value:2,
    label: '任务类型2'
}]

</script>
<style scoped lang='scss'>
.form-warp {
    width: 800px;
}
</style>
