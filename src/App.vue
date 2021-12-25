<template>
  <div class="w-full h-screen">
    <router-view />
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import { useHead } from '@vueuse/head'

const isDark = useDark()

useHead({
  title: 'Nexhome工资查询小工具',
  meta: [
    { name: 'description', content: 'Nexhome工资查询小工具' },
    { name: 'keywords', content: 'Nexhome工资查询小工具' },
    { name: 'theme-color', content: isDark.value ? '#141624' : '#ffffff' },
  ],
})
</script>
