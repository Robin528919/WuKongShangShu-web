<template>
    <el-row :gutter="10">
        <el-col :span="2">
            <el-button type="primary">批量上架</el-button>
        </el-col>
        <el-col :span="4">
            <span>店铺id：</span>
            <el-button type="success">0</el-button>
        </el-col>
        <el-col :span="4">
            <span>店铺名称：</span>
            <el-button type="success">8</el-button>
        </el-col>
        <el-col :span="4">
            <span>在售总数：</span>
            <el-button type="success">8</el-button>
        </el-col>
        <el-col :span="4">
            <span>仓库总数：</span>
            <el-button type="success">8</el-button>
        </el-col>
        <el-col :span="4">
            <span>违规下架：</span>
            <el-button type="success">8</el-button>
        </el-col>
        <el-col :span="4">
            <el-button type="success">刷新获取店铺信息</el-button>
        </el-col>

    </el-row>
    <div class="form-warp" style="margin-top: 15px;">
        <el-form :model="form" label-width="120px">
            <el-form-item label="自定义分类：">
                <div style="display: flex;">
                <el-select v-model="form.region" placeholder="" style="width: 220px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary">点击获取</el-button>
                </div>
            </el-form-item>
            <el-form-item label="上架库存数量：">
                <el-input-number v-model="form.roleName" :min="1" :max="10" />
            </el-form-item>
            <el-form-item label="线程并发：">
                <el-input-number v-model="form.roleName" :min="1" :max="10" />
            </el-form-item>
            <el-form-item label="是否上架：">
              <el-radio-group v-model="form.region">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item >
                <el-button type="danger">取消上架</el-button>
                <el-button type="danger">暂停上架</el-button>
                <el-button type="danger">继续上架</el-button>
                <el-button type="danger">进行上架</el-button>
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
