import { Button, ButtonGroup, Typography } from '@mui/material'
import styled from 'styled-components'

import { Column, Row } from '~/styles/grid'

import { usePurchase } from './PurchaseProvider'

export enum PurchaseActionSelect {
  client = 'CLIENT',
  type = 'TYPE',
  category = 'CATEGORY'
}

interface Props {
  onSave?: () => void
  onSelect?: (type: PurchaseActionSelect) => void
}

export const PurchaseActions: React.FC<Props> = ({ onSave, onSelect }) => {
  const { canSave } = usePurchase()

  return (
    <ActionContainer>
      <Row expand={1} justify="space-between" align="flex-end">
        <Column expand={1} align="flex-start">
          {onSelect ? (
            <>
              <Typography variant="caption" color="grayText">
                Selecionar
              </Typography>
              <ButtonGroup>
                <Button onClick={() => onSelect(PurchaseActionSelect['client'])}>cliente</Button>
                <Button onClick={() => onSelect(PurchaseActionSelect['type'])}>tipo</Button>
                <Button onClick={() => onSelect(PurchaseActionSelect['category'])}>posição</Button>
              </ButtonGroup>
            </>
          ) : null}
        </Column>
        <Column>
          <Button variant="contained" onClick={onSave} disabled={!onSave || !canSave}>
            Salvar
          </Button>
        </Column>
      </Row>
    </ActionContainer>
  )
}

const ActionContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;

  justify-content: space-between;
  align-items: flex-end;

  align-self: flex-end;
  justify-self: flex-end;
`
