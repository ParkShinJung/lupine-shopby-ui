import axios from 'axios'
// import { storeToRefs } from 'pinia'
// import { useUserStore } from '@/store/user'
import cookies from '@/utils/Cookies'
// import { getToken } from '@/utils/auth'
// import { refreshToken } from '@/utils/token'
// import cookie from '@/utils/cookie'
// import i18n from '@/lang'

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // api base_url
  timeout: 30000, // request timeout
})

// service.defaults.headers.common = {
//   'Accept': 'application/json, */*'
// }
// const allowMethods = ['get', 'post', 'put', 'delete']
// allowMethods.forEach(method => {
//   service.defaults.headers[method] = {
//     'Content-Type': 'application/json'
//   }
// })

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = cookies.get('User-Token')
    if (token) {
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = 'Bearer ' + token
      config.headers['user_id'] = cookies.get('userId')
    }

    return config
  },
  (error) => {
    console.log(error) // for debug
    Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const token = cookies.get('User-Token')
    if (token) {
      const expires_at = cookies.get('expires-at')
      const now = new Date().getTime()
      const remindTime = (expires_at - now) / (1000 * 60)
      if (remindTime < 5) {
        // refreshToken()
      }
    }
    return response
  },
  (error) => {
    console.log('error response', error.response)
    if (error.response && error.response.status === 401) {
      var errorMessage = '로그인 세션이 만료되었습니다. 로그아웃 처리 됩니다.'
      if (error.response.data.error) {
        if (error.response.data.error === 'invalid_token') {
          errorMessage =
            '로그인 토큰이 유효하지 않습니다. 다른 기기에서 로그인 했을 수 있습니다.'
        }
      }
      console.log(errorMessage)
    } else {
      if (
        error.response.status === 404 &&
        error.response.data.message === '사용자 정보가 없습니다.'
      ) {
        // store.dispatch('LogOut').then(() => {
        //   location.reload()
        // })
        // MessageBox('사용자 인증 토큰이 만료되었습니다. 다시 로그인 해주세요.', '로그인 토큰 만료', {
        //   confirmButtonText: i18n.t('common.message.YES'),
        //   type: 'warning'
        // }).then(() => {
        // }).catch(() => {
        // }).finally(() => {
        //   store.dispatch('LogOut').then(() => {
        //     location.reload()
        //   })
        // })
      } else {
        console.log('server error code : ', error.response.data.errorCode)
        const message = error.response.data.errorCode
          // error.response.data.errorCode &&
          // i18n.te('serverError.' + error.response.data.errorCode)
          //   ? i18n.t('serverError.' + error.response.data.errorCode)
          //   : error.response.data.message
        console.log(message)
        // Message({
        //   message: 'error : ' + message,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
      }
    }
    return Promise.reject(error)
  },
)

export default service
