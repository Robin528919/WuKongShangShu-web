<template>
    <el-dialog title="批量新增违禁词" v-model="visible" draggable width="500px" destroy-on-close append-to-body @close="cancel">
        <el-form ref="configRef" :model="form" label-width="120px">
            <el-form-item label="上传违禁词附件：">
                <el-upload  :auto-upload="false" :limit="1" :on-change="handlePreviewFun">
                    <el-button type="primary">上传违禁词文件</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            只能支持.txt文件
                        </div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item label="违禁词：">
                <el-input v-model="form.words" type="textarea" placeholder="请输入参数名称" />
                <span style="color: red;">注意格式事例:a,v,b,c,你,国家</span>
            </el-form-item>
            <!-- <el-form-item label="生成违禁词库：" prop="configType">
                   <el-button type="primary">生成违禁词至违禁词库 </el-button>
                </el-form-item>
                <el-form-item label="" prop="configType">
                   <el-button type="warning">等待违禁词上传</el-button>
                </el-form-item> -->
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, reactive } from "vue"

import { addWord, uploadWord} from "@/api/admin/index";
import { Message } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const props = defineProps({
    open: {
        type: Boolean,
        required: true,
        default: true
    }
})
const emit = defineEmits(['close']);
const visible = ref(props.open);

const form = reactive({
    words: '',
})
const handlePreviewFun = (file) => {
    let fromDate = new FormData();
    fromDate.append("file", file.raw);
    uploadWord(fromDate).then(res => {
        if (res.code == 200) {
            ElMessage.success("新增违禁成功")
            emit('close')

        }
    })
}
// 提交
const submitForm = async () => {
    if (!form.words) {
        ElMessage.warning("请输入要新增的违禁词")
        return
    }
    let wordsArr = form.words.split(",")
    let res = await addWord(wordsArr)
    if (res.code == 200) {
        ElMessage.success("新增违禁成功")
        emit('close')
    }
}
const cancel = () => {
    emit('close')
}


</script>
<style scoped lang='scss'></style>
