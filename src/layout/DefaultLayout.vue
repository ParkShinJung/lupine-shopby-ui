<template>
  <AppHeader />
  <RouterView />
</template>
<script>
import { Drawer, DrawerContent } from '@progress/kendo-vue-layout'
import { Button } from '@progress/kendo-vue-buttons'
import { BottomNavigation } from '@progress/kendo-vue-layout'
import AppHeader from '@/components/AppHeader.vue'
export default {
  name: 'DefaultLayout',
  components: { AppHeader, Drawer, DrawerContent, KButton: Button, BottomNavigation },
  mounted() {
    // this.$router.push(this.items[0].data)
  },
  data() {
    return {
      title: import.meta.env.VITE_APP_TITLE,
      // sideMenu config
      items: [
        {
          text: 'Home',
          selected: true,
          data: {
            path: '/',
          },
        },
        {
          text: 'Home',
          data: {
            path: '/home',
          },
        },
        {
          text: 'About',
          data: {
            path: '/about',
          },
        },
      ],
      expanded: false,
      selectedId: 0,
      position: 'start',
      expendMode: 'overlay',
      // footer config
      footerItems: [
        {
          text: 'Inbox',
          id: 1,
          icon: 'email',
          data: {
            path: '/',
          },
          selected: true,
        },
        {
          text: 'Calendar',
          id: 2,
          icon: 'calendar',
          data: {
            path: '/home',
          },
        },
        {
          text: 'Profile',
          id: 3,
          icon: 'user',
          data: {
            path: '/about',
          },
        },
      ],
      footerSelected: 0,
    }
  },
  computed: {
    computedItems() {
      return this.footerItems.map((item, index) => ({
        ...item,
        selected: index === this.footerSelected,
      }))
    },
  },
  methods: {
    onSelect(e) {
      this.selectedId = e.itemIndex
      this.$router.push(this.items[e.itemIndex].data)
      this.expanded = false
    },
    handleClick() {
      this.expanded = !this.expanded
    },
    handleChange() {
      this.expendMode = !this.expendMode
    },
    onFootSelect(e) {
      this.footerSelected = e.itemIndex
      this.$router.push(e.itemTarget.data.path)
    },
  },
}
</script>
