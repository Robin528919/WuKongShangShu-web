<template>
    <div class="form-warp">
       
        <el-form :model="form" label-width="120px">
            <el-form-item label="采集任务名称：" :required="true">
                <el-input type="text" v-model="form.task_name" placeholder="请输入采集任务名称" />
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
                <el-input v-model="form.task_params.book_category" placeholder="请输入分类"></el-input>
                <!-- <el-select v-model="form.task_params.book_category" placeholder="选择图书分类">
                    <el-option v-for="item in bookType" :key="item.value" :label="item.label" :value="item.value" />
                </el-select> -->
                <span style="margin-left: 20px;">注意：可分分类采集（全部all，文学cat）...</span>
                <span style="margin-left: 20px;color: red;">手动填写逗号","分隔</span>
            </el-form-item>
            <el-form-item label="图书分组：" :required="true">
                <div style="display: flex;">
                    <el-select style="width: 400px;" v-model="form.task_params.book_group_id" placeholder="请选择图书分组">
                    <el-option v-for="item in bookList" :key="item.group_id" :label="item.group_name"
                        :value="item.group_id" />
                </el-select>
                <div style="display: flex;margin-left: 20px;">
                    <el-button type="primary" @click="open=true">新建分组</el-button>
                    <el-button type="primary" @click="getbookGroupFun">刷新分组</el-button>
                </div>

                </div>
               
               
            </el-form-item>
            <el-form-item label="时间选择：">
                <el-date-picker v-model="timeArr" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
                    start-placeholder="开始日期" @change="changeTime" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="采集数量：">
                <el-input-number v-model="form.task_params.num" :min="1" :max="10000000" />
            </el-form-item>
            <!-- <el-form-item label="任务描述：" :required="true">
                <el-input type="textarea" v-model="form.task_desc" />
            </el-form-item> -->

            <el-form-item>
                <el-button type="primary" @click="submitFun">进行采集</el-button>
             
            </el-form-item>
        </el-form>
        <addPop :open="open" :editObj="editObj" v-if="open" :title="title" @close="closeFun" />
    </div>

</template>

<script setup>
import { ref, reactive, toRefs } from 'vue';
import { useTableListFun } from "@/hooks/getTabel.js"
import { createTask, publish } from "@/api/task/index"
import { getbookGroup } from "@/api/price/index"
import { ElMessage} from "element-plus"
import  addPop  from '@/views/collect/components/addPop.vue'
const { open ,handleSizeChange,getQueryList} = useTableListFun(getbookGroup)

const form = reactive({
    task_type: 1, // 采集 2 发布
    task_params: { 
        shop_ids: "",
        start_time: null,
        end_time: null,
        num: 99999,
        is_vip: true,
        book_category: "全部",
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

function closeFun(){
    open.value = false
    getbookGroupFun()
    ElMessage.success("刷新分组成功")

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
    console.log("task_desctask_desc",form)
    
    //
    let res = await createTask(form)
    if (res.code == 200) {
        ElMessage.success("采集成功")
        form.task_params.shop_ids = '';

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
