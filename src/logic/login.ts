import { assert } from '@bryce-loskie/utils'

import { getSalaryInfo } from './salary-info'
import { getUserInfo } from './user-info'

import http from '@/utils/http'

export interface UserInfo {
  username: string
  password: string
  platform: string
}

export const login = async (user: UserInfo) => {
  try {
    const html = await getRawHtml()

    const { rsa_E, rsa_M, randSeed, applicationPath } = getSecretInfo(html)

    window.setMaxDigits(131)

    const { username, password, platform } = user

    const key = new RSAKeyPair(rsa_E, '', rsa_M)
    const base64 = new Base64()

    const s = [username, password, randSeed, platform].map((item) => base64.encode(item)).join('/')

    const passport = window.encryptedString(key, s)

    const res = await http.get<string>(`${applicationPath}/login.aspx`, {
      params: {
        ls: passport,
      },
    })

    const response = res.data

    if (response.includes('#lblErrMsg')) {
      const reg = /'\W+'/g
      const matches = response.match(reg)
      const error = (matches?.[0] || '').replace(/'/g, '')
      throw new Error(error)
    } else {
      const [userInfo, salary] = await Promise.all([getUserInfo(), getSalaryInfo()])

      return {
        userInfo,
        salary,
      }
    }
  } catch (error) {
    // @ts-expect-error
    throw new Error(error.message)
  }
}

const getRawHtml = async () => {
  const raw = await http.get<string>('/HR/login.aspx', { responseType: 'text' })
  return raw.data
}

interface SecretInfo {
  rsa_E: string
  rsa_M: string
  randSeed: string
  applicationPath: string
}

const getSecretInfo = (html: string): SecretInfo => {
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
