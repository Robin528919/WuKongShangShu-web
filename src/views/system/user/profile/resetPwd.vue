<template>
  <el-form ref="pwdRef" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="old_password" :required="true">
      <el-input v-model="user.old_password" placeholder="请输入旧密码" autocomplete="new-password" type="password"
        show-password />
    </el-form-item>
    <el-form-item label="新密码" prop="new_password" :required="true">
      <el-input v-model="user.new_password" placeholder="请输入新密码" autocomplete="new-password" type="password"
        show-password />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword" :required="true">
      <el-input v-model="user.confirmPassword" placeholder="请确认新密码" autocomplete="new-password" type="password"
        show-password />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button type="danger" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { updateUserPwd } from "@/api/system/user";
import { change_passwordApi } from "@/api/price/index"
const { proxy } = getCurrentInstance();
import { removeToken } from "@/utils/auth";
const user = reactive({
  old_password: undefined,
  new_password: undefined,
  confirmPassword: undefined

});

const equalToPassword = (rule, value, callback) => {
  if (user.new_password !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};
const rules = ref({
  old_password: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
  new_password: [{ required: true, message: "新密码不能为空", trigger: "blur" }, { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }, { pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\\ |", trigger: "blur" }],
  confirmPassword: [{ required: true, message: "确认密码不能为空", trigger: "blur" }, { required: true, validator: equalToPassword, trigger: "blur" }]
});
/** 提交按钮 */
function submit() {
  proxy.$refs.pwdRef.validate(valid => {
    if (valid) {
      change_passwordApi(user).then(response => {
        if (response.code == 200) {
          proxy.$modal.msgSuccess("修改成功");
          setTimeout(() => {
            removeToken()
            localStorage.removeItem("is_superuser")
            localStorage.removeItem("tbMsg")
            location.href = '/#login';
          }, 1000)
        }

      });
    }
  });
};

/** 关闭按钮 */
function close() {
  proxy.$tab.closePage();
};
</script>
