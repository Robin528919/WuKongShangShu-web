<template>
  <h3>淘宝账号授权</h3>
  <el-form :model="form" label-width="120px">
    <el-form-item label="淘宝授权：" :required="true">
      <el-tag type="success" v-if="shopMsg.title">已授权</el-tag>
      <el-tag v-else type="error">未授权</el-tag>
    </el-form-item>
    <el-form-item label="店铺绑定" :required="true">
      <el-tag v-if="shopMsg.title" type="success">已绑定</el-tag>
      <el-tag v-else type="error">未绑定</el-tag>
    </el-form-item>
    <el-form-item label="店铺图片：">
      <img class="imgpic" :src="shopMsg.pic_path">
    </el-form-item>
    <el-form-item label="店铺id："> {{
      shopMsg.sid }}</el-form-item>
    <el-form-item label="店铺名称：">
      {{ shopMsg.title }}
    </el-form-item>
    <el-form-item label="店铺登陆：">
      <el-button type="primary" @click="getAuthuUrlFun">获取授权链接</el-button>
    
    </el-form-item>
    <!-- <el-form-item label="店铺认证：">
      <el-button type="primary" @click="getTbMsg">获取淘宝信息</el-button>
      <span style="margin-left: 100px">注意：浏览器关闭后需要重新获取session
      </span>
    </el-form-item> -->
    <el-form-item label="绑定商城">
      <el-input v-model="session_key" style="width: 200px" placeholder="请输入淘宝店铺认证信息" />
      <el-button type="primary" @click="updateMsg">绑定或更新淘宝信息</el-button>
      <span style="margin-left: 20px">注意：淘宝商铺必须绑定书帮帮商城，才可以进行发布和删除操作</span>
    </el-form-item>
    </el-form>
</template>
<script setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import { getTb, postTb ,getAuthuUrl} from "@/api/taobao/index.js"
// src/store/modules/tbMsg.js
import useTbMsgStore from '../../../store/modules/tbMsg'
const { proxy } = getCurrentInstance();
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
const getTbMsg = async () => {
  let res = await getTb()
  if (res.code == 200) {
    shopMsg.value = res.data
    useTbMsgStore().changeTbMsg(shopMsg.value)
    console.log("formform", shopMsg)
    proxy.$modal.msgSuccess("获取淘宝信息成功");
  }
}
getTbMsg()

const session_key = ref("")
const updateMsg = async () => {
  let res = await postTb({
    session_key: session_key.value
  })
  if (res.code == 200) {
    proxy.$modal.msgSuccess("获取淘宝信息成功");
  }
}

const getAuthuUrlFun= async()=>{
  let res = await getAuthuUrl()
  if (res.code == 200) {
    window.open(res.data.url)
   // proxy.$modal.msgSuccess("获取淘宝信息成功");
  }

}


</script>
<style scoped lang="scss">
.imgpic {
  height: 100px;
  width: 100px;
  border-radius: 20px;
}
</style>
