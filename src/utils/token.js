/*
import authRequest from '@/api/config/authRequest'
import cookies from '@/utils/Cookies'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const { userInfo } = storeToRefs(useUserStore())

const store = useUserStore()
const authorizationString =
  process.env.VUE_APP_CLIENT_ID + ':' + process.env.VUE_APP_CLIENT_SECRET

export function refreshToken() {
  // refresh token 이 없으면 refresh token을 요청하지 않는다.
  const refreshToken = cookies.get('refresh-token')
  if (!refreshToken) {
    return false
  }
  const url = '/oauth/token'
  const config = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Basic ' + btoa(authorizationString),
    },
  }
  const formData = new FormData()
  formData.append('grant_type', 'refresh_token')
  formData.append('refresh_token', refreshToken)
  formData.append('scope', 'read')

  authRequest
    .post(url, formData, config)
    .then((response) => {
      // 토큰 만료 시간
      const now = new Date().getTime()
      // const expiresDateVal = 60 * process.env.EXPIRE_MIN
      const expiresDateVal = response.expires_in
      const expiresDate = expiresDateVal / 86400
      const expiresAt = now + expiresDateVal * 1000

      cookie.setCookie('User-Token', response.access_token, expiresDate)
      cookie.setCookie('refresh-token', response.refresh_token, expiresDate)
      cookie.setCookie('expires-at', expiresAt, expiresDate)
      // console.log('Token Refresh Success')
    })
    .catch((error) => {
      console.log('Token Refresh Fail', error)
    })
}

export function refreshTokenTimer() {
  const now = new Date()
  const expirationDate = cookies.get('expirationDate')
  let validity = expirationDate - now
  if (validity > 60 * 1000) validity -= 5 * 60 * 1000
  // setTimeout(() => refreshToken(), validity)
}
*/
