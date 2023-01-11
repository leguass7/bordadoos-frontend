import { useCallback } from 'react'

import { useSession } from 'next-auth/react'

export const useHasAccess = (level: number) => {
  const { data: session } = useSession()

  return useCallback(() => !!(session?.user?.level >= level), [level, session?.user?.level])
}
