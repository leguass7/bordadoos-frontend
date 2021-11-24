import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppThemeProvider } from '~/components/AppThemeProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppThemeProvider>
      <Component {...pageProps} />
    </AppThemeProvider>
  )
}

export default MyApp
