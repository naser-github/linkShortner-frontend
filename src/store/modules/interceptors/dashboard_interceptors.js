import axios from 'axios'
import router from '../../../router/index'
// import { notification } from 'ant-design-vue'

const apiClient = axios.create({
  // baseURL: '/api',
  baseURL: 'http://127.0.0.1:8000/api',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
})

// apiClient.interceptors.request.use(request => {
//   const accessToken = store.get('accessToken')
//   if (accessToken) {
//     request.headers.Authorization = `Bearer ${accessToken}`
//     request.headers.AccessToken = accessToken
//   }
//   return request
// })

apiClient.interceptors.request.use(request => {
    const accessToken = localStorage.token
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`
      request.headers.AccessToken = accessToken
    }
    return request
  })

// apiClient.interceptors.response.use(undefined, error => {
//   // Errors handling
//   const { response } = error
//   const { data } = response
//   if (data) {
//     notification.warning({
//       message: data,
//     })
//   }
// })

apiClient.interceptors.response.use(response => response, error => {
  // Errors handling
  const { response } = error
  const { data } = response
  if (data.code === 403) {
    router.push({ path: '*', redirect: '/', hidden: true })
  }
  return Promise.reject(error)
})

export default apiClient

