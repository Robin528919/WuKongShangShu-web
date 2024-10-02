<template>
    <div class="form-warp">
        <el-button type="primary">图书采集设置</el-button>
        <el-form :model="form" label-width="120px">
            <el-form-item label="任务名称：" :required="true">
                <el-input type="text" v-model="form.name" />
            </el-form-item>
            <el-form-item label="书店ID：" :required="true">
                <el-input type="textarea" v-model="form.shop_ids" />
                <span>注意格式事例：22522,23221,25346</span>
            </el-form-item>
            <el-form-item label="违禁词库：" :required="true">
                注意: 官方违禁词库权限,需要联系管理员。作用：对书名标题进行过滤，不符合禁止发布
            </el-form-item>
            <el-form-item label="分类：" :required="true">
                <el-select v-model="form.book_category" placeholder="fen">
                    <el-option v-for="item in bookType" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span style="margin-left: 20px;">注意：可分分类采集（全部all，文学cat）...</span>
            </el-form-item>
            <!-- <el-form-item label="时间筛选：">
                <el-radio-group v-model="form.resource">
                    <el-radio value="1">开启</el-radio>
                    <el-radio value="0">不开启</el-radio>
                </el-radio-group>
            </el-form-item> -->
            <el-form-item label="时间选择：">
                <el-date-picker v-model="timeArr" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
                    start-placeholder="开始日期" @change="changeTime" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="开启翻页：">
                <el-radio-group v-model="form.resource">
                    <el-radio value="1">是</el-radio>
                    <el-radio value="0">否</el-radio>
                </el-radio-group>
            </el-form-item> -->
            <!-- <el-form-item label="翻页选择：">
                起始页 <el-input-number v-model="form.roleName" :min="1" :max="10" />
                终止页<el-input-number v-model="form.roleName" :min="1" :max="10" />
            </el-form-item> -->
            <!-- <el-form-item label="价格选择：">
                起始价格 <el-input-number v-model="form.roleName" :min="1" :max="10" />
                终止价格<el-input-number v-model="form.roleName" :min="1" :max="10" />
            </el-form-item> -->
            <!-- <el-form-item label="翻页延迟：">
                起始页 <el-input-number v-model="form.roleName" :min="1" :max="10" />
                终止页<el-input-number v-model="form.roleName" :min="1" :max="10" />
            </el-form-item> -->
            <!-- <el-form-item label="线程并发：">
                <el-input-number v-model="form.roleName" :min="1" :max="10" />
            </el-form-item> -->
            <!-- <el-form-item label="重试次数：">
                <el-input-number v-model="form.roleName" :min="1" :max="10" />
            </el-form-item> -->
            <el-form-item label="采集数量：">
                <el-input-number v-model="form.num" :min="1" :max="10000000" />
            </el-form-item>
            <!-- <el-form-item label="采集版本：">

                <el-radio-group v-model="form.resource">
                    <el-radio value="1">采集1.0</el-radio>
                    <el-radio value="0">采集2.0</el-radio>
                </el-radio-group>
            </el-form-item> -->
            <!-- <el-form-item label="是否采集：">
                <el-radio-group v-model="form.resource">
                    <el-radio value="1">采集1.0</el-radio>
                    <el-radio value="0">采集2.0</el-radio>
                </el-radio-group>
            </el-form-item> -->
            <!-- <el-form-item label="采集代理：">
                <el-radio-group v-model="form.resource">
                    <el-radio value="1">采集1.0</el-radio>
                    <el-radio value="0">采集2.0</el-radio>
                </el-radio-group>
                <span style="margin-left: 100px;">注意1.0被限制,使用2.0翻页延迟5秒以上</span>
            </el-form-item> -->
            <!-- <el-form-item label="采集翻页：">
                <el-radio-group v-model="form.resource">
                    <el-input v-model="form.roleName" type="number" />
                </el-radio-group>
            </el-form-item> -->
            <!-- <el-form-item label="代理翻页">
                <el-input-number v-model="form.roleName" :min="1" :max="10" />
                <span style="margin-left: 20px;">代理ip采集翻页数量,一页10个</span>
            </el-form-item> -->
            <el-form-item>
                <!-- <el-button type="danger">取消采集</el-button>
                <el-button type="danger">暂停采集</el-button> -->
                
                <el-button type="primary" @click="submitFun">进行采集</el-button>
                <el-button type="primary" @click="publishFun">发布任务</el-button>
            </el-form-item>
        </el-form>

    </div>

</template>

<script setup>
import { ref, reactive, toRefs } from 'vue';
import { createTask,publish} from "@/api/task/index"
import { Message } from '@element-plus/icons-vue';
const form = reactive({
    shop_ids: "",
    start_time: null,
    end_time: null,
    num: '1000',  // 采集数量
    is_vip: false, // 是否启用vip 词库
    book_category: 'all', //类型
    name: '',// 任务名称
})
// 时间数组
let timeArr = ref("")

function changeTime(arr) {
    console.log("时间改变",arr)
    if (Array.isArray(arr) && arr.length > 0) {
        form.start_time = arr[0]
        form.end_time = arr[1]
    } else {
        form.start_time =''
        form.end_time = ''
    }
}
// 采集
const submitFun= async ()=>{
    form.shop_ids = form.shop_ids.split(",")
//     let obj = {
//     "shop_ids": [
//         757192
        
//     ],
//     "start_time": null,
//     "end_time": null,
//     "num": 100,
//     "is_vip": false,
//     "book_category": "all",
//     "name": "精包增织题图"
// }
    let res =await createTask(form)
    if(res.code==200){
        Message.sucess("开始采集")
    }
}
// 发布任务

const publishFun= async ()=>{
    form.shop_ids = form.shop_ids.split(",")
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
    let res =await publish(form)
    if(res.code==200){
        Message.sucess("发布任务成功")
    }
}




const bookType = [{
    value: 'all',
    label: '全部'

}, {
    value: 'cat',
    label: '文学'
}]

</script>
<style scoped lang='scss'>
.form-warp {
    width: 800px;
}
</style>
