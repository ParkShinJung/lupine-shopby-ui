const GlobalMenu = {
  info: 'info',
  monitor: 'monitor',
  auto: 'auto',
} as const

type GlobalMenuType = (typeof GlobalMenu)[keyof typeof GlobalMenu]

export type { GlobalMenuType }

export { GlobalMenu }
