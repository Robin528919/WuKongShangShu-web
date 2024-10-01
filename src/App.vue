<template>
    <router-view />
</template>
<script setup>
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'

import {configFun} from  "@/api/price/index";


onMounted(() => {
    nextTick(() => {
        // 初始化主题样式
        handleThemeStyle(useSettingsStore().theme)
        configFun()
    })
})
</script>
