import { useCookies } from 'vue3-cookies'

const vCookies = useCookies()
export const cookieConfig = {
  expireTimes: '1d',
  path: './',
  domain: '',
  secure: true,
  sameSite: 'None'
}
const cookies: any = {
  get: vCookies.cookies.get,
  set: (key: string, val: string, expire?: string|number|Date) => vCookies.cookies.set(
    key,
    val,
    expire ? expire : cookieConfig.expireTimes,
    cookieConfig.path,
    cookieConfig.domain,
    cookieConfig.secure,
    cookieConfig.sameSite
  ),
  remove: vCookies.cookies.remove,
  isKey: vCookies.cookies.isKey,
  keys: vCookies.cookies.keys
}
export default cookies
