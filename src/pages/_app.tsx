import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'

import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import { CacheProvider, EmotionCache } from '@emotion/react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import ptBr from 'date-fns/locale/pt-BR'

import { AppThemeProvider } from '~/components/AppThemeProvider'
import createEmotionCache from '~/config/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps<Record<string, any>> {
  emotionCache?: EmotionCache
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider session={pageProps?.session}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBr}>
          <AppThemeProvider>
            <Component {...pageProps} />
          </AppThemeProvider>
          <ToastContainer />
        </LocalizationProvider>
      </SessionProvider>
    </CacheProvider>
  )
}

export default MyApp
