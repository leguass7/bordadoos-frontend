import { useCallback, useState, useEffect } from 'react'

export function useWindowDimensions() {
  const getWindowDimensions = useCallback(() => {
    return { width: window?.innerWidth || 0, height: window?.innerHeight || 0 }
  }, [])

  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions())
    if (window) window?.addEventListener('resize', handleResize)
    return () => {
      if (window) window?.removeEventListener('resize', handleResize)
    }
  }, [getWindowDimensions])

  return windowDimensions
}
