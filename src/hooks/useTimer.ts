import { useRef, useState } from 'react'

export const useTimer = () => {
  const [timer, setTimer] = useState(0)
  const [started, setStarted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (started) return
    setStarted(true)
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
  }

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    setTimer(0)
    setStarted(false)
  }

  return {
    timer,
    startTimer,
    resetTimer,
    timerStarted: started,
  }
}
