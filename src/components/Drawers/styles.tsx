import styled from 'styled-components'

import { alpha } from '~/helpers/colors'

export const ListContainer = styled.ul`
  display: block;
  width: 254px;
  max-width: 254px;
  padding: 0px ${({ theme }) => theme.spacing.m}px;
`

export const ItemDescription = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`

export const ItemTitle = styled.h4`
  padding: 0;
  margin: 0;
  display: block;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  font-size: 14px;
  line-height: 14px;
  margin-bottom: ${({ theme }) => theme.spacing.s}px;
`
export const ItemContainer = styled.li<{ actived?: boolean }>`
  padding: ${({ theme }) => theme.spacing.s}px;
  display: block;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.rounded}px;
  margin-bottom: ${({ theme }) => theme.spacing.m}px;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  background-color: ${({ theme, actived }) => (actived ? alpha(theme.colors.border, 0.3) : 'transparent')};

  &:hover,
  &:active,
  &:focus {
    background-color: ${({ theme }) => alpha(theme.colors.border, 0.3)};
  }
`
