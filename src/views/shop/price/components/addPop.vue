<template>
  <el-dialog :title="title" destroy-on-close  v-model="visible" width="500px" append-to-body>
    <el-form ref="configRef" :model="form" label-width="80px">
      <el-form-item label="编号" prop="configName">
        <el-input-number v-model="form.configName" />
      </el-form-item>
      <el-form-item label="档位" prop="configKey" :required="true">
        <el-input v-model="form.configKey" placeholder="请输入档位名称(不可重复)" />
      </el-form-item>
      <el-form-item label="开始价格" prop="configName">
        <el-input-number v-model="form.configName" />
      </el-form-item>
      <el-form-item label="结束价格" prop="configName">
        <el-input-number v-model="form.configName" />
      </el-form-item>
      <el-form-item label="原价" prop="configName">
        <el-input-number v-model="form.configName" />
      </el-form-item>
      <el-form-item label="运算符1" prop="configName">
        <el-radio-group v-model="form.resource">
        <el-radio value="相加">相加</el-radio>
        <el-radio value="相乘">相乘</el-radio>
      </el-radio-group>
      </el-form-item>

      <el-form-item label="数字1" prop="configName">
        <el-input-number v-model="form.configName" />
      </el-form-item>

      <el-form-item label="运算符2" prop="configName">
        <el-radio-group v-model="form.resource">
        <el-radio value="相加">相加</el-radio>
        <el-radio value="相乘">相乘</el-radio>
      </el-radio-group>
      </el-form-item>

      <el-form-item label="数字2" prop="configName">
        <el-input-number v-model="form.configName" />
        <span>数字2:与原价相加或者与原价相乘</span>
      </el-form-item>

      <el-form-item label="是否启用" prop="configName">
        <el-radio-group v-model="form.resource">
        <el-radio value="是">是</el-radio>
        <el-radio value="否">否</el-radio>
      </el-radio-group>
      </el-form-item>
      <el-form-item label="说明" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请输入内容"
        />
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
import { reactive } from "vue";
const { proxy } = getCurrentInstance();
const { sys_yes_no } = proxy.useDict("sys_yes_no");
const props = defineProps({
  title: {
    type: String,
    default: "新增",
  },
  open:{
    type: Boolean,
    default: "",
  }
});
const visible= ref(props.open)
const form = reactive({ configName: "", configKey: "", configValue: "" });

const emit = defineEmits(['close'])
function cancel(){
  emit('close')
}

</script>
<style scoped lang="scss"></style>
