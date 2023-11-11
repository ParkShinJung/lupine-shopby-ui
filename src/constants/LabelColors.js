import type { StatusType } from '@/types/StatusType'
import { Status } from '@/types/StatusType'

interface LabelColor {
  name: StatusType
  color: string
}

const LabelColors: LabelColor[] = [
  {
    name: Status.serious,
    color: '#c20000',
  },
  {
    name: Status.warning,
    color: '#ff7a00',
  },
  {
    name: Status.normal,
    color: '#ffc700',
  },
] as const

export default LabelColors
