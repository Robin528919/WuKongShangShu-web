<template>
  <el-dialog :title="title" destroy-on-close v-model="visible" width="500px" @close="cancel" append-to-body>
    <el-form ref="configRef" label-width="80px">

      <el-form-item label="邮箱" :required="true">
        <el-input v-model="form.email" disabled placeholder="请输入档位名称(不可重复)" />
      </el-form-item>
      <el-form-item label="状态" :required="true">
        <el-select v-model="form.status" placeholder="">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="text" v-model="form.remark" />
      </el-form-item>
      <el-form-item label="余额">
        <el-input-number v-model="form.balance" min="0" />
      </el-form-item>
      <el-form-item label="会员时间">
        <el-input-number v-model="form.expire_days"  min="0"  />
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
import { addprice,  updatetUser } from "@/api/price/index"
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
const options = [
  {
    value: 0,
    label: "正常"
  },
  {
    value: 1,
    label: "冻结"
  },
]
const visible = ref(props.open)
let form = reactive({
  email: "",
  status: 0, //  用户状态:0-正常 1-冻结
  remark: "",// 
  balance: 0

});
// const submitForm = async () => {
//   let res = await addprice(form)
//   if (res.code == 200) {
//     proxy.$modal.msgSuccess("新增成功")
//     emit('close')
//   }
// }
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