import type { StatusType } from './StatusType'
import type { RadialScale } from '@/types/RadialScale'

type DeviceData = {
  deviceId: string
  mainCode: string
  deviceName: string
  value: number
  status: StatusType
  radialScale: RadialScale
}

type LotInfo = {
  lotId: string
  lotName: string
  deviceData: DeviceData[]
}

export type { DeviceData, LotInfo }
