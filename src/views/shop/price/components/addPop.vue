<template>
  <el-dialog :title="title" destroy-on-close v-model="visible" width="500px" append-to-body @close="cancel">
    <el-form ref="configRef" :model="form" label-width="80px">

      <el-form-item label="档位名称" :required="true">
        <el-input v-model="form.name" placeholder="请输入档位名称(不可重复)" />
      </el-form-item>
      <el-form-item label="开始价格"  :required="true">
        <el-input-number v-model="form.start_price" 	 />
      </el-form-item>
      <el-form-item label="结束价格" :required="true">
        <el-input-number v-model="form.end_price" />
      </el-form-item>
      <el-form-item label="原价" prop="original_price" :required="true">
        <el-radio-group v-model="form.original_price">
          <el-radio :value="true">是</el-radio>
          <el-radio :value="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="运算符1" prop="operator1" :required="true">
        <el-radio-group v-model="form.operator1">
          <el-radio :value="1">+</el-radio>
          <el-radio :value="2">-</el-radio>
          <el-radio :value="3">X</el-radio>
          <el-radio :value="4">/</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="数字1" prop="number1" :required="true">
        <el-input-number v-model="form.number1" />
      </el-form-item>
      <el-form-item label="运算符2" prop="operator2" :required="true">
        <el-radio-group v-model="form.operator2">
          <el-radio :value="1">+</el-radio>
          <el-radio :value="2">-</el-radio>
          <el-radio :value="3">X</el-radio>
          <el-radio :value="4">/</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="数字2" prop="number2" :required="true">
        <el-input-number v-model="form.number2" />
        <span>数字2:与原价相加或者与原价相乘</span>
      </el-form-item>
      <el-form-item label="是否启用" :required="true">
        <el-radio-group v-model="form.is_enable">
          <el-radio :value=true>是</el-radio>
          <el-radio :value=false>否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="form.description" type="textarea" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" v-if="title=='新增'" @click="submitForm">确 定</el-button>
        <el-button type="primary" v-else @click="updateFun">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive ,onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { addprice,putPrice } from "@/api/price/index"
const props = defineProps({
  title: {
    type: String,
    default: "新增",
  },
  open: {
    type: Boolean,
    default: "",
  },
  editObj:{
    type: Object,
    default: {},
  }

});
const visible = ref(props.open)
let form = reactive({
  name: "",
  start_price: 0,
  end_price: 0,
  original_price: true,
  operator1: 1,
  number1: 0,
  operator2: 1,
  number2: 0,
  description: "",
  is_enable: true
});
const submitForm = async () => {
  let res = await addprice(form)
  if(res.code==200){
    proxy.$modal.msgSuccess("新增成功")
    emit('close')
  }
}
const emit = defineEmits(['close'])
function cancel() {
  emit('close')
}
// 修改
onMounted(()=>{
  if(props.title=='修改'){
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

  let res = await putPrice(form)
  if(res.code==200){
    proxy.$modal.msgSuccess("修改成功")
    emit('close')
  }
}




</script>
<style scoped lang="scss"></style>
