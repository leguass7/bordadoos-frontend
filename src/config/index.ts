import pkg from '../../package.json'
export const dev = process.env.NODE_ENV !== 'production'

const virtualHost = `${process.env.NEXT_PUBLIC_VIRTUAL_HOST}` || ''
const vhost = typeof virtualHost === 'undefined' || virtualHost === 'undefined' ? '' : virtualHost
export const host = dev ? 'localhost:3000' : vhost || ''

export const imageBase = dev ? `http://${host}` : `${host ? `https://${host}` : ''}`

export const saltKey = process.env.SECRET

export const appName = pkg.name
export const appVersion = pkg.version
