import { useCallback } from 'react'

import { useSession } from 'next-auth/client'

export const useHasAccess = (level: number) => {
  const [session] = useSession()

  return useCallback(() => !!(session?.user?.level > level), [level, session?.user?.level])
}
