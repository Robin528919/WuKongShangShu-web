<template>
    <el-tabs type="border-card">
        <el-tab-pane label="图书发布">
            <issueSet />
        </el-tab-pane>
        <!-- <el-tab-pane label="图书发布">
            <bookIssue />
        </el-tab-pane> -->
        <!-- <el-tab-pane label="批量上架/下架">批量上架/下架</el-tab-pane> -->
    </el-tabs>
</template>

<script setup>
import issueSet from "./components/issueSet"
import bookIssue from "./components/bookIssue"

import { ref, reactive, toRefs } from 'vue';
</script>
<style scoped lang='less'></style>
