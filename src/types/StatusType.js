export let StatusType;
const Status = {
  serious: 'serious',
  warning: 'warning',
  normal: 'normal',
} as const

type StatusType = (typeof Status)[keyof typeof Status]

export type { StatusType as default }

export { Status }
