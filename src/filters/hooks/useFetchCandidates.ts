import { useState, useEffect, useRef, useMemo } from 'react'
import { CandidateFilters } from '../api'
import { Candidate } from '../types'

export function useFetchCandidates(fetchFunction: (filters?: CandidateFilters) => Promise<Partial<Candidate>[]>, filters?: CandidateFilters) {
  const [data, setData] = useState<Partial<Candidate>[] | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const serializedFilters = useMemo(() => JSON.stringify(filters ?? {}), [filters])

  useEffect(() => {
    let isMounted = true
    abortControllerRef.current = new AbortController()

    const filtersForFetch: CandidateFilters | undefined = serializedFilters !== '{}' ? (JSON.parse(serializedFilters) as CandidateFilters) : undefined

    const fetchData = async () => {
      setIsFetching(true)
      setError(null)

      try {
        const result = await fetchFunction(filtersForFetch)
        if (isMounted) setData(result) // ✅ result type matches state
      } catch (err: unknown) {
        if (!isMounted) return
        if (err instanceof DOMException && err.name === 'AbortError') return

        if (err instanceof Error) setError(err)
        else setError(new Error(String(err))) // ✅ assign unknown to error
      } finally {
        if (isMounted) setIsFetching(false)
      }
    }

    void fetchData()

    return () => {
      isMounted = false
      abortControllerRef.current?.abort()
    }
  }, [fetchFunction, serializedFilters])

  return { data, isFetching, error }
}
