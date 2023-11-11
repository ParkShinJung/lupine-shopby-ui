<template>
  <div class="content-container">
    <div v-if="responseData" class="dashboard-item-container k-card-deck">
      <card
        v-for="(lot, index) in responseData.lotData"
        :key="lot.lotId"
        class="dashboard-item"
        @click="viewLotDetail(lot.lotId, lot.deviceData)"
      >
        <cardHeader class="k-hbox card-header">
          <cardTitle>{{ lot.lotName }}</cardTitle>
        </cardHeader>
        <cardBody class="card-body">
          <ul>
            <li v-for="(data, index) in lot.deviceData" :key="data.deviceId">
              <div>{{ data.deviceName }}</div>
              <div v-if="data.value !== null">
                <span class="sensor-value">{{ data.value }}</span>
                <KButton
                  v-if="data.value !== null && data.status === 'serious'"
                  :theme-color="'error'"
                  :size="'small'"
                  :style="{ width: '40px', height: '22px' }"
                >
                  심각
                </KButton>
                <KButton
                  v-if="data.value !== null && data.status === 'warning'"
                  :theme-color="'warning'"
                  :size="'small'"
                  :style="{ width: '40px', height: '22px' }"
                >
                  주의
                </KButton>
                <KButton
                  v-if="data.value !== null && data.status === 'normal'"
                  :theme-color="'primary'"
                  :size="'small'"
                  :style="{ width: '40px', height: '22px' }"
                >
                  정상
                </KButton>
              </div>
              <div v-else>
                <span class="sensor-value">미수신</span>
              </div>
            </li>
          </ul>
        </cardBody>
      </card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardActions, CardBody, CardTitle, CardHeader } from '@progress/kendo-vue-layout'
import { Button as KButton } from '@progress/kendo-vue-buttons'
</script>

<script lang="ts">
import { defineComponent, ref } from 'vue'

// import ReferenceLimitValue from '@/types/ReferenceLimitValue'
import referenceLimitValues from '@/constants/referenceLimitValues'

import type { StatusType } from '@/types/StatusType'
import { Status } from '@/types/StatusType'

import { deviceDataToStatus, sortDeviceData } from '@/utils/LabelFunctions'
import cookies from "@/utils/Cookies";

type DeviceData = {
  deviceId: string
  mainCode: string
  deviceName: string
  value: number
  status: StatusType
}

type LotInfo = {
  lotId: string
  lotName: string
  deviceData: DeviceData[]
}

type DataResponse = {
  currentTime: string
  lotData: LotInfo[]
}

export default defineComponent({
  data() {
    return {
      responseData: {
        currentTime: '',
        lotData: [],
      },
      farmId: cookies.get("farmId"),
      referenceValues: referenceLimitValues as ReferenceLimitValue[],
    }
  },
  mounted() {
    this.fetchData()

    const intervalTime = 5 * 60 * 1000

    // initMap을 처음 실행하고, 5분마다 반복 실행
    setInterval(this.fetchData, intervalTime)

    const self = this; // this를 현재 컨텍스트의 Vue 인스턴스에 바인딩
    document.addEventListener("changeFarmId", function(event) {
      self.fetchData()
    });
  },
  methods: {
    async fetchData() {
      this.farmId = cookies.get("farmId")
      try {
        const response = await fetch('http://api-farm.echoss.com/dashboard/' + this.farmId)
        const data: DataResponse = await response.json()

        for (let lot of data.lotData) {
          for (let device of lot.deviceData) {
            device.value = Math.round(device.value * 100) / 100
          }
        }

        this.responseData = data

        this.responseData.lotData.forEach((data) => {
          if (Array.isArray(data.deviceData)) {
            data.deviceData.forEach((value) => {
              value.status = deviceDataToStatus(value)
            })

            data.deviceData = sortDeviceData([...data.deviceData])
          }
        })
      } catch (e: Error) {
        console.error(e)
      }
    },
    viewLotDetail(lotId, deviceData) {
      this.$router.push({
        path: `/farm/lot/sensors/${lotId}`,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.content-container {
  height: 100vh;
  background-color: #edf2f9;
  padding: 45px 0px;
}

.dashboard-item-container {
  //border: 1px solid #282828;
  display: flex;
  //justify-content: space-between;
  overflow: hidden;
  overflow-x: scroll;
  padding: 0px 40px;
  .dashboard-item {
    width: 30%;
    border: 1px solid #c8cbd5;
    border-radius: 20px;
  }
}

.card-header {
  height: 80px;
  background-color: #ffffff;
  padding: 20px;
  .k-card-title {
    font-size: 20px;
    font-weight: bold;
    color: #000000;
  }
}

.k-card-body {
  background-color: #f9fafd;
  ul {
    li {
      display: flex;
      color: #4d5969;
      font-size: 18px;
      flex-wrap: nowrap;
      justify-content: space-between;
      div {
        .sensor-value {
          color: #000000;
          font-size: 20px;
          font-weight: bold;
          margin-right: 5px;
        }

        .k-button {
          font-size: 14px;
          margin-top: -5px;
        }
      }
    }
  }
}
</style>
