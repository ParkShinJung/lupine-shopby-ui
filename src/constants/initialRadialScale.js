import type { RadialScale } from '@/types/RadialScale'

const initialRadialScale: RadialScale = {
  labels: {
    color: '#000000',
    visible: true,
  },
  majorTicks: {
    visible: true,
    color: '#008000',
  },
  rangeSize: 8,
  startAngle: 0,
  endAngle: 180,
  reverse: false,
  majorUnit: 10,
  min: 3,
  max: 9,
  ranges: [
    {
      from: 3,
      to: 5,
      color: '#ffc700',
    },
    {
      from: 5,
      to: 7,
      color: '#ff7a00',
    },
    {
      from: 7,
      to: 9,
      color: '#c20000',
    },
  ],
}

export default initialRadialScale
