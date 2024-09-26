<template>
   <el-row :gutter="10">
       <el-col :span="2">
        <el-button type="primary">删除出售图书</el-button>
       </el-col>
       <el-col :span="2">
        <span>店铺id：</span>
        <el-button type="success">231231</el-button>
       </el-col>
       <el-col :span="2">
        <span>店铺名称：</span>
        <el-button type="success">反倒是</el-button>
       </el-col>
       <el-col :span="2">
        <span>在售总数：</span>
        <el-button type="success">231231</el-button>
       </el-col>
       <el-col :span="2">
        <span>仓库总数：</span>
        <el-button type="success">231231</el-button>
       </el-col>
       <el-col :span="2">
        <span>违规下架：</span>
        <el-button type="success">231231</el-button>
       </el-col>
       <el-col :span="2">
        <el-button type="primary">刷新获取店铺嘻嘻</el-button>
       </el-col>
   </el-row>
<!-- form 部分 -->
<el-form :model="form" label-width="120px">
    <el-form-item label="自定义分类：" :required="true">
    <el-select v-model="form.roleName" placeholder="" style="width: 200px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="线程并发：" :required="true">
    <el-input-number v-model="form.roleName"  :min="1" :max="10" ></el-input-number>
    </el-form-item>
  

    <el-form-item label="商家编码：">
      <el-input v-model="form.roleName" placeholder="" style="width: 200px;"></el-input>
      <span style="margin-left: 100px"
        >输入想要删除的书店id,格式1111,2222,3333注意：根据商家编码删除，自定义分类，宝贝销量，选项填写也用不到
      </span>
    </el-form-item>
    <el-form-item label="宝贝销量==0：">
     <el-radio-group v-model="form.roleName">
         <el-radio label="只删除销量=0"></el-radio>
         <el-radio label="删除销量=0和有销量的"></el-radio>
     </el-radio-group>
    </el-form-item>
    <el-form-item label="是否删除：">
     <el-radio-group v-model="form.roleName">
         <el-radio label="删除"></el-radio>
         <el-radio label="不删除"></el-radio>
     </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" >全部清空出售商品！！！</el-button>
      <el-button  type="danger">取消删除</el-button>
      <el-button  type="danger">暂停删除</el-button>
      <el-button  type="primary">继续删除</el-button>
      <el-button  type="primary">进行删除</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, toRefs } from "vue";
const options = []
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

<style scoped lang='scss'>
</style>
