import { useEffect, useState } from 'react'

function useLocalStorage(key, initialValue) {
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState(readValue)

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // localStorage puede fallar si el navegador restringe el almacenamiento.
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
