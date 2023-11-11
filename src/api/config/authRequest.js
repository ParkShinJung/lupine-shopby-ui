import axios from 'axios'

const service = axios.create({
  // 서버 도메인 설정
  baseURL: process.env.VUE_APP_AUTH_BASE_API,
  // 요청 타임아웃 시간 설정
  timeout: 5000,
})

// HTTP 요청 인터셉터
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// HTTP 응답 인터셉터
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log('stauts', error.response)
    console.log('AuthRepsonseError :', error.toString())
    if (error.toString().indexOf('timeout') > 0) {
      console.log('Auth Server Timeout')
      // Message({
      //   message: '인증서버 응답시간이 초과되었습니다.',
      //   type: 'error',
      //   duration: 3 * 1000
      // })
    } else {
      let message = error.response.data.message
      if (error.response.data.error_description) {
        message = error.response.data.error_description
      }
      console.log(message)
      // Message({
      //   message: 'request: ' + message,
      //   type: 'error',
      //   duration: 3 * 1000
      // })
    }

    return Promise.reject(error)
  },
)

export default service
