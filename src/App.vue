<template>
    <router-view />
</template>
<script setup>
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'

import { configFun } from "@/api/price/index";


onMounted(() => {
    nextTick(async () => {
        // 初始化主题样式
        handleThemeStyle(useSettingsStore().theme)
        let res = await configFun()
        if (res && res.code == 200) {
            localStorage.setItem('codeArr',JSON.stringify(res.data))

        }
    })
})
</script>
