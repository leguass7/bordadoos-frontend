import { isDefined } from './variables'

export function isObject(item?: any) {
  return item && typeof item === 'object' && !Array.isArray(item) && !(item instanceof Date)
}

export function removeInvalidValues<T = any>(obj: Record<string, any>): T {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    // console.log(key, value)
    if (isDefined(value)) {
      if (typeof value === 'number' && isNaN(value)) return acc
      if (value === '') return acc
      acc[key] = value
    }
    return acc
  }, {} as T)
}

/**
 * Deep merge two objects.
 */
export function mergeDeep<T = any>(target: Partial<T>, ...sources: Partial<T>[]): T {
  if (!sources.length) return target as T
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}
