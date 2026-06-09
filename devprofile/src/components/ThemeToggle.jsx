import useTheme from '../hooks/useTheme'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
    >
      {isDark ? 'Modo claro' : 'Modo oscuro'}
    </button>
  )
}

export default ThemeToggle
