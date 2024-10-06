<template>
  <el-dialog :title="title" destroy-on-close v-model="visible" width="600px" append-to-body>
    <el-form ref="configRef" :model="form" label-width="120px">

      <el-form-item label="水印预览">
        <div class="sypic"></div>
        <!-- <el-input v-model="form.name" placeholder="请输入档位名称(不可重复)" /> -->
      </el-form-item>
      <el-form-item label="上传水印图片" :required="true">
        <!-- action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" -->
        <el-upload class="avatar-uploader" :show-file-list="false" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="水印位置" :required="true">
        <el-radio-group v-model="form.position">
          <el-radio v-for="item in position" :key="item.id" :value="item.id">{{ item.text }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否启用" :required="true">
        <el-radio-group v-model="form.is_enable">
          <el-radio :value=true>是</el-radio>
          <el-radio :value=false>否</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="说明">
        <el-input v-model="form.description" type="textarea" placeholder="请输入内容" />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" v-if="title == '添加水印'" @click="submitForm">确 定</el-button>
        <el-button type="primary" v-else @click="updateFun">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { addwatermark, putwatermark } from "@/api/price/index"
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  title: {
    type: String,
    default: "新增",
  },
  open: {
    type: Boolean,
    default: "",
  },
  editObj: {
    type: Object,
    default: {},
  },
  position: {
    type: Array,
    default: [],
  }

});
const visible = ref(props.open)
let form = reactive({
  file: '',
  position: 1,
  is_enable: true,
});
const imageUrl = ref('')

const beforeAvatarUpload = (rawFile) => {
  form.file = rawFile
  imageUrl.value = URL.createObjectURL(rawFile)
 
}
const submitForm = async () => {
  if (!form.file) return proxy.$modal.msgWarning("请上传图片!")
  let formData = new FormData()
  formData.append("file", form.file)
  formData.append("position", form.position)
  formData.append("is_enable", form.is_enable)
  let res = await addwatermark(formData)
  if (res.code == 200) {
    proxy.$modal.msgSuccess("新增成功")
    emit('close')
  }
}
const emit = defineEmits(['close'])
function cancel() {
  emit('close')
}
// 修改
onMounted(() => {
  if (props.title == '修改') {
    form = props.editObj
    // if(form.is_enable){
    //   form.is_enable=1
    // }else{
    //   form.is_enable=0
    // }

  }
})
// 确定修改

const updateFun = async () => {

  if (!form.file) return proxy.$modal.msgWarning("请上传图片!")
  let formData = new FormData()
  formData.append("file", form.file)
  formData.append("position", form.position)
  formData.append("is_enable", form.is_enable)
  let res = await putwatermark(formData)
  if (res.code == 200) {
    proxy.$modal.msgSuccess("新增成功")
    emit('close')
  }
}




</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.sypic {
  height: 100px;
  width: 100px;
  border: 1px solid yellow;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>