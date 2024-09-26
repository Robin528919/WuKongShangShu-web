<template>
    <div class="form-warp">
        <el-button type="primary">授权状态</el-button>
        <el-form :model="form" label-width="120px">
            <el-form-item label="商城登录状态:">
                <el-tag type="success">登陆成功</el-tag>
            </el-form-item>
            <el-form-item label="淘宝授权状态:">
                <el-tag type="danger">未授权</el-tag>
            </el-form-item>
            <el-form-item label="店铺绑定状态:">
                <el-tag type="danger">未绑定</el-tag>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-form-item label="店铺id:">
                    <el-button type="success">2321</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="1.5">
                <el-form-item label="店铺名称:">
                    <el-button type="success">2321</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="1.5">
                <el-form-item label="在售总数:">
                    <el-button type="success">2321</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="1.5">
                <el-form-item label="仓库总数:">
                    <el-button type="success">2321</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="1.5">
                <el-form-item label="违禁下架:">
                    <el-button type="success">2321</el-button>
                    <el-button type="primary">刷新获取店铺信息</el-button>
                </el-form-item>
            </el-col>

        </el-row>



    </div>

</template>

<script setup lang='ts'>
import { ref, reactive, toRefs } from 'vue';
const form = reactive({
    roleName: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

</script>
<style scoped lang='scss'></style>
