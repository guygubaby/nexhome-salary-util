import { assert } from '@bryce-loskie/utils'

import type { SalaryItemType, SecretInfoType, UserDetailType, UserInfoType } from '@/types'
import { getContentFromHtmlStr, parseHtmlStr } from '@/utils/getContentFromHtmlStr'
import http from '@/utils/http'

const getSecretInfo = (html: string): SecretInfoType => {
  let str: string = html.split('doLogin').pop()!
  assert(!!str, 'load raw html failed')

  const lastIndex = str.lastIndexOf('");')
  str = str.slice(1, lastIndex).replace(/"*/g, '')
  const arr = str.split(',').map((s) => s.trim())
  assert(arr.length === 4, 'get secret info failed')

  const [rsa_E, rsa_M, randSeed, applicationPath] = arr
  return {
    rsa_E,
    rsa_M,
    randSeed,
    applicationPath,
  }
}

export const getRawHtml = async (url: string) => {
  const raw = await http.get<string>(url, { responseType: 'text' })
  return raw.data
}

export const generatePassport = (html: string, userInfo: UserInfoType): [string, string] => {
  const { rsa_E, rsa_M, randSeed, applicationPath } = getSecretInfo(html)
  window.setMaxDigits(131)
  const { username, password, platform } = userInfo
  const key = new RSAKeyPair(rsa_E, '', rsa_M)
  const base64 = new Base64()
  const s = [username, password, randSeed, platform].map((item) => base64.encode(item)).join('/')
  const passport = window.encryptedString(key, s)
  return [passport, applicationPath]
}

export const loginErrorInterceptor = (loginres: string): Nullable<string> => {
  let errorMsg: Nullable<string> = null
  if (loginres.includes('#lblErrMsg')) {
    const reg = /'\W+'/g
    const matches = loginres.match(reg)
    const error = (matches?.[0] || '').replace(/'/g, '')
    errorMsg = error
  }
  return errorMsg
}

export const getUserInfo = async (): Promise<UserDetailType> => {
  const html = await getRawHtml('/HR/TopBar/TopDefaultEss.aspx')
  const useInfoStr = getContentFromHtmlStr(html, 'td.title_normal')
  const [name, code, dep] = (useInfoStr || '').split('|')
  return {
    name,
    code,
    dep,
  }
}

export const parseSalaryHtml = (html: string): [SalaryItemType[], string] => {
  const doc = parseHtmlStr(html)

  // @ts-expect-error
  const viewState = doc.querySelector('input#__VIEWSTATE')?.value || ''

  const head = doc.querySelector('tr.gridtou')!
  const keys = Array.from(head.querySelectorAll('td')).map((td) => td.textContent || '')
  const realPayInfo = doc.querySelector('tr.gridItem')!

  const item = realPayInfo || doc.querySelector('tr.gridfooter')!
  const values = Array.from(item.querySelectorAll('td')).map((td) => td.textContent || '')

  const salary = keys.reduce((acc, cur, index) => {
    acc.push({
      id: index,
      label: cur,
      value: values[index],
    })
    return acc
  }, [] as SalaryItemType[])

  return [salary, viewState]
}

export const getSalaryInfo = async () => {
  const html = await getRawHtml('/HR/Ess/MyPay.aspx')
  return parseSalaryHtml(html)
}
