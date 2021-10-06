import { parseSalaryHtml } from './utils'

import http from '@/utils/http'

const getStartEndPayload = (timestamp: number): [string, string] => {
  const time = new Date(timestamp)
  const [year, month] = [time.getFullYear(), time.getMonth()]
  return [`${year}${String(month + 1).padStart(2, '0')}`, `${year}${String(month + 1).padStart(2, '0')}`]
}

const getHtmlString = async (__VIEWSTATE: string, timestamp: number): Promise<string> => {
  const url = '/HR/Ess/MyPay.aspx'

  const [start, end] = getStartEndPayload(timestamp)

  const formData = new FormData()
  formData.append('__VIEWSTATE', __VIEWSTATE)
  formData.append('txtstartym', start)
  formData.append('txtendym', end)
  formData.append('btnSelect.x', '34')
  formData.append('btnSelect.y', '13')

  const res = await http.post(url, formData)
  const html = res.data
  return html
}

export const getSalaryByMonth = async (__VIEWSTATE: string, timestamp: number = Date.now()) => {
  const html = await getHtmlString(__VIEWSTATE, timestamp)
  return parseSalaryHtml(html)
}
