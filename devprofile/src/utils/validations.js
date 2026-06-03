export function validateRequired(value) {
  return String(value ?? '').trim().length > 0
}

export function validateEmail(value) {
  if (!value) return true

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
