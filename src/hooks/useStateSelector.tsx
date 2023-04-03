/* eslint-disable react-hooks/rules-of-hooks */
import { Dispatch, SetStateAction, useState } from 'react'

import { usePersistedState } from './usePersistedState'

// if possible, do not use this hook, use the 3th parameter of usePersistedState instead
export function useStateSelector<T = any>(
  condition?: boolean,
  name?: string,
  defaultValue?: T
): [T, Dispatch<SetStateAction<T>>] {
  return condition ? usePersistedState(name, defaultValue) : useState(defaultValue)
}
