import { assert } from '@bryce-loskie/utils'

import { useAppStore } from '../store/modules/app'
import type { UserInfoType } from '../types/index'

import { getRawHtml, generatePassport, loginErrorInterceptor, getUserInfo, getSalaryInfo } from './utils'

import http from '@/utils/http'

export const loginv2 = async (userInfo: UserInfoType) => {
  const LOGIN_URI = '/HR/login.aspx'
  const html = await getRawHtml(LOGIN_URI)
  const [passport, applicationPath] = generatePassport(html, userInfo)
  // really login
  const res = await http.get<string>(`${applicationPath}/login.aspx`, {
    params: {
      ls: passport,
    },
  })
  const response = res.data

  const error = loginErrorInterceptor(response)

  assert(error === null, error!)

  const userDetail = await getUserInfo()
  const [salary, viewState] = await getSalaryInfo()

  const appStore = useAppStore()
  appStore.setUserDetail(userDetail)

  appStore.setSalary(salary)
  appStore.setViewState(viewState)
}
