import Card, { CardProps } from '@mui/material/Card'

interface Props extends CardProps {
  spacing?: number
}

export const CardItem: React.FC<Props> = ({ children, spacing = 2, ...props }) => {
  return (
    <div style={{ padding: spacing }}>
      <Card {...props}>{children}</Card>
    </div>
  )
}
