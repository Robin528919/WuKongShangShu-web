<template>
  <el-dialog title="违禁词文件上传" v-model="visible" width="500px" append-to-body>
    <el-form ref="configRef" :model="form" label-width="120px">
      <el-form-item label="文件上传：" prop="configName" :required="true">
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
        >
          <el-button type="primary">点击上传文件</el-button>
          <template #tip>
            <div class="el-upload__tip">
              只能上传txt,且不超过100MB,内容格式:A,B
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="生产违禁词" prop="configType">
       <el-button type="success">生成违禁词至本地词库</el-button>
      </el-form-item>
      <el-form-item label="" prop="configType">
       <el-button type="warning">等待违禁词上传</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
const { proxy } = getCurrentInstance();
const { sys_yes_no } = proxy.useDict("sys_yes_no");
import { ref, reactive } from "vue";
 const props =  defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const visible = ref(props.open);

const title = ref("");
const form = reactive({
  configName: "",
  configType: "",
});
const cancel = () => {
  this.$emit("close");
};
</script>
<style scoped lang="scss"></style>
