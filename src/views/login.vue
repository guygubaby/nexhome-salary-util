<template>
  <div class="h-8/10">
    <div class="text-center pb-14 pt-8vh">
      <h1 class="text-2xl">Nexhome工资查询小工具</h1>
    </div>

    <Form @submit="onSubmit">
      <CellGroup inset class="shadow-sm shadow-gray-500">
        <Field
          v-model="form.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <Field
          v-model="form.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </CellGroup>

      <div class="mx-4 pt-25vh">
        <Button class="dark:bg-purple-500" round block type="primary" native-type="submit">登录</Button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { Button, Form, Field, CellGroup, Toast } from 'vant'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { loginv2 } from '@/logic-v2/login'

const router = useRouter()

const form = reactive({
  username: undefined,
  password: undefined,
})

const onSubmit = (values: any) => {
  const { username, password } = values

  Toast.loading('Login ...')

  loginv2({
    username,
    password,
    platform: '3',
  })
    .then(() => {
      Toast.success('Login success')
      router.push({
        name: 'detail',
      })
    })
    .catch((error) => {
      const timer = window.setTimeout(() => {
        Toast.fail(error.message)
        window.clearTimeout(timer)
      }, 500)
    })
    .finally(() => {
      Toast.clear(true)
    })
}
</script>
