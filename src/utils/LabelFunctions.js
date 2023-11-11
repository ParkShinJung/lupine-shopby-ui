import type { DeviceData } from '@/types/Lot'

import type StatusType from '@/types/StatusType'
import type RadialScale from '@/types/RadialScale'
import type { RadialScaleRange } from '@/types/RadialScale'
import { Status } from '@/types/StatusType'

import referenceLimitValues from '@/constants/referenceLimitValues'
import LabelColors from '@/constants/LabelColors'
import initialRadialScale from '@/constants/initialRadialScale'

const convertRobotCodeToMainCode = (robotCode: string): string => {
  if (robotCode === 'WATER_TEMP_ROBOT') {
    return 'WATER_TEMP'
  } else if (robotCode === 'SALINITY_ROBOT') {
    return 'SALINITY'
  } else if (robotCode === 'DO_ROBOT') {
    return 'DO'
  } else if (robotCode === 'WATER_PH_ROBOT') {
    return 'WATER_PH'
  } else {
    throw new Error('Wrong robot code')
  }
}

const deviceDataToStatus = ({
  value,
  mainCode,
}: {
  value: number
  mainCode: string
}): StatusType => {
  for (const { name, max, min, startWarning, lastWarning } of referenceLimitValues) {
    if (mainCode === name) {
      if (min < value && value < max) {
        return Status.normal
      } else if (startWarning < value && value < lastWarning) {
        return Status.warning
      } else {
        return Status.serious
      }
    }
  }

  throw new Error(
    'Not handled case in ReferenceLimitValue name and code is not same \n' +
      'mainCode : ' +
      mainCode +
      '\nreference : ' +
      referenceLimitValues.map(({ name }) => name).toString(),
  )
}

const statusToLabelColor = (status: StatusType): string => {
  for (const labelColor of LabelColors) {
    if (labelColor.name === status) {
      return labelColor.color
    }
  }

  throw new Error('error in statusToLabelColor Func')
}

const deviceDataToRadialScale = ({ mainCode }: DeviceData): RadialScale => {
  const radialScale: RadialScale = { ...initialRadialScale }

  referenceLimitValues.forEach(
    ({ name, max, min, startWarning, lastWarning, startLimit, lastLimit }) => {
      if (mainCode === name) {
        radialScale.min = startLimit
        radialScale.max = lastLimit

        const ranges: RadialScaleRange[] = []

        const compareList: { from: number; to: number; status: StatusType }[] = [
          { from: startLimit, to: startWarning, status: Status.serious },
          { from: startWarning, to: min, status: Status.warning },
          { from: min, to: max, status: Status.normal },
          { from: max, to: lastWarning, status: Status.warning },
          { from: lastWarning, to: lastLimit, status: Status.serious },
        ]

        for (const { from, to, status } of compareList) {
          if (from < to) {
            ranges.push({
              from,
              to,
              color: statusToLabelColor(status),
            })
          }
        }

        radialScale.ranges = ranges
      }
    },
  )

  return radialScale
}

const sortDeviceData: (deviceDataList: DeviceData[]) => DeviceData[] = (
  deviceDataList: DeviceData[],
) => {
  const sortOrder = ['WATER_TEMP', 'SALINITY', 'DO', 'WATER_PH']

  const returnVal = [...deviceDataList].sort(
    (a, b) => sortOrder.indexOf(a.mainCode) - sortOrder.indexOf(b.mainCode),
  )

  return returnVal
}

export {
  deviceDataToStatus,
  sortDeviceData,
  deviceDataToRadialScale,
  statusToLabelColor,
  convertRobotCodeToMainCode,
}
