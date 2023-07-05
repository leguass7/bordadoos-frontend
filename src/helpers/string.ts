import { cpf, cnpj } from 'cpf-cnpj-validator'
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
  if (isValid(date) && date instanceof Date) return date
  if (typeof date === 'string') {
    const d = parseISO(date)
    return isValid(d) ? d : null
  }
  return null
}

export function formatDate(date: Date | string | number, formatString: string) {
  const valid = validDate(date)
  if (valid) return format(valid, formatString)
  return null
}

export function stringAvatar(name?: string) {
  const [n = '', s = ''] = `${name}`?.split(' ')
  return `${n[0] || ''}${s[0] || ''}`.toUpperCase()
}

export function addSeparatorsToNumberString(value: string, separators: string[] = []) {
  separators.forEach(separator => {
    if (value.includes(separator)) {
      // Only lets value have 1 separator of the same type
      value = `${value.split(separator)[0]}${separator}${value.split(separator)[1].replace(/separator/, '')}`
    }

    const qtdSeparators = separators.reduce((ac, at) => {
      if (value.includes(at)) ac += 1
      return ac
    }, 0)

    if (qtdSeparators > 1) {
      const firstSeparatorIndex = separators
        .map(separator => value.indexOf(separator))
        .reduce((ac, at) => (ac < at ? ac : at))

      const firstSeparator = separators.find(separator => value.indexOf(separator) === firstSeparatorIndex)

      const regex = new RegExp(`[^1-9${firstSeparator}]`, 'g')
      value = value.replace(regex, '')
    }
  })

  return value
}

export function validNumber(value: string) {
  return value?.replace(',', '.') ?? null
}

export function removeFileExtension(filename: string) {
  return filename.split('.').slice(0, -1).join('.')
}

export function formatDoc(src: string) {
  const isCpf = cpf.isValid(src)
  const isCnpj = cnpj.isValid(src)

  if (isCpf) return cpf.format(src)
  if (isCnpj) return cnpj.format(src)

  return src
}
