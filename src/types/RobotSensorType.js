const RobotSensor = {
  do: 'DO_ROBOT',
  salinity: 'SALINITY_ROBOT',
  temp: 'WATER_TEMP_ROBOT',
  ph: 'WATER_PH_ROBOT',
} as const

type RobotSensorType = (typeof RobotSensor)[keyof typeof RobotSensor]

export type { RobotSensorType as default }

export { RobotSensor }
