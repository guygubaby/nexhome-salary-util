export interface UserDetailType {
  name: string
  code: string
  dep: string
}

export interface SalaryItemType {
  id: string | number
  label: string
  value: string
}

export interface UserInfoType {
  username: string
  password: string
  platform: string
}

export interface SecretInfoType {
  rsa_E: string
  rsa_M: string
  randSeed: string
  applicationPath: string
}
