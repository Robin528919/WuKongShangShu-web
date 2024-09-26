<template>
    <h3>淘宝账号授权</h3>
    <el-form :model="form" label-width="120px">
      <el-form-item label="店铺图片：">
       
      </el-form-item>
      <el-form-item label="店铺id：">
       
      </el-form-item>
      <el-form-item label="店铺名称：">
        <el-button type="primary">绑定悟空上书商城</el-button>
       
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
  