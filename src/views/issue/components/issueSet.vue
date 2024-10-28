<template>
    <div class="form-warp">
        <el-form :model="form" label-width="120px" style="width: 50%;">

            <el-form-item label="任务名称" :required="true">
                <el-input placeholder="请输入任务名称" v-model="form.task_name"></el-input>
            </el-form-item>

            <el-form-item label="宝贝描述">
                <div style="width: 100%; display: flex;">
                    <el-input placeholder="请输入宝贝描述" v-model="form.task_params.desc" style="flex: 1;"></el-input>
                    <el-button type="primary" @click="setdescFun">保存到本地</el-button>
                </div>
            </el-form-item>

            <el-form-item label="标题前缀：">
                <div style="display: flex; width: 100%;">
                    <el-input placeholder="请输入标题前缀：" v-model="form.task_params.title_prefix"
                        style="flex: 1;"></el-input>
                    <el-button type="primary" @click="setTitle_prefix">保存到本地</el-button>
                </div>

            </el-form-item>
            <el-form-item label="标题过滤：">
                <div style="display: flex; width: 100%;">
                    <el-input placeholder="请输入标题过滤" v-model="form.task_params.title_filter" style="flex: 1;"></el-input>
                    <el-button type="primary" @click="setTitle_filter">保存到本地</el-button>
                </div>
            </el-form-item>
            <el-form-item label="详情图片：">
                <el-upload action="#" :file-list="fileList" list-type="picture-card" :limit="1"
                    :on-change="onchangeFile" :auto-upload="false">
                    <el-icon>
                        <Plus />
                    </el-icon>

                    <template #file="{ file }">
                        <div>
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <el-icon><zoom-in /></el-icon>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                </span>
                            </span>
                        </div>
                    </template>
                </el-upload>
                <el-button type="primary" @click="setPicFun">保存本地</el-button>
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
                <el-select v-model="form.task_params.category_id" filterable remote reserve-keyword placeholder="专用"
                    remote-show-suffix :remote-method="remoteMethod" :loading="loading">
                    <el-option v-for="item in category_infoList" :key="item.cid" :label="item.name" :value="item.cid" />
                </el-select>
            </el-form-item>


            <el-form-item label="图书分组：" :required="true">
                <div style="display: flex; width: 100%;">
                    <el-select style="flex: 1;" v-model="form.task_params.book_group_id" placeholder="请选择图书分组">
                        <el-option v-for="item in bookList" :key="item.group_id" :label="item.group_name"
                            :value="item.group_id" />
                    </el-select>
                    <el-button type="primary" @click="getbookGroupFun">刷新分组</el-button>

                </div>

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
        <!-- <el-form label-width="80px" style="width: 50%; margin-left: 50px;">
            <el-form-item label="宝贝详情">
                <el-input placeholder="请输入html" type="textarea" v-model="form.task_params.detial"></el-input>
            </el-form-item>
            <div v-html="form.task_params.detial" class="html-preview"></div>
        </el-form> -->

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>

    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getbookGroup, templateS, getCategory, category_info, setcache, getcache, uploadImage } from "@/api/price/index"

import { createTask } from "@/api/task/index"
import { ElMessage } from "element-plus";

import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

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
        picture_path: '',
        is_new: true,
        publish_option: 0,  // 0 直接上架  1 放入仓库
        book_group_id: "",
        category_id: 1,
        category: "",
        template: "",

    }
});
// 设置缓存
const fileList = ref([])
function setTitle_prefix() {
    setcache({ cache_type: form.task_params.title_prefix }, 'prefix').then((res) => {
        if (res && res.code == 200) {
            ElMessage.success("设置成功");
        }

    })
}
// 获取缓存 
function getTitle_prefix() {
    getcache('prefix').then((res) => {
        if (res && res.code == 200) {
            form.task_params.title_prefix = res.data.cache_type;
        }

    })
}
getTitle_prefix()
// 设置宝贝描述
function setdescFun() {
    setcache({ desc: form.task_params.desc }, "desc").then((res) => {
        if (res && res.code == 200) {
            ElMessage.success("设置成功");

        }
    })
}
// 获取宝贝描述
function getdescFun() {
    getcache('desc').then((res) => {
        form.task_params.desc = res.data.desc;
    })
}
getdescFun()


// 设置宝贝描述
function setTitle_filter() {
    setcache({ desc: form.task_params.title_filter }, "filter").then((res) => {
        if (res && res.code == 200) {
            ElMessage.success("设置成功");
        }
    })
}
// 获取宝贝描述
function getTitleFilter() {
    getcache('filter').then((res) => {
        form.task_params.title_filter = res.data.desc;
    })
}
getTitleFilter()

function setPicFun() {
    let sid = JSON.parse(localStorage.getItem('tbMsg')) && JSON.parse(localStorage.getItem('tbMsg')).sid
    if (sid) {
        setcache({ desc: form.task_params.picture_path }, `pic_${sid}`).then((res) => {
            if (res && res.code == 200) {
                ElMessage.success("设置成功");
            }
        })
    } else {

    }





}
function getPicFun() {
    let sid = JSON.parse(localStorage.getItem('tbMsg')) && JSON.parse(localStorage.getItem('tbMsg')).sid
    if (sid) {
        getcache(`pic_${sid}`).then((res) => {
            form.task_params.picture_path = res.data.desc;
            fileList.value = [{ name: 'xiang', url: form.task_params.picture_path }]
        })

    } else {
        ElMessage.warning("请先授权店铺")
    }

}
getPicFun()



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
    console.log("FFFF", e)
    let res = await category_info(e)
    loading.value = false
    category_infoList.value = res.data.item_cats
}
remoteMethod()



const sureIssuFun = async () => {

    if (!form.task_name) return ElMessage.warning("任务名称必须填写!")



    if (!form.task_params.stock) return ElMessage.warning("宝贝库存必填写!")

    if (!form.task_params.stock) return ElMessage.warning("宝贝库存必填写!")
    if (!form.task_params.num) return ElMessage.warning("宝贝库存必填写!")
    if (!form.task_params.stock) return ElMessage.warning("发布数量必填写!")
    if (!form.task_params.category_id) return ElMessage.warning("发布类目必填写!")


    if (!form.task_params.book_group_id) return ElMessage.warning("图书分组必须填写!")
    if (!form.task_params.stock) return ElMessage.warning("分类必须选择!")
    if (!form.task_params.category_id) return ElMessage.warning("运费模版必选!")

    let res = await createTask(form)
    if (res && res.code == 200) {
        ElMessage.success("发布图书成功")

    }
}
// 上传图片相关逻辑

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file) => {
    fileList.value = []
}
const handlePictureCardPreview = (file) => {

    dialogImageUrl.value = file.url
    dialogVisible.value = true
}



const onchangeFile = (file) => {
    console.log("3333", file)
    console.log(file.raw)
    let formdata = new FormData()
    formdata.append("image", file.raw)
    uploadImage(formdata).then((res) => {
        if (res.code == 200 && res.data.picture) {
            form.task_params.picture_path = res.data.picture.picture_path
            fileList.value = [{ name: 'xiang', url: res.data.picture.picture_path }]
            ElMessage.success("上传成功")
        }

    })
}







</script>
<style scoped lang="scss">
.form-warp {
    display: flex;
}

.html-preview {
    border: 2px solid #ccc;
    min-height: 600px;
    border-radius: 10px;
}
</style>
