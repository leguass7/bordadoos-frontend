export const trackingId = process.env.NEXT_PUBLIC_GOOGLE_ADS
const isServer = typeof window === 'undefined'
let installed = false

export const scriptProps = {
  id: 'gatag-script',
  src: `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
}

export const preInnerHtml = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){
      dataLayer.push(arguments);
      // console.log('pre gtag')
    };
    gtag('js', new Date());
    gtag('config', '${trackingId}', { page_path: window.location.pathname });
`

export function install(): void {
  if (document.getElementById(scriptProps.id)) {
    installed = true
    return
  }
  const { head } = document
  const script = document.createElement('script')
  script.id = scriptProps.id
  script.type = 'text/javascript'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
  head.insertBefore(script, head.firstChild)

  // @ts-ignore
  window.dataLayer = window.dataLayer || []

  gtag('js', new Date())
  //@ts-ignore
  gtag('config', trackingId)
}

type GTAG = typeof window.gtag
export const localGtag: GTAG = function () {
  if (!isServer) {
    // @ts-ignore
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
}

function withChecks(): GTAG {
  if (!isServer && !installed) install()
  return (!isServer && window.gtag) || localGtag
}

export default withChecks()
