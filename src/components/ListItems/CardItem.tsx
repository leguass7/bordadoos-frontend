import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { CardContent, Collapse, IconButton, IconButtonProps, styled } from '@mui/material'
import Card, { CardProps } from '@mui/material/Card'

interface Props {
  spacing?: number
  expand?: boolean
  CollapsibleContent?: JSX.Element
  cardProps?: CardProps
  width?: string
}

export const CardItem: React.FC<Props> = ({
  children,
  spacing = 4,
  CollapsibleContent,
  expand,
  cardProps,
  width = '20%'
}) => {
  return (
    <div style={{ padding: spacing, width }}>
      <Card {...cardProps}>
        {children}
        {CollapsibleContent ? (
          <Collapse in={!!expand}>
            <CardContent>{CollapsibleContent}</CardContent>
          </Collapse>
        ) : null}
      </Card>
    </div>
  )
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

export const CardExpandMore = styled((props: ExpandMoreProps) => {
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
