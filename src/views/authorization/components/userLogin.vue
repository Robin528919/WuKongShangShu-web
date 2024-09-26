<template>
  <h3>淘宝账号授权</h3>
  <el-form :model="form" label-width="120px">
    <el-form-item label="淘宝授权：" :required="true">
      <el-tag type="success">已授权</el-tag>
      <el-tag v-if="false" type="error">未授权</el-tag>
    </el-form-item>
    <el-form-item label="店铺绑定" :required="true">
      <el-tag v-if="false" type="success">已绑定</el-tag>
      <el-tag type="error">未绑定</el-tag>
    </el-form-item>
    <el-form-item label="店铺图片：" :required="true"> </el-form-item>
    <el-form-item label="店铺id："> </el-form-item>
    <el-form-item label="店铺名称："> </el-form-item>

    <el-form-item label="店铺登陆：">
      <el-button type="primary">获取淘宝店铺认证码</el-button>
      <span style="margin-left: 100px"
        >注意：跳转界面账号登陆成功后，复制session 到店铺session
        ,获取淘宝session需要先购买应用,注意：api服务订购链接
      </span>
    </el-form-item>
    <el-form-item label="店铺认证：">
      <el-input v-model="form.roleName" style="width: 200px" />
      <el-button type="primary">保存本地</el-button>
      <span style="margin-left: 100px"
        >注意：浏览器关闭后需要重新获取session
      </span>
    </el-form-item>
    <el-form-item label="绑定商城">
      <el-button type="primary">绑定悟空上书商城</el-button>
      <span style="margin-left: 20px"
        >注定：淘宝商铺必须绑定书帮帮商城，才可以进行发布和删除操作</span
      >
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, toRefs } from "vue";
const form = reactive({
  roleName: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
</script>
<style scoped lang="scss"></style>
