import { parseHtmlStr } from '../utils/getContentFromHtmlStr'

import http from '@/utils/http'

export interface Item {
  id: string | number
  label: string
  value: string
}

const getHtmlString = async (): Promise<string> => {
  const url = '/HR/Ess/MyPay.aspx'
  const res = await http.get(url, {
    responseType: 'text',
  })
  const html = res.data
  return html
}

export interface SalaryPayload {
  txtstartym: string
  txtendym: string
  btnSelectX: string
  btnSelectY: string
}

const getHtmlStringWithPayload = async (payload: SalaryPayload): Promise<string> => {
  const { txtstartym, txtendym, btnSelectX, btnSelectY } = payload
  const url = '/HR/Ess/MyPay.aspx'

  const __VIEWSTATE = sessionStorage.getItem('__VIEWSTATE') || ''

  const formData = new FormData()

  formData.append('txtstartym', txtstartym)
  formData.append('txtendym', txtendym)
  formData.append('btnSelect.x', btnSelectX)
  formData.append('btnSelect.y', btnSelectY)
  formData.append('__VIEWSTATE', __VIEWSTATE)

  const res = await http.post(url, formData)

  const html = res.data
  return html
}

const parseSalaryHtml = (html: string): Item[] => {
  const doc = parseHtmlStr(html)

  const head = doc.querySelector('tr.gridtou')!
  const keys = Array.from(head.querySelectorAll('td')).map((td) => td.textContent || '')
  const item = doc.querySelector('tr.gridItem')!
  const values = Array.from(item.querySelectorAll('td')).map((td) => td.textContent || '')

  return keys.reduce((acc, cur, index) => {
    acc.push({
      id: index,
      label: cur,
      value: values[index],
    })
    return acc
  }, [] as Item[])
}

export const getSalaryInfo = async (payload?: SalaryPayload): Promise<Item[]> => {
  const action = payload ? getHtmlStringWithPayload : getHtmlString

  const html = await action(payload!)

  return parseSalaryHtml(html)
}
