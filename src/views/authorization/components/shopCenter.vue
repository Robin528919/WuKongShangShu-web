<template>
  <h3>淘宝账号授权</h3>
  <el-form :model="form" label-width="120px">
    <el-form-item label="店铺图片：">
      <img class="imgpic" :src="shopMsg.pic_path">

    </el-form-item>
    <el-form-item label="店铺id：">
      {{
        shopMsg.sid }}
    </el-form-item>
    <el-form-item label="店铺名称：">
      <el-button type="primary"  @click="getCode">绑定悟空上书商城</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, toRefs, onMounted } from "vue";
let shopMsg = ref({
  pic_path: '',
  sid: '',
  title: ""
});
onMounted(() => {
  shopMsg.value = JSON.parse(localStorage.getItem('tbMsg'))
    || {}

})
function getCode() {
  // 授权登录
  window.open("http://top.cnedo.com/Home/Main?appcode=102&state=luban")
}


</script>
<style scoped lang="scss">
.imgpic {
  height: 100px;
  width: 100px;
  border-radius: 20px;
}
</style>