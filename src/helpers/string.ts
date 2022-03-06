import { format, isValid, parseISO } from 'date-fns'

export function querystring(_str?: Record<string, any>): string
export function querystring(_str?: string): Record<string, string>
export function querystring(_str?: any): any {
  if (typeof _str === 'string') {
    const keys = `${_str}`.split('&') // ['key=value']
    const obj = keys.reduce((acc: Record<string, string>, keyValue) => {
      const [k, v] = `${keyValue}`.split('=') // [key, value]
      if (k) {
        acc[k] = v || ''
      }
      return acc
    }, {})
    return obj
  } else if (typeof _str === 'object') {
    return Object.keys(_str)
      .map(k => {
        return `${k}=${_str[k]}`
      })
      .join('&')
  }
}

/**
 * @function toMask
 * @example
 * toMask('XXX-XXXX', ABC1234) // ABC-1234
 */
export function toMask(mask: string, value: string | number): string {
  if (!value) return ''
  const s = `${value}`
  let r = ''
  for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
    r += mask.charAt(im) === 'X' ? s.charAt(is++) : mask.charAt(im)
  }
  return r
}

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.toLocaleLowerCase().slice(1)
}

export function normalizeUrl(path?: string): string {
  const [base = '', query = ''] = `${path}`.split('?')
  const params: any = querystring(query)

  const q = querystring(params)
  const result = [base.replace(/^(.*)\/$/, '$1'), Object.keys(q).length && q].filter(f => !!f)
  return result.length > 1 ? result.join('?') : result[0]
}

export function toMoney(number: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number)
}

export function validDate(date?: Date | string | number) {
  if (date instanceof Date) return date
  if (typeof date === 'string') {
    const d = parseISO(date)
    return isValid(d) ? d : undefined
  }
  return undefined
}

export function formatDate(date: Date | string | number, formatString: string) {
  const valid = validDate(date)
  if (valid) return format(valid, formatString)
  return ''
}
