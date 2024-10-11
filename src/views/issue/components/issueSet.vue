<template>
    <div class="form-warp">
        <el-form :model="form" label-width="120px">

            <el-form-item label="任务名称" :required="true">
                <el-input placeholder="请输入任务名称" v-model="form.task_name"></el-input>
            </el-form-item>

            <el-form-item label="宝贝描述" :required="true">
                <el-input placeholder="请输入宝贝描述" v-model="form.task_params.desc"></el-input>
            </el-form-item>

            <el-form-item label="标题前缀：">
                <el-input placeholder="请输入标题前缀：" v-model="form.task_params.title_prefix"></el-input>
            </el-form-item>
            <el-form-item label="标题过滤：">
                <el-input placeholder="请输入标题过滤" v-model="form.task_params.title_filter"></el-input>
            </el-form-item>
            <el-form-item label="水印位置" :required="true">
                <el-radio-group v-model="form.task_params.watermark">
                    <el-radio v-for="item in position" :key="item.id" :value="item.id">{{ item.text }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="宝贝库存" :required="true">
                <el-input-number placeholder="宝贝库存" v-model="form.task_params.stock"></el-input-number>
            </el-form-item>
            <el-form-item label="发布数量" :required="true">
                <el-input-number placeholder="发布数量" v-model="form.task_params.num"></el-input-number>
            </el-form-item>
            <el-form-item label="是否全新：">
                <el-radio-group v-model="form.task_params.is_new">
                    <el-radio :value="true">全新</el-radio>
                    <el-radio :value="false">二手</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="发布选项：">
                <el-radio-group v-model="form.task_params.publish_option">
                    <el-radio :value="0">直接上架</el-radio>
                    <el-radio :value="1">放入库存</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="发布类目：" :required="true">
                <el-select v-model="form.task_params.category_id"  filterable remote reserve-keyword
                    placeholder="请选择发布类目" remote-show-suffix :remote-method="remoteMethod"
                    :loading="loading" >
                    <el-option v-for="item in category_infoList" :key="item.cid" :label="item.name" :value="item.cid" />
                </el-select>
            </el-form-item>


            <el-form-item label="图书分组：" :required="true">
                <el-select v-model="form.task_params.book_group_id" placeholder="请选择图书分组">
                    <el-option v-for="item in bookList" :key="item.group_id" :label="item.group_name"
                        :value="item.group_id" />
                </el-select>
            </el-form-item>

            <el-form-item label="选择分类：" :required="true">
                <el-select v-model="form.task_params.category" placeholder="选择分类">
                    <el-option v-for="item in categoryList" :key="item.cid" :label="item.name" :value="item.cid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="运费模版：" :required="true">
                <el-select v-model="form.task_params.template" placeholder="请选者运费模版">
                    <el-option v-for="item in templateList" :key="item.template_id" :label="item.name"
                        :value="item.template_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="sureIssuFun">确定发布</el-button>
            </el-form-item>




        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import { getbookGroup, templateS, getCategory, category_info } from "@/api/price/index"
import { createTask } from "@/api/task/index"
import { ElMessage } from "element-plus";
const position = [{ id: 1, text: '左上角' }, { id: 2, text: '左下角' }, { id: 3, text: '右上角' }, { id: 4, text: '右下角' }, { id: 5, text: '正面' }]
const form = reactive({
    task_type: 2,
    task_name: "",
    task_desc: "",
    task_params: {
        desc: "", // 宝贝描述
        title_prefix: "",//标题前缀
        title_filter: "", // 标题过滤
        watermark: 1,
        stock: "", //
        num: "",
        is_new: true,
        publish_option: 0,  // 0 直接上架  1 放入仓库
        book_group_id: "",
        category_id: null,
        category: "",
        template: "",
    }
});
// 图书分组
const bookList = ref([])
const getbookGroupFun = async () => {
    let res = await getbookGroup({ current_page: 1, page_size: 10000 })
    bookList.value = res.data.data
}
getbookGroupFun()
// 店铺分类
const categoryList = ref([])
const categoryListFun = async () => {
    let res = await getCategory({ current_page: 1, page_size: 10000 })
    categoryList.value = res.data.seller_cats
}
categoryListFun()
// 获取运费模版
const templateList = ref([])
const templateListtFun = async () => {
    let res = await templateS({ current_page: 1, page_size: 10000 })
    templateList.value = res.data.delivery_templates
}
templateListtFun()


// 获取发布类目
let loading = ref(false)
const category_infoList = ref([])
const remoteMethod = async (e) => {
    loading.value = true
    console.log("FFFF",e)
    let res = await category_info(e)
    loading.value = false
    category_infoList.value = res.data.item_cats
}
remoteMethod()



const sureIssuFun = async () => {
    
    if(!form.task_name)return ElMessage.warning("任务名称必须填写!")

   
   
    if(!form.task_params.stock)return ElMessage.warning("宝贝库存必填写!")

    if(!form.task_params.stock)return ElMessage.warning("宝贝库存必填写!")
    if(!form.task_params.num)return ElMessage.warning("宝贝库存必填写!")
    if(!form.task_params.stock)return ElMessage.warning("发布数量必填写!")
    if(!form.task_params.category_id)return ElMessage.warning("发布类目必填写!")


    if(!form.task_params.book_group_id)return ElMessage.warning("图书分组必须填写!")
    if(!form.task_params.stock)return ElMessage.warning("分类必须选择!")
    if(!form.task_params.category_id)return ElMessage.warning("运费模版必选!")
  
    let res = await createTask(form)
    if (res && res.code == 200) {
        ElMessage.success("发布图书成功")

    }
}


</script>
<style scoped lang="scss">
.form-warp {
    width: 800px;
}
</style>
