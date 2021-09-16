import { getContentFromHtmlStr } from '@/utils/getContentFromHtmlStr'
import http from '@/utils/http'

export interface LoginedUser {
  name: string
  code: string
  dep: string
}

export const getUserInfo = async (): Promise<LoginedUser> => {
  const res = await http.get('/HR/TopBar/TopDefaultEss.aspx', { responseType: 'text' })
  const html = res.data
  const useInfoStr = getContentFromHtmlStr(html, 'td.title_normal')
  const [name, code, dep] = (useInfoStr || '').split('|')
  return {
    name,
    code,
    dep,
  }
}
