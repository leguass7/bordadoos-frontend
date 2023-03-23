import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function usePersistedState<T = any>(name: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(defaultValue)
  const [rendered, setRendered] = useState(0)

  useEffect(() => {
    try {
      if (!localStorage) return null

      const storedValue = localStorage.getItem(name)
      const noValue = value === defaultValue

      if (noValue && storedValue && !rendered) {
        setValue(JSON.parse(storedValue))
        setRendered(old => old + 1)
      }
    } catch {}
  }, [name, value, defaultValue, rendered])

  useEffect(() => {
    try {
      if (!localStorage) return null

      localStorage.setItem(name, JSON.stringify(value))
    } catch {}
  }, [name, value])

  return [value, setValue]
}
