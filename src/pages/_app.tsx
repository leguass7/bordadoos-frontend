import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { CacheProvider, EmotionCache } from '@emotion/react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import ptBr from 'date-fns/locale/pt-BR'

import { ToastContainer } from 'react-toastify'

import { Provider as ProviderAuth } from 'next-auth/client'
import type { AppProps } from 'next/app'

import { AppThemeProvider } from '~/components/AppThemeProvider'
import createEmotionCache from '~/config/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ProviderAuth session={pageProps.session}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBr}>
          <AppThemeProvider>
            <Component {...pageProps} />
          </AppThemeProvider>
          <ToastContainer />
        </LocalizationProvider>
      </ProviderAuth>
    </CacheProvider>
  )
}

export default MyApp
