export interface RadialScaleRange {
  from: number
  to: number
  color: string
}

export default interface RadialScale {
  min: number
  max: number
  labels: {
    color: string
    visible: boolean
  }
  majorTicks: {
    color: string
    visible: boolean
  }
  rangeSize: number
  startAngle: number
  endAngle: number
  reverse: boolean
  majorUnit: number
  ranges: RadialScaleRange[]
}
