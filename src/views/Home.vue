<template>
  <div>
    <h1 class="text-2xl font-bold">Hi there!</h1>
    <button class="btn" @click="handleLogin">login</button>
  </div>
</template>

<script setup lang="ts">
import type { UserInfo } from '@/logic/login'
import { login } from '@/logic/login'

const user: UserInfo = {
  username: 'T14827',
  password: '520Guygubaby',
  platform: '3',
}

const handleLogin = () => {
  login(user)
}
</script>
