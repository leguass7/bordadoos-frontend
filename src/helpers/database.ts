import { Decimal } from '@prisma/client/runtime'
import { format } from 'date-fns'

export function serializedDto<T>(_d: T): T
export function serializedDto<T>(_d: T[]): T[]
export function serializedDto<T = unknown>(_d: any): any {
  if (Array.isArray(_d)) {
    return _d.map(i => serializedDto(i)) as T[]
  }

  return Object.keys(_d).reduce((acc, key) => {
    const prop = _d[key]
    if (prop instanceof Decimal) {
      acc[key] = Number(prop)
    } else if (prop instanceof Date) {
      acc[key] = format(prop, 'yyyy-MM-dd HH:mm:ss')
    } else {
      acc[key] = prop
    }
    return acc
  }, {}) as T
}
