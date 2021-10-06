import { defineStore } from 'pinia'

import type { SalaryItemType, UserDetailType } from '../../types/index'

interface AppState {
  userDetail: Nullable<UserDetailType>

  viewState: Nullable<string>
  salary: SalaryItemType[]
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    userDetail: null,
    viewState: null,
    salary: [],
  }),
  actions: {
    setUserDetail(userDetail: Nullable<UserDetailType>) {
      this.userDetail = userDetail
    },
    setViewState(viewState: Nullable<string>) {
      this.viewState = viewState
    },
    setSalary(salaryInfoList: SalaryItemType[]) {
      this.salary = salaryInfoList
    },
  },
  getters: {
    currentMonth(state) {
      return state.salary.find((item) => item.label.includes('月份'))?.value ?? ''
    },
  },
})
