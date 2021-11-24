import { memo } from 'react'
import { createGlobalStyle } from 'styled-components'

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
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
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
