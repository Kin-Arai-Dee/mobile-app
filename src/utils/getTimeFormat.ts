const getTimeFormat = (expirationTime: number): string => {
  const hours = Math.floor(expirationTime / 3600000)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor((expirationTime % 3600000) / 60000)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor((expirationTime % 60000) / 1000)
    .toString()
    .padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}

export default getTimeFormat
