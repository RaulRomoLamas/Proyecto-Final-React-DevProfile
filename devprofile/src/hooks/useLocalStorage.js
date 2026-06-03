import { useState } from 'react'

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue)

  // La lectura y escritura en localStorage se integrará en una etapa posterior.
  const updateValue = (value) => {
    setStoredValue(value)
  }

  return [storedValue, updateValue]
}

export default useLocalStorage
