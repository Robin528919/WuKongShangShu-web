<template>
    <el-tabs type="border-card">
        <el-tab-pane label="删除图书">
            <sqStatus />
        </el-tab-pane>
        <el-tab-pane label="删除出售图书">
            <delBook />
        </el-tab-pane>
        <el-tab-pane label="删除仓库图书">批量上架/下架</el-tab-pane>
    </el-tabs>
</template>

<script setup>
import sqStatus from "./components/sqStatus.vue"
import delBook from "./components/delBook.vue"

import { ref, reactive, toRefs } from 'vue';
</script>
<style scoped lang='less'></style>
