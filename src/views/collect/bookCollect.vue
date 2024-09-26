<template>
    <el-tabs type="border-card">
        <el-tab-pane label="图书采集">
            <bookCj />
        </el-tab-pane>
        <el-tab-pane label="分组采集">
            <groupCj />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import bookCj from "./components/bookCj"
import groupCj from "./components/groupCj"
import { ref, reactive, toRefs } from 'vue';
</script>
<style scoped lang='less'></style>
