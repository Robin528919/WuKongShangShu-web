<template>
    <div class="form-warp">
        <el-button type="primary">图书发布设置</el-button>
        <el-form :model="form" label-width="120px">
            <el-form-item label="商城登陆：" :required="true">
                <el-tag type="success">登陆成功</el-tag>
            </el-form-item>
            <el-form-item label="淘宝授权：" :required="true">
                <el-tag type="danger">未授权</el-tag>
            </el-form-item>
            <el-form-item label="店铺绑定：" :required="true">
                <el-tag type="danger">未绑定</el-tag>
            </el-form-item>
            <el-form-item label="宝贝描述：" :required="true">
                <div style="display: flex;align-items: center;width: 100%;">
                    <el-input style="flex: 1;"></el-input>
                    <el-button style="margin-left: 10px;" type="primary">保存至本地数据</el-button>
                </div>
            </el-form-item>
            <el-form-item label="标题前缀：">
                <div style="display: flex;align-items: center;width: 100%;">
                    <el-input style="flex: 1;"></el-input>
                    <el-button style="margin-left: 10px;" type="primary">保存至本地数据</el-button>
                    <span>注意：宝贝标题前缀，无内容，无前缀</span>
                </div>
            </el-form-item>
            <el-form-item label="标题过滤：">
                <div style="display: flex;align-items: center;width: 100%;">
                    <el-input style="flex: 1;"></el-input>
                    <el-button style="margin-left: 10px;" type="primary">保存至本地数据</el-button>
                </div>
                <span>格式：包邮,免费,最牛</span>
            </el-form-item>


            <el-form-item label="水印选择" :required="true">
                <el-checkbox-group v-model="form.resource">
                    <el-checkbox value="Online activities" name="type">
                        正面
                    </el-checkbox>
                    <el-checkbox value="Promotion activities" name="type">
                        左上角
                    </el-checkbox>
                    <el-checkbox value="Offline activities" name="type">
                        右上角
                    </el-checkbox>
                    <el-checkbox value="Simple brand exposure" name="type">
                        右下角
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="宝贝库存：">
                <el-input-number v-model="form.roleName" :min="1" :max="10" />
            </el-form-item>
            <el-form-item label="发布等待：">
                <el-input-number v-model="form.roleName" :min="1" :max="10" />
                单位/秒
            </el-form-item>

            <el-form-item label="线程并发：">
                <el-input-number v-model="form.roleName" :min="1" :max="10" />
            </el-form-item>
            <el-form-item label="重试次数：">
                <el-input-number v-model="form.roleName" :min="1" :max="10" />
            </el-form-item>
            <el-form-item label="发布数量：">
                <el-input-number v-model="form.roleName" :min="1" :max="10" />
            </el-form-item>
            <el-form-item label="是否全新：">
                <el-radio-group v-model="form.resource">
                    <el-radio value="1">全新</el-radio>
                    <el-radio value="0">二手</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="发布选项：">
                <el-radio-group v-model="form.resource">
                    <el-radio value="1">采集1.0</el-radio>
                    <el-radio value="0">采集2.0</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="重复发布：">
                <el-radio-group v-model="form.resource">
                    <el-radio value="1">重复发布</el-radio>
                    <el-radio value="0">不重复发布</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- <el-form-item>
                <el-button type="danger">取消采集</el-button>
                <el-button type="danger">暂停采集</el-button>
                <el-button type="primary">继续采集</el-button>
                <el-button type="primary">进行采集</el-button>
            </el-form-item> -->
        </el-form>
    </div>
</template>

<script setup lang="ts">
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
<style scoped lang="scss">
.form-warp {
    width: 800px;
}
</style>
