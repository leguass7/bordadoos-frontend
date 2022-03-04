import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { CardContent, Card, CardProps, Collapse, IconButton, IconButtonProps, styled as muiStyled } from '@mui/material'
import styled, { css } from 'styled-components'

type Breakpoints = {
  mobile?: string
  tablet?: string
}

interface Props {
  spacing?: number
  expand?: boolean
  CollapsibleContent?: JSX.Element
  cardProps?: CardProps
  width?: string
  breakpoints?: Breakpoints
}

export const CardItem: React.FC<Props> = ({
  children,
  spacing = 4,
  CollapsibleContent,
  expand,
  cardProps,
  breakpoints,
  width = '25%'
}) => {
  return (
    <CardContainer
      mobileBreakpoint={breakpoints?.mobile}
      tabletBreakpoint={breakpoints?.tablet}
      spacing={spacing}
      width={width}
    >
      {/* <div style={{ padding: spacing, width }}> */}
      <Card style={{ padding: `${spacing}px` }} {...cardProps}>
        {children}
        {CollapsibleContent ? (
          <Collapse in={!!expand}>
            <CardContent>{CollapsibleContent}</CardContent>
          </Collapse>
        ) : null}
      </Card>
      {/* </div> */}
    </CardContainer>
  )
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

export const CardExpandMore = muiStyled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return (
    <IconButton {...other}>
      <ExpandMoreIcon />
    </IconButton>
  )
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

interface CardContainerProps {
  spacing: number
  width: string
  mobileBreakpoint: string
  tabletBreakpoint: string
}

const CardContainer = styled.div<CardContainerProps>`
  padding: ${props => `${props.spacing}px`};
  width: 100%;

  @media (min-width: ${props => props?.mobileBreakpoint ?? '520px'}) {
    width: 50%;
  }

  @media (min-width: ${props => props?.tabletBreakpoint ?? '768px'}) {
    width: ${props => props.width};
  }
`

// External styles
interface CardStructure {
  justify?: string
  align?: string
  expand?: number
}

export const CardRow = styled.div<CardStructure>`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${props => props?.justify ?? 'flex-start'};
  align-items: ${props => props?.align ?? 'flex-start'};

  ${props =>
    props?.expand &&
    css`
      flex: ${props?.expand ?? 'auto'};
    `}
`
// FIXME: duplicated code

export const CardColumn = styled.div<CardStructure>`
  display: flex;
  flex-flow: column wrap;
  justify-content: ${props => props?.justify ?? 'center'};
  align-items: ${props => props?.align ?? 'center'};
  padding: 2px;

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }

  ${props =>
    props?.expand &&
    css`
      flex: ${props?.expand ?? 'auto'};
    `}
`
