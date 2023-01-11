import { alpha as alphaMui, darken as darkenMui, lighten } from '@mui/material/styles'
// import chroma from 'chroma-js'

type ModeType = 'rgb' | 'rgba' | 'auto'
export function darken(color = '#fff', alpha = 0.5, mode: ModeType = 'rgba'): string {
  // return chroma(color).darken(alpha).hex(mode)
  return darkenMui(color, alpha)
}

export function alpha(color: string, alpha = 0.5, mode: ModeType = 'rgba'): string {
  // return chroma(color).alpha(alpha).hex(mode)
  return alphaMui(color, alpha)
}

export function brighten(color: string, alpha = 1, mode: ModeType = 'rgb'): string {
  // return chroma(color).brighten(alpha).hex(mode)
  return lighten(color, alpha)
}
