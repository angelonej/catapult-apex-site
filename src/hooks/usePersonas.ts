/**
 * usePersonas.ts
 *
 * React hook for AI executive persona profiles.
 * Reads from / writes to personaStore (localStorage-backed).
 */

import { useState, useCallback } from 'react'
import { personaStore, type PersonaProfile } from '../lib/personaStore'

export type { PersonaProfile }

export interface UsePersonasResult {
  personas: PersonaProfile[]
  getPersona: (agentId: string) => PersonaProfile | undefined
  updatePersona: (agentId: string, patch: Partial<Omit<PersonaProfile, 'agentId' | 'updatedAt'>>) => void
  resetPersonas: () => void
}

export function usePersonas(): UsePersonasResult {
  const [personas, setPersonas] = useState<PersonaProfile[]>(() =>
    personaStore.list(),
  )

  const getPersona = useCallback(
    (agentId: string) => personas.find((p) => p.agentId === agentId),
    [personas],
  )

  const updatePersona = useCallback(
    (agentId: string, patch: Partial<Omit<PersonaProfile, 'agentId' | 'updatedAt'>>) => {
      setPersonas(personaStore.update(agentId, patch))
    },
    [],
  )

  const resetPersonas = useCallback(() => {
    personaStore.reset()
    setPersonas(personaStore.list())
  }, [])

  return { personas, getPersona, updatePersona, resetPersonas }
}
