import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function usePersistedState<T = any>(
  name: string,
  defaultValue: T,
  persist = true
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(defaultValue)
  const [rendered, setRendered] = useState(0)

  useEffect(() => {
    if (!persist) return
    try {
      if (!localStorage) return null

      const storedValue = localStorage.getItem(name)
      const noValue = value === defaultValue

      if (noValue && storedValue && !rendered) {
        setValue(JSON.parse(storedValue))
        setRendered(old => old + 1)
      }
    } catch {}
  }, [name, value, defaultValue, rendered, persist])

  useEffect(() => {
    if (!persist) return
    try {
      if (!localStorage) return null

      localStorage.setItem(name, JSON.stringify(value))
    } catch {}
  }, [name, value, persist])

  return [value, setValue]
}
