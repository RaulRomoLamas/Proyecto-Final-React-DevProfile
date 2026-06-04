import { useEffect, useState } from 'react'

function useLocalStorage(key, initialValue) {
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error al leer localStorage para la clave ${key}:`, error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState(readValue)

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error al guardar localStorage para la clave ${key}:`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
