import { sleep } from '@bryce-loskie/utils'
import { Toast } from 'vant'

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

const parseSalaryHtml = (html: string): Item[] => {
  const doc = parseHtmlStr(html)

  const head = doc.querySelector('tr.gridtou')!
  const keys = Array.from(head.querySelectorAll('td')).map((td) => td.textContent || '')
  const realPayInfo = doc.querySelector('tr.gridItem')!
  if (!realPayInfo) {
    sleep(1.6 * 1000, () => {
      Toast.fail('当月明细还未统计，请10号以后进行查询 ~')
    })
  }
  const item = realPayInfo || doc.querySelector('tr.gridfooter')!
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

export const getSalaryInfo = async (): Promise<Item[]> => {
  const html = await getHtmlString()

  return parseSalaryHtml(html)
}
