<template>
    <el-dialog title="立即充值" v-model="dialogVisible" width="80%" :before-close="dialogBeforeClose">
        <el-container style="background-color: #e1f5fe; padding: 20px;">
        <!-- Header Section -->
        <el-header style="text-align: center; font-weight: bold; font-size: 20px;">
            悟空上书金豆充值中心
        </el-header>
        <el-main>
            <div class="info-section">
                <p>一、金豆是悟空上书商城虚拟货币，可以使用金豆使用悟空上书软件的发布服务。</p>
                <p>二、金豆与流量兑换按1:1，即1金豆=1次流量，你可以选择支付宝或者微信的付款方式进行充值。</p>
            </div>
            <div class="account-info">
                <el-row>
                    <el-col :span="12">
                        <div>充值账号：{{ account }}</div>
                    </el-col>
                    <el-col :span="12">
                        <div>支付状态：<span style="color: red;">{{ paymentStatus }}</span></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div>订单号：{{ orderNumber }}</div>
                    </el-col>
                    <el-col :span="12">
                        <div>当前余额：{{ currentBalance }}</div>
                    </el-col>
                </el-row>
            </div>
            <div class="package-selection">
                <el-row :gutter="20">
                    <el-col :span="3" v-for="(pkg, index) in packages" :key="index">
                        <el-card :class="{ 'selected': selectedPackage === index }" @click="selectPackage(index)"
                            shadow="hover">
                            <p>{{ pkg.title }}</p>
                            <p>{{ pkg.label }}</p>
                            <p>{{ pkg.value }}</p>
                        </el-card>
                    </el-col>
                </el-row>
            </div>

            <!-- Payment Method Selection -->
            <div class="payment-method">
                <p>充值方式：</p>
                <el-radio-group v-model="paymentMethod">
                    <el-radio-button label="支付宝"></el-radio-button>
                    <el-radio-button label="微信支付"></el-radio-button>
                </el-radio-group>
            </div>

            <!-- Amount Display -->
            <div class="amount-display">
                <p>应付金额： <span style="color: red;">{{ selectedAmount }}元</span></p>
            </div>

            <!-- Submit Button -->
            <div style="text-align: center; margin-top: 20px;">
                <el-button type="primary" @click="confirmPayment">确认支付</el-button>
            </div>
        </el-main>
    </el-container>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const pros = defineProps({
    show:{
        type:Boolean,
        default:false
    }
    // 父组件传递的数据
})
const emit = defineEmits(['close'])
const dialogBeforeClose = () => {
    emit('close')
}
const account = ref('sam0614')
const paymentStatus = ref('未下单, 等待下单')
const orderNumber = ref('未生成订单')
const currentBalance = ref(9182)
const selectedPackage = ref(null)
const paymentMethod = ref('支付宝')
const selectedAmount = ref(0)
const dialogVisible = ref(pros.show)

const packages = [
    { title: "套餐一：", label: '5元，10000个金豆', value: 5 },
    { title: "套餐二：", label: '10元，20000个金豆', value: 10 },
    { title: "套餐三：", label: '15元，30000个金豆', value: 15 },
    { title: "套餐四：", label: '25元，50000个金豆', value: 25 },
    { title: "套餐五：", label: '50元，100000个金豆', value: 50 },
    { title: "套餐六：", label: '125元，250000个金豆', value: 125 },
    { title: "套餐七：", label: '2000元，4000000个金豆', value: 2000 },
]

const selectPackage = (index) => {
    selectedPackage.value = index
    selectedAmount.value = packages[index].value
}

const confirmPayment = () => {
    if (selectedPackage.value === null) {
        alert('请选择充值套餐')
        return
    }
    if (!paymentMethod.value) {
        alert('请选择支付方式')
        return
    }
    alert(`已选择${paymentMethod.value}支付${selectedAmount.value}元`)
    // 模拟支付后重置状态
    paymentStatus.value = '已支付'
    orderNumber.value = `订单${Date.now()}`
    currentBalance.value += packages[selectedPackage.value].value * 1000 // 假设每元兑换1000金豆
}
</script>

<style scoped>
.info-section {
    text-align: center;
    margin-bottom: 20px;
}

.account-info {
    margin: 20px 0;
    font-size: 16px;
}

.package-selection {
    margin: 20px 0;
}

.package-selection .el-card {
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    padding: 10px;
}

.package-selection .el-card.selected {
    border: 2px solid #409EFF;
}

.payment-method {
    margin: 20px 0;
    display: flex;
    align-items: center;
}

.payment-method p {
    margin-right: 10px;
}

.amount-display {
    text-align: center;
    font-size: 18px;
    margin: 20px 0;
}
</style>
