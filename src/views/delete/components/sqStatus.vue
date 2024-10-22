<template>
    <div class="form-warp">
       
        <el-form :model="form" label-width="120px">
            <el-form-item label="删除任务名称：" :required="true">
                <el-input type="text" v-model="form.task_name" placeholder="请输入删除任务名称" />
            </el-form-item>
            <el-form-item label="任务描述：" :required="true">
                <el-input type="text" v-model="form.task_name" placeholder="请输入删除任务描述" />
            </el-form-item>
          
        
        

            <el-form-item>
                <el-button type="primary" @click="submitFun">删除数据</el-button>
             
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
    task_type: 3,  // 删除
    task_params: { 
        ids:"",
      

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
