/**
 * useDecisions.ts
 *
 * React hook for the decision log.
 * Reads from / writes to decisionStore (localStorage-backed).
 */

import { useState, useCallback } from 'react'
import { decisionStore, type DecisionItem } from '../lib/decisionStore'

export type { DecisionItem }

export interface UseDecisionsResult {
  decisions: DecisionItem[]
  pendingCount: number
  handleDecision: (id: string, action: 'approved' | 'rejected') => void
  resetDecisions: () => void
}

export function useDecisions(): UseDecisionsResult {
  const [decisions, setDecisions] = useState<DecisionItem[]>(() =>
    decisionStore.list(),
  )

  const handleDecision = useCallback(
    (id: string, action: 'approved' | 'rejected') => {
      setDecisions(decisionStore.updateStatus(id, action))
    },
    [],
  )

  const resetDecisions = useCallback(() => {
    decisionStore.reset()
    setDecisions(decisionStore.list())
  }, [])

  const pendingCount = decisions.filter((d) => d.status === 'pending').length

  return { decisions, pendingCount, handleDecision, resetDecisions }
}
