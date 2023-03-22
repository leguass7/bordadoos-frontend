/* eslint-disable react-hooks/rules-of-hooks */
import { Dispatch, SetStateAction, useState } from 'react'

import { usePersistedState } from './usePersistedState'

export function useStateSelector<T = any>(
  condition?: boolean,
  name?: string,
  defaultValue?: T
): [T, Dispatch<SetStateAction<T>>] {
  return condition ? usePersistedState(name, defaultValue) : useState(defaultValue)
}
