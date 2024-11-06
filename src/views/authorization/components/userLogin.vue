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
      <el-button type="primary" @click="getAuthuUrlFun">授权登陆</el-button>
    </el-form-item>
   
    <el-form-item label="淘标题优化:">
      <el-link type="primary"  target="_blank" href="https://fuwu.taobao.com/ser/detail.htm?service_code=FW_GOODS-1857923"> api购买</el-link>
    </el-form-item>
   
    <el-form-item label="access_token:">
     {{ tbinfoDetail.access_token }}
    </el-form-item>
    <el-form-item label="code:">
      {{ tbinfoDetail.code }}
    </el-form-item>
    <el-form-item label="过期时间：">
      {{ tbinfoDetail.expiration_time }}
    </el-form-item>
    <el-form-item label="refresh_token：">
      {{ tbinfoDetail.refresh_token }}
    </el-form-item>
    <el-form-item label="sid：">
      {{ tbinfoDetail.sid }}
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import { getTb, postTb ,getAuthuUrl,tbInfo} from "@/api/taobao/index.js"
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

const getTbMsg = async () => {
  let res = await getTb()
  if (res.code == 200) {
    shopMsg.value = res.data
    useTbMsgStore().changeTbMsg(shopMsg.value)
    console.log("formform", shopMsg)
    proxy.$modal.msgSuccess("获取淘宝信息成功");
    tbInfoFun()
  }
}
getTbMsg()

//  获取淘宝信息成功{
const tbinfoDetail = ref(null)
function tbInfoFun(){
  tbInfo().then(res => {
    tbinfoDetail.value = res.data
  })
}



// const session_key = ref("")
// const updateMsg = async () => {
//   let res = await postTb({
//     session_key: session_key.value
//   })
//   if (res.code == 200) {
//     proxy.$modal.msgSuccess("获取淘宝信息成功");
//   }
// }

const getAuthuUrlFun= async()=>{
  let res = await getAuthuUrl()
  if (res.code == 200) {
    window.open(res.data.url)
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
