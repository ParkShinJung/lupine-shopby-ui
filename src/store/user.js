import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import cookies from '@/utils/Cookies'

export const useUserStore = defineStore('user', () => {
  const user: Ref<UserInfo> = ref({
    token: '',
    name: '',
    roles: []
  })

  const userInfo = computed(() => user.value)

  const setToken = (token: string) => {
    user.value.token = token
  }

  const setUserInfo = (userInfo: UserInfo) => {
    user.value.name = userInfo.name
    user.value.roles = userInfo.roles
  }

  const logOut = (resolve: any) => {
    return new Promise((resolve, reject) => {
      cookies.remove('User-Token')
      cookies.remove('refresh-token')
      cookies.remove('user-id')
      cookies.remove('user-name')
      setUserInfo({
        token: '',
        name: '',
        roles: []
      })
    })
  }

  return { userInfo, setToken, setUserInfo, logOut }
})
