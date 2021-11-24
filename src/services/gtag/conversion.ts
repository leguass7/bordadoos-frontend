import defaultGtag, { trackingId } from '.'

export function sendGTagConversion(conversion: string): void {
  defaultGtag('event', 'conversion', { send_to: `${trackingId}/${conversion}` })
}

export function sendGTagPageView(title: string, path: string): void {
  defaultGtag('config', trackingId, { page_title: title, page_path: path })
}

type ReportCallback = () => void

interface OptionsCallBack {
  value?: number
}

export function gtagReportConversion(
  conversion: string,
  callback?: ReportCallback | OptionsCallBack | string
): boolean {
  const options: any = {}

  if (typeof callback === 'object') {
    if (callback.value) {
      options.currency = 'BRL'
      options.value = callback.value
    }
  }

  const cb = (): void => {
    // @ts-ignore
    if (typeof callback === 'string') window.location = callback
    else if (typeof callback === 'function') callback()
  }

  defaultGtag('event', 'conversion', {
    send_to: `${trackingId}/${conversion}`,
    event_callback: cb,
    ...options
  })

  // console.log('Conversao', `${trackingId}/${conversion}`)
  return false
}
