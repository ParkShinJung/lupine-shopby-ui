<template>
  <div class="header-container">
    <div class="left">
      <span
        class="k-icon k-font-icon k-i-arrow-chevron-left back-button"
        @click="() => $router.back(-1)"
      />
      <drop-down-list
        v-model="selectedFarm"
        :style="{ width: '200px', height: '40px' }"
        :data-items="farms"
        :data-item-key="'CategoryID'"
        :text-field="'CategoryName'"
        @change="setFarmCookie"
      />
    </div>
    <div class="gnb-div">
      <div
        :class="activeMenu === GlobalMenu.info ? 'active' : ''"
        @click="() => onClickMenu({ clickedMenu: GlobalMenu.info })"
      >
        상세정보
      </div>
      <div
        :class="activeMenu === GlobalMenu.monitor ? 'active' : ''"
        @click="() => onClickMenu({ clickedMenu: GlobalMenu.monitor })"
      >
        모니터링
      </div>
      <div
        :class="activeMenu === GlobalMenu.auto ? 'active' : ''"
        @click="() => onClickMenu({ clickedMenu: GlobalMenu.auto })"
      >
        자율주행
      </div>
    </div>
    <div class="right-item">
      <router-link :to="'/'">
        <span class="k-icon k-font-icon k-i-home home-button" />
      </router-link>
      <span class="user-name"> 홍길동 </span>
      |
      <KButton
        :theme-color="'primary'"
        :fill-mode="'flat'"
        :style="{ height: '40px', marginLeft: '8px' }"
        @click="logout"
      >
        로그아웃
      </KButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { DropDownList } from '@progress/kendo-vue-dropdowns'
import { Button as KButton } from '@progress/kendo-vue-buttons'

import type { GlobalMenuType } from '@/types/GlobalMenuType'
import { GlobalMenu } from '@/types/GlobalMenuType'

import cookies from '@/utils/Cookies'

import { cookieConfig } from '@/utils/Cookies'

const router = useRouter()
const route = useRoute()

interface Farm {
  CategoryID: string
  CategoryName: string
}

interface MenuPath {
  menu: GlobalMenuType
  paths: string[]
}

const menuPaths: MenuPath[] = [
  {
    menu: GlobalMenu.monitor,
    paths: ['/dashboard'],
  },
  {
    menu: GlobalMenu.info,
    paths: ['/farm/info', '/farm/lot/devices', '/farm/lot/diary', 'farm/lot/sensors/info'],
  },
  {
    menu: GlobalMenu.auto,
    paths: ['/farm/lot/autonomous'],
  },
]

const initialFarms: Farm[] = [
  { CategoryID: 'F00000000078', CategoryName: '영창 수산' },
  { CategoryID: 'F00000000085', CategoryName: '킹바다 수산' },
  { CategoryID: 'F00000000086', CategoryName: '참살이 수산' },
]

const onClickMenu = ({ clickedMenu }: { clickedMenu: GlobalMenuType }) => {
  activeMenu.value = clickedMenu

  const links: { menu: GlobalMenuType; path: string }[] = [
    { menu: GlobalMenu.info, path: '/farm/info' },
    { menu: GlobalMenu.monitor, path: '/dashboard' },
    { menu: GlobalMenu.auto, path: '/farm/lot/autonomous' },
  ]

  for (const { menu, path } of links) {
    if (clickedMenu === menu) {
      router.push(path)
      return
    }
  }

  console.error('no paths in on click menu of app header')
}

const farms = ref<Farm[]>(initialFarms)

const selectedFarm = ref({ CategoryID: 'F00000000078', CategoryName: '영창 수산' })
const activeMenu = ref<GlobalMenuType>(GlobalMenu.monitor)
onClickMenu({ clickedMenu: activeMenu.value })

watch(
  () => route.fullPath,
  () => {
    const fullPath = route.fullPath

    for (const { menu, paths } of menuPaths) {
      for (const path of paths) {
        if (path === fullPath || fullPath.includes(path)) {
          activeMenu.value = menu
          return
        }
      }
    }

    console.error(fullPath)
    console.error('Not matched path in App Header')
  },
)

onMounted(() => {
  if (!cookies.get('farmId')) {
    deleteCookie('farmId')
    cookies.set('farmId', selectedFarm.value.CategoryID)
  } else {
    const foundFarm = farms.value.find((farm) => farm.CategoryID === cookies.get('farmId'))
    if (foundFarm) {
      selectedFarm.value = foundFarm
    }
  }
})

const logout = () => {
  router.push({
    path: '/login',
  })
}

const deleteCookie = (name) => {
  const domain = cookieConfig.domain ? `; domain=${cookieConfig.domain}` : ''
  const path = `; path=${cookieConfig.path}`
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${domain}${path}`
}

const setFarmCookie = () => {
  console.log('선택한 농장', selectedFarm.value)
  // domain 값이 빈 문자열인지 체크하고, 그렇지 않을 경우에만 전달
  deleteCookie('farmId')
  cookies.set('farmId', selectedFarm.value.CategoryID, 100000)

  document.dispatchEvent(new Event('changeFarmId', { bubbles: true }))
}
</script>

<style lang="scss" scoped>
.header-container {
  height: 40px;
  padding: 10px;
  //border-bottom: 1px solid #2c3e50;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  .left {
    display: flex;
    flex-direction: row;
    margin: auto auto auto 0;
  }

  div {
    //flex-grow: 1;
    width: 33%;
    font-size: 14px;
    .user-name {
      margin-right: 16px;
    }
    .back-button {
      font-size: 35px;
      margin-right: 10px;
      margin-left: -5px;
    }
  }
  .gnb-div {
    display: flex;
    div {
      flex-grow: 1;
      height: 48px;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
    }
    div.active {
      border-bottom: 3px solid #3888f5;
    }
  }
  .right-item {
    font-size: 16px;
    text-align: end;
    .home-button {
      font-size: 20px;
      margin-right: 10px;
    }
  }
}
</style>
