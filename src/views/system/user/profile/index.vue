<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="6" :xs="24">
                <el-card class="box-card">
                    <template v-slot:header>
                        <div class="clearfix">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <div>
                        <ul class="list-group list-group-striped">
                            <li class="list-group-item">
                                <svg-icon icon-class="user" />用户名称
                                <div class="pull-right">{{ state.user.userName }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon icon-class="user" />用户id
                                <div class="pull-right">{{ state.user.user_id }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon icon-class="phone" />手机号码
                                <div class="pull-right">{{ state.user.phone }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon icon-class="email" />用户邮箱
                                <div class="pull-right">{{state.user.email }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon icon-class="peoples" />账号状态
                                <div class="pull-right">{{state.user.status==0?'正常':'冻结'  }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon icon-class="money" />账户余额
                                <div class="pull-right"> {{ state.user.balance }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon icon-class="date" />会员到期时间
                                <div class="pull-right">{{ state.user.expire_time }}</div>
                            </li>
                        </ul>
                        <el-button type="primary" @click="topUPStatus=true">立刻充值</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18" :xs="24">
                <el-card>
                    <template v-slot:header>
                        <div class="clearfix">
                            <span>修改密码</span>
                        </div>
                    </template>
                    <el-tabs v-model="activeTab">
                        <!-- <el-tab-pane label="基本资料" name="userinfo">
                            <userInfo :user="state.user" />
                        </el-tab-pane> -->
                        <resetPwd />
                        <!-- <el-tab-pane label="修改密码" name="resetPwd">
                          
                        </el-tab-pane> -->
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
        <topUP :show="topUPStatus"  v-if="topUPStatus" @close="topUPStatus=false"/>
    </div>
</template>

<script setup name="Profile">
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import topUP from "@/views/topup/index";


import { getUserInfo } from "@/api/price/index"


import Cookies from "js-cookie";
const activeTab = ref("resetPwd");

const topUPStatus = ref(false)
const state = reactive({
    user: {},
    roleGroup: {},
    postGroup: {}
});
const email = ref( Cookies.get("email"))
 
function getUser() {
    getUserInfo().then(response => {
        state.user = response.data;
        state.roleGroup = response.roleGroup;
        state.postGroup = response.postGroup;
    });
};

getUser();
</script>
