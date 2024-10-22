<template>
    <el-tabs type="border-card">
        <el-tab-pane label="账号登陆">
            <userLogin />
        </el-tab-pane>
        <!-- <el-tab-pane label="店铺中心">
            <shopCenter />
        </el-tab-pane> -->
    </el-tabs>
</template>

<script setup>
import userLogin from "./components/userLogin"
import shopCenter from "./components/shopCenter"
import { ref, reactive, toRefs } from 'vue';
</script>
<style scoped lang='less'></style>
