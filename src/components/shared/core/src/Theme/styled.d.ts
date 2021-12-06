import 'styled-components'

import { IAppTheme } from './types'

declare module 'styled-components' {
  export interface DefaultTheme extends IAppTheme {}
}
