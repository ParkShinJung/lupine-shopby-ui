import router from '@/router/index'
import cookies from '@/utils/Cookies'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import { isEmpty } from '@/utils/Functions'

const { userInfo } = storeToRefs(useUserStore())
const whiteList: string[] = [
  '/login',
  '/logout'
]

router.beforeEach((to, from, next) => {
  const token = cookies.get('User-Token')
  if (whiteList.indexOf(to.path)) {
    next()
  }

  if (!isEmpty(token)) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      if (userInfo.value.roles.length < 1) {
        // token 권한 재설정 필요
      } else {
        next()
      }
    }
  }
})

router.afterEach((to, from) => {

})
