export function validateRequired(value) {
  return String(value ?? '').trim().length > 0
}

export function validateEmail(value) {
  if (!value) return true

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function validateUrl(value) {
  if (!value) return true

  try {
    const parsedUrl = new URL(value)
    return ['http:', 'https:'].includes(parsedUrl.protocol)
  } catch {
    return false
  }
}

export function validateLength(value, min = 0, max = Number.POSITIVE_INFINITY) {
  const normalizedValue = String(value ?? '').trim()
  return normalizedValue.length >= min && normalizedValue.length <= max
}

export function validateImageUrl(value) {
  if (!value) return true

  return validateUrl(value)
}
