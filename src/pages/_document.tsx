/* eslint-disable @next/next/no-document-import-in-page */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import { appThemeDark } from '~/components/AppThemeProvider/themes'
import { imageBase } from '~/config'
import { preInnerHtml, scriptProps } from '~/services/gtag'

import favicon from '~/assets/images/favicon.png'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="icon" href={`${imageBase}${favicon}`} />
          <link rel="manifest" href="manifest.json" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="theme-color" content={appThemeDark.colors.primary} />
          <meta name="google-site-verification" content="ABCDEF" />
          <meta name="msvalidate.01" content="ABCDEF" />
          <script async {...scriptProps} />
          <script dangerouslySetInnerHTML={{ __html: preInnerHtml }} />
        </Head>
        <body id="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
