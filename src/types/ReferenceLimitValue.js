interface ReferenceValue {
  name: string
  min: number
  max: number
  startWarning: number
  lastWarning: number

  // for radial graph
  avg: number //
  deviation: number
}

interface Limit {
  startLimit: number
  lastLimit: number
}

export default interface ReferenceLimitValue extends ReferenceValue, Limit {}
