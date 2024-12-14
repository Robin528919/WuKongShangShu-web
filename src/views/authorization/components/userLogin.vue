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
      <el-button type="primary" @click="settbInfoFun">同步授权信息</el-button>
    </el-form-item>
   
    <el-form-item label="淘标题优化:">
      <el-link type="primary"  target="_blank" href="https://fuwu.taobao.com/ser/detail.htm?spm=a1z13.fuwu_search_result_2023.0.0.25315aca5U1SZ7&service_code=FW_GOODS-1857923&tracelog=search&from_key=%E6%B7%98%E6%9C%89%E9%81%93"> api购买</el-link>
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
import { getTb, postTb ,getAuthuUrl,tbInfo,settbInfo} from "@/api/taobao/index.js"
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
const tbinfoDetail = ref({})
function tbInfoFun(){
  tbInfo().then(res => {
    tbinfoDetail.value = res.data
    settbInfoFun()

  })
}

// settbInfo

const settbInfoFun= async()=>{
  if(!tbinfoDetail.value.access_token){
    proxy.$modal.msgWarning("请先授权");
  }
  let res = await settbInfo(tbinfoDetail.value)
  if(res&&res.code==200){
    proxy.$modal.msgSuccess("同步淘宝信息成功");
  }


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
