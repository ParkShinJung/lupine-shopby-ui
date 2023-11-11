<template>
  <div>
    <div class="custom-toolbar">
      <kbutton :icon="'menu'" :fill-mode="'flat'" @click="handleClick" />
      <span class="title">Navigational drawer</span>
    </div>
    <Drawer
      :expanded="expanded"
      :position="'start'"
      :mode="expandMode"
      :animation="{
        duration: 400,
      }"
      :items="
        items.map((item, index) => ({
          ...item,
          selected: index === selectedId,
        }))
      "
      @overlayclick="handleClick"
      @select="handleSelect"
    >
      <DrawerContent>
        <div class="k-form">
          <div class="k-form-field">
            <kbutton @click="handleClick">
              Toggle the Drawer state
            </kbutton>
          </div>
          <div class="k-form-field">
            <p>
              Current drawer mode is <b>{{ expandMode }}</b>
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  </div>
</template>

<script>
import { Drawer, DrawerContent } from '@progress/kendo-vue-layout'
import { Checkbox } from '@progress/kendo-vue-inputs'
import { Button } from '@progress/kendo-vue-buttons'

export default {
  name: 'AppSidebar',
  setup() {
    return {}
  },
  components: {
    Drawer,
    DrawerContent,
    Checkbox,
    'kbutton': Button
  },
  computed: {
    expandMode() {
      return this.mode ? 'overlay' : 'push'
    },
  },
  data() {
    return {
      items: [
        {
          text: 'Inbox',
          icon: 'inbox',
          selected: true,
        },
        {
          separator: true,
        },
        {
          text: 'Notifications',
          icon: 'bell',
        },
        {
          text: 'Calendar',
          icon: 'calendar',
        },
        {
          separator: true,
        },
        {
          text: 'Attachments',
          icon: 'hyperlink-email',
        },
        {
          text: 'Favourites',
          icon: 'star-outline',
        },
      ],
      expanded: true,
      selectedId: null,
      mode: true,
    }
  },
  methods: {
    handleClick() {
      this.expanded = !this.expanded
    },
    handleChange() {
      this.mode = !this.mode
    },
    handleSelect(ev) {
      this.selectedId = ev.itemIndex
      this.expanded = false
    },
  }
}
</script>
