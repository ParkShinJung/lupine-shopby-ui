import type { ReferenceLimitValue } from '@/types/ReferenceLimitValue'

const referenceLimitValues: ReferenceLimitValue[] = [
  {
    name: 'WATER_TEMP',
    min: 16,
    max: 34,
    avg: 23.5,
    deviation: 0,
    startWarning: 15,
    lastWarning: 36,
    startLimit: 0,
    lastLimit: 40,
  },
  {
    name: 'SALINITY',
    min: 2,
    max: 34,
    avg: 27.5,
    deviation: 5,
    startWarning: 1,
    lastWarning: 40,
    startLimit: 0,
    lastLimit: 50,
  },
  {
    name: 'DO',
    min: 6,
    max: 20,
    avg: 10,
    deviation: 2,
    startWarning: 4,
    lastWarning: 20,
    startLimit: 0,
    lastLimit: 20,
    // max and last warning is same as last limit
  },
  {
    name: 'WATER_PH',
    min: 6.5,
    max: 8.5,
    avg: 7.5,
    deviation: 0.5,
    startWarning: 5,
    lastWarning: 9,
    startLimit: 0,
    lastLimit: 10,
  },
]

export default referenceLimitValues
