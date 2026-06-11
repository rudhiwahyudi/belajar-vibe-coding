import { useEffect, useState } from 'react'

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setPrefersReduced(query.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return prefersReduced
}
