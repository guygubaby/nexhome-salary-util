import axios, { AxiosError } from 'axios'

const timeout = 10 * 1000 // 请求超时时间
const BASE_HEADERS = {}

const baseURL = process.env.NODE_ENV === 'production' ? '/api' : '/api'

const instance = axios.create({
  baseURL,
  timeout,
})

instance.defaults.headers = { ...BASE_HEADERS }

const errorHandler = (error: AxiosError) => {
  const status = error.response?.status
  switch (status) {
    case 400:
      error.message = '请求错误'
      break
    case 401:
      error.message = '未授权，请登录'
      break
    case 403:
      error.message = '拒绝访问'
      break
    case 404:
      error.message = `请求地址出错: ${error.response?.config.url}`
      break
    case 408:
      error.message = '请求超时'
      break
    case 500:
      error.message = '服务器内部错误'
      break
    case 501:
      error.message = '服务未实现'
      break
    case 502:
      error.message = '网关错误'
      break
    case 503:
      error.message = '服务不可用'
      break
    case 504:
      error.message = '网关超时'
      break
    case 505:
      error.message = 'HTTP版本不受支持'
      break
    default:
      break
  }
  return Promise.reject(error)
}

instance.interceptors.request.use((config) => {
  // you can set extra header here
  // config.headers.foo = sessionStorage.get('foo') ?? null

  return config
}, errorHandler)

instance.interceptors.response.use((response) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: dataAxios, status } = response
  // eslint-disable-next-line eqeqeq
  // if (status === 200 && dataAxios.code == 0)
  if (status === 200) return response
  else return Promise.reject(response)
}, errorHandler)

export default instance
