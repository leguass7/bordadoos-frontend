import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

import { querystring } from '../../helpers/string'
import { useIsMounted } from '../../hooks/useIsMounted'
import { api } from '../../services/api'
import { IPagination, IResponsePaginate } from '../../services/api/api.types'
import { CircleLoading } from '../CircleLoading'

export interface IPaginationContext<T> {
  pagination: IPagination
  fetchData: <T extends IPagination>(paginateData: Partial<T>, apiURL?: string) => void
  fetchMoreData: () => void
  clearData: (persistData?: T[]) => void
  updatePagination: (data: IPagination) => void
  hasMore: boolean
  data: T[]
  url: string
  refreshData: (filter?: any /* Completar com padrão do provider de filtro no futuro */) => void
  filter: Record<string, any>
  updateFilter: (newFilterData: Record<string, string>) => void
  clearFilter: (persistData?: Record<string, string>) => void
}

const PaginationContext = createContext<IPaginationContext<unknown>>({} as IPaginationContext<unknown>)

interface Props {
  url: string
  initialPagination?: IPagination
  initialFilter?: Record<string, any>
  // customFetchData?: (paginateData: Partial<IPagination & Record<string, any>>) => IResponsePaginate<any>
}

export const PaginationProvider: React.FC<Props> = ({
  children,
  initialPagination = {},
  initialFilter = {},
  url
  // customFetchData,
}) => {
  const [pagination, setPagination] = useState<IPagination>({ page: 1, size: 12, ...initialPagination })
  const [filter, setFilter] = useState(initialFilter)
  const [data, setData] = useState([])

  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const isMounted = useIsMounted()

  const fetchData = useCallback(
    async function <T>(paginateData: Partial<T & IPagination> = {}) {
      // if (customFetchData) return customFetchData(paginateData)

      const payload = { ...filter, size: 12, page: 1, ...paginateData }
      if (payload.page === 1) setLoading(true)

      console.log('aaa')
      const currentURL = `${url}?${querystring(payload)}`
      const { data: response } = (await api.get(currentURL)) as { data: IResponsePaginate<any> }
      const { success = false, data: rData = [] } = response

      if (isMounted.current) {
        setLoading(false)
        if (success) {
          setPagination({ page: response.page })
          setData(old => [...old, ...rData])
          setHasMore(!!(response.page < response.pages))
        }
      }
    },
    [isMounted, url, filter]
  )

  const clearData = useCallback((persistData = []) => {
    setData(persistData)
  }, [])

  const fetchMoreData = useCallback(() => {
    fetchData({ page: (pagination?.page || 1) + 1 })
  }, [fetchData, pagination])

  const updatePagination = useCallback((paginateData: IPagination) => {
    setPagination(old => ({ ...old, ...paginateData }))
  }, [])

  const updateFilter = useCallback(
    (newFilter: Record<string, any>) => {
      clearData()
      setFilter(old => ({ ...old, ...newFilter }))
    },
    [clearData]
  )

  const clearFilter = useCallback((persistData = {}) => {
    setFilter(persistData)
  }, [])

  const refreshData = useCallback(() => {
    // setHasMore(true)
    updatePagination({ page: 1 })
    clearData()
    fetchData()
  }, [fetchData, clearData, updatePagination])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <PaginationContext.Provider
      value={{
        pagination,
        fetchData,
        fetchMoreData,
        hasMore,
        data,
        clearData,
        updatePagination,
        url,
        refreshData,
        filter,
        updateFilter,
        clearFilter
      }}
    >
      {children}
      {loading ? <CircleLoading /> : null}
    </PaginationContext.Provider>
  )
}

export function usePagination<T>() {
  return useContext(PaginationContext) as IPaginationContext<T>
}
