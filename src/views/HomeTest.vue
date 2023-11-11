<script setup lang="ts"></script>
<script lang="ts">
import cookies from '@/utils/Cookies'
cookies.set('token', 'token12321', 100000)
const token = cookies.get('token')
console.log('token', token)
console.log(import.meta.env.MODE)
console.log(import.meta.env.VITE_APP_TITLE)
console.log('BASE_URL', import.meta.env.BASE_URL)
console.log('VITE_API_URL', import.meta.env.VITE_API_URL)
console.log('VITE_AUTH_API_URL', import.meta.env.VITE_AUTH_API_URL)
console.log('VUE_APP_BASE_URL', import.meta.env.VITE_BASE_URL)
</script>

<template>
  <div>Home</div>
</template>
