<template>
  <el-row >
    <el-col :span="2"> 
        <el-button type="primary">图书发布信息</el-button>
    </el-col>
    <el-col :span="2"> 
        <span>本地服务总数居</span>
        <el-button type="success">4</el-button>
    </el-col>
    <el-col :span="2"> 
        <span>总分组数</span>
        <el-button type="success">4</el-button>
    </el-col>
    <el-col :span="2"> 
        <span>起点数据id</span>
        <el-button type="success">4</el-button>
    </el-col>
    <el-col :span="2"> 
        <span>终点数据id</span>
        <el-button type="success">4</el-button>
    </el-col>
    <el-col :span="2"> 
        <span>分组数据</span>
       <el-select v-model="model" placeholder="">
           <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
           </el-option>
       </el-select>
       <el-button type="success">选择分组后刷新</el-button>
    </el-col>
  </el-row>

  <el-row >
    <el-col :span="2"> 
        <el-button type="primary"> 淘宝店铺信息</el-button>
    </el-col>
    <el-col :span="2"> 
        <span>店铺id：</span>
        <el-button type="success">4</el-button>
    </el-col>
    <el-col :span="2"> 
        <span>店铺名称：</span>
        <el-button type="success">4</el-button>
    </el-col>
    <el-col :span="2"> 
        <span>在售总数：</span>
        <el-button type="success">4</el-button>
    </el-col>
    <el-col :span="2"> 
        <span>仓库总数：</span>
        <el-button type="success">4</el-button>
    </el-col>

    <el-col :span="2"> 
        <span>违规下架：</span>
        <el-button type="success">4</el-button>
    </el-col>
    <el-col :span="2"> 
        <el-button type="primary"> 刷新获取店铺信息</el-button>
    </el-col>
  </el-row>
  <el-form :model="form" label-width="120px">
    <el-form-item label="每组个数：" :required="true">
      <el-input v-model="form.delivery" placeholder="" style="width: 200px;"></el-input>
      <span>注意：对总数数据进行分组</span>
    </el-form-item>
    <el-form-item label="违禁词过滤" :required="true">
      <el-tag  type="success">使用官方违禁词</el-tag>
      <el-tag type="error">vip专享</el-tag>
      <span>注意：对标题进行过滤，不符合的禁止发布</span>
    </el-form-item>
    <el-form-item label="类目选择：" :required="true"> 
        <el-select v-model="model" placeholder="" style="width: 200px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="model" placeholder="" style="width: 200px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <el-button type="primary">点击获取</el-button>
    </el-form-item>
  
    <el-form-item label="店铺登陆：">
      <el-button type="primary">获取淘宝店铺认证码</el-button>
      <span style="margin-left: 100px"
        >注意：跳转界面账号登陆成功后，复制session 到店铺session
        ,获取淘宝session需要先购买应用,注意：api服务订购链接
      </span>
    </el-form-item>
    <el-form-item label="自定义分类：">
     <el-select v-model="model" placeholder="" style="width: 200px;">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
     </el-select>
      <el-button type="primary">点击获取</el-button>
    </el-form-item>
    <el-form-item label="运费模版">
        <el-select v-model="model" placeholder="" style="width: 200px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
      <el-button type="primary">绑定悟空上书商城</el-button>
    </el-form-item>
    <el-form-item>
       <el-button type="danger">取消发布</el-button>
       <el-button type="danger">暂停发布</el-button>
       <el-button type="primary">继续发布</el-button>
       <el-button type="primary">开始发布</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
const options = [];
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
