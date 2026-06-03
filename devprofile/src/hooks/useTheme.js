import { useState } from 'react'

function useTheme() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return {
    theme,
    toggleTheme,
  }
}

export default useTheme
