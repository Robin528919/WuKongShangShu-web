<template>
    <el-row :gutter="10">
        <el-col :span="2">
            <el-button type="primary">图书采集设置</el-button>
        </el-col>
        <el-col :span="4">
            <span>云服务总数据</span>
            <el-button type="success">0</el-button>
        </el-col>
        <el-col :span="4">
            <span>总分组数</span>
            <el-button type="success">8</el-button>
        </el-col>
        <el-col :span="4">
            <span>起点数据id：</span>
            <el-button type="success">8</el-button>
        </el-col>
        <el-col :span="4">
            <span>终点数据id：</span>
            <el-button type="success">8</el-button>
        </el-col>

    </el-row>
    <div class="form-warp" style="margin-top: 15px;">

        <el-form :model="form" label-width="120px">
            <el-form-item label="每组数量：">
                <el-input-number v-model="form.roleName" :min="1" :max="10" />
            </el-form-item>
            <el-form-item label="分组列表：">
                <div style="display: flex;">
                    <el-select v-model="form.region" placeholder="" style="width: 220px;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary">点击刷新分组</el-button>

                </div>

            </el-form-item>
            <el-form-item label="分组数据：">
                <div style="display: flex;">
                <el-select v-model="form.region" placeholder="" style="width: 220px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary">选择分组后刷新</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>

</template>

<script setup>
import { ref, reactive, toRefs } from 'vue';
const options = []
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
<style scoped lang='scss'>
.form-warp {
    max-width: 800px;
}
</style>
