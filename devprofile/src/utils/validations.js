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

export function validateImageSource(value) {
  if (!value) return true

  return validateUrl(value) || String(value).startsWith('data:image/')
}

export function validateOneOf(value, options = []) {
  return options.includes(value)
}

export function validateNumberRange(value, min, max) {
  const numericValue = Number(value)

  return Number.isFinite(numericValue) && numericValue >= min && numericValue <= max
}

export function normalizeComparableText(value) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

export function validateUniqueSkillName(name, skills = [], currentId = null) {
  const normalizedName = normalizeComparableText(name)

  return !skills.some((skill) => {
    if (skill.id === currentId) {
      return false
    }

    return normalizeComparableText(skill.name) === normalizedName
  })
}

export function validateUniqueProjectName(name, projects = [], currentId = null) {
  const normalizedName = normalizeComparableText(name)

  return !projects.some((project) => {
    if (project.id === currentId) {
      return false
    }

    return normalizeComparableText(project.name) === normalizedName
  })
}

export function validateUniqueEducationProgram(program, education = [], currentId = null) {
  const normalizedProgram = normalizeComparableText(program)

  return !education.some((educationItem) => {
    if (educationItem.id === currentId) {
      return false
    }

    return normalizeComparableText(educationItem.program) === normalizedProgram
  })
}

export function validateUniqueLanguageName(name, languages = [], currentId = null) {
  const normalizedName = normalizeComparableText(name)

  return !languages.some((language) => {
    if (language.id === currentId) {
      return false
    }

    return normalizeComparableText(language.name) === normalizedName
  })
}
