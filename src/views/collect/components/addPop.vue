<template>
    <el-dialog :title="title" destroy-on-close v-model="visible" :before-close="cancel" width="500px" append-to-body>
      <el-form ref="configRef" label-width="80px">
        <el-form-item label="分组名字" :required="true">
          <el-input v-model="form.group_name"  placeholder="请输入分组名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="text" v-model="form.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" v-if="title == '新增'" @click="submitForm">确 定</el-button>
          <el-button type="primary" v-else @click="updateFun">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  <script setup>
  import { reactive, onMounted } from "vue";
  const { proxy } = getCurrentInstance();
  import { createbookGroup,  updatetUser } from "@/api/price/index"
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
    }
  
  });
  
  const visible = ref(props.open)
  let form = reactive({
    group_name: "", // 分组名字
    description: "", // 分组描述
  
  
  });
  const submitForm = async () => {
    if(!form.group_name){
        proxy.$modal.msgWarning("分组名称必填")
        return
    }
    let res = await createbookGroup(form)
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
    }
  })
  // 确定修改
  
  const updateFun = async () => {
  
    let res = await updatetUser(form)
    if (res.code == 200) {
      proxy.$modal.msgSuccess("修改成功")
      emit('close')
    }
  }
  
  
  
  
  </script>
  <style scoped lang="scss"></style>