<template>
  <div class="text-center py-4">
    <div class="py-2">
      <span class="cursor-pointer" @click="() => toogleDark()">
        <carbon-moon v-if="isDark" />
        <carbon-sun v-else />
      </span>
    </div>

    <p class="flex items-center justify-center">Made by bryce with <mdi:cards-heart class="text-red-500 ml-1" /></p>
  </div>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toogleDark = useToggle(isDark)
</script>
