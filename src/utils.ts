/**
 * Debounces a function
 * @param func - Function to be debounced
 * @param delay - Delay in milliseconds
 * @returns - Debounced function
 */
const debounce = <Args extends unknown[], R>(
  func: (...args: Args) => R,
  delay: number
): ((...args: Args) => void) => {
  let timeoutId: number
  return (...args: Args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export { debounce }