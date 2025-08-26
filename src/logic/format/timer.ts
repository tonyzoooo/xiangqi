export const formatTime = (t: number) => {
  const minutes = Math.floor(t / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (t % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}
