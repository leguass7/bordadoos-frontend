import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import ptBr from 'date-fns/locale/pt-BR'
import { Provider as ProviderAuth } from 'next-auth/client'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import { AppThemeProvider } from '~/components/AppThemeProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProviderAuth session={pageProps.session}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBr}>
        <AppThemeProvider>
          <Component {...pageProps} />
        </AppThemeProvider>
        <ToastContainer />
      </LocalizationProvider>
    </ProviderAuth>
  )
}

export default MyApp
