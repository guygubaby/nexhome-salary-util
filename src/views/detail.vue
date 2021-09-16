<template>
  <div class="p-4">
    <div class="text-center py-4">
      <p class="text-2xl pb-2 text-purple-600 font-bold">Welcome back !</p>
      <p v-if="userInfo" class="text-lg text-purple-500">
        {{ userInfo?.name }} - {{ userInfo?.code }} - {{ userInfo?.dep }}
      </p>
    </div>

    <div class="rounded-lg overflow-hidden shadow-sm shadow-light-50">
      <Cell v-for="item in salary" :key="item.id" :title="item.label" :value="item.value" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Toast, Cell } from 'vant'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { Item } from '@/logic/salary-info'
import { LoginedUser } from '@/logic/user-info'

onBeforeUnmount(() => {
  sessionStorage.clear()
})

const getItem = (key: string) => {
  try {
    const res = sessionStorage.getItem(key)
    return JSON.parse(res || '')
  } catch (error) {
    Toast.fail((error as any).message)
  }
}

const userInfo = ref<LoginedUser | null>(null)
const salary = ref<Item[]>([])

const init = () => {
  const _userInfo = getItem('userInfo') as LoginedUser
  const _salary = getItem('salary') as Item[]
  userInfo.value = _userInfo
  salary.value = _salary
}

onMounted(init)
</script>
