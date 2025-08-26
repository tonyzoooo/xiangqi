import { useRef } from 'react'

import { MoveHistory } from '@/logic'

export const useHistory = () => {
  const ref = useRef<MoveHistory | null>(null)
  if (!ref.current) {
    ref.current = new MoveHistory()
  }

  return ref.current
}
