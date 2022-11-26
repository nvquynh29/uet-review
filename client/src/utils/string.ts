export const truncateString = (str: string, n: number) => {
  if (str) {
    if (str.length > n) {
      str = str.substring(0, n - 1) + '...'
      return str
    } else {
      return str
    }
  }
  return ''
}
