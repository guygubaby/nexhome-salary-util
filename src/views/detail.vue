<template>
  <div class="p-4">
    <div class="text-center py-4">
      <p v-if="userInfo" class="text text-lg font-medium my-4">
        {{ userInfo?.name }} - {{ userInfo?.code }} - {{ userInfo?.dep }}
      </p>

      <Cell
        is-link
        class="month-cell rounded-lg mb-4 btn"
        title="选择月份"
        :value="currentMonth"
        @click="show = true"
      />

      <Popup v-model:show="show" position="bottom" round>
        <DatetimePicker
          v-model="currentDate"
          type="year-month"
          title=""
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="handleConfirm"
          @cancel="show = false"
        />
      </Popup>
    </div>

    <div class="rounded-lg overflow-hidden shadow-sm shadow-light-50">
      <Cell v-for="item in salary" :key="item.id" :title="item.label" :value="item.value" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { Toast, Cell, DatetimePicker, Popup } from 'vant'
import { onBeforeUnmount, ref } from 'vue'

import { getSalaryByMonth } from '@/logic-v2/salary'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const { userDetail: userInfo, salary, viewState, currentMonth } = storeToRefs(appStore)

const show = ref(false)
const currentDate = ref(new Date())

const minDate = new Date(new Date().getFullYear() - 3, 0, 1)
const maxDate = new Date(new Date().setMonth(new Date().getMonth() - 1))

const handleConfirm = async () => {
  try {
    Toast.loading('加载中...')
    show.value = false

    const [_salary, _viewState] = await getSalaryByMonth(viewState.value!, currentDate.value.getTime())
    appStore.setSalary(_salary)
    appStore.setViewState(_viewState)
  } finally {
    Toast.clear(true)
  }
}

onBeforeUnmount(() => {
  appStore.setSalary([])
})
</script>

<style lang="scss" scoped>
::v-deep(.month-cell) {
  .van-cell__title {
    @apply text-[#FAFBFF];
    text-align: left !important;
  }

  .van-cell__value {
    @apply text-[#FAFBFF];
  }

  .van-cell__right-icon {
    @apply text-[#FAFBFF];
  }
}
</style>
