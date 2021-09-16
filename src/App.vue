<template>
  <div class="w-full" style="height: calc(100vh - var(--vh-offset, 0px))">
    <router-view />
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'Nexhome工资查询小工具',
  meta: [{ name: 'description', content: 'Nexhome工资查询小工具' }],
})
</script>
