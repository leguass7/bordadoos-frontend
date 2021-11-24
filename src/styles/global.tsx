import { memo } from 'react'
import { createGlobalStyle } from 'styled-components'
// import { renderToStaticMarkup } from 'react-dom/server'
import back from '~/assets/images/background.svg'

const renderBackground = (orientation: 'portrait' | 'landscape', color?: string) => {
  // const svgString = encodeURIComponent(renderToStaticMarkup(<BackgroundSvg orientation={orientation} color={color} />))
  // return `url("data:image/svg+xml,${svgString}")`
  return `url(${back})`
}

const GlobalStyle = createGlobalStyle`

  * {
     box-sizing: border-box;
  }

  html {
    height: 100%;
    margin: 0 auto;
    padding: 0;
  }

  body {
    height: 100%;
    margin: 0 auto;
    padding: 0;
    background-color: rgba(255, 255, 255, 1);
    background-repeat: repeat;
    background-position: center;
    background-size:auto;
    /* background-attachment: fixed; */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background-image: ${renderBackground('landscape')};
  }

  #__next{
    position: relative;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  button{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
`

export default memo(GlobalStyle)
