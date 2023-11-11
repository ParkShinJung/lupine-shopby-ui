import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAppStore = defineStore('app', () => {

  const app = ref({
    reload: new Date()
  })

  const reload = computed(() => app.value.reload)

  const reloadInit = (reload: Date) => {
    app.value.reload = reload
  }

  return { reload, reloadInit }
})
