import { useState } from 'react'
import { useCV } from '../context/CVContext'
import {
  validateLength,
  validateOneOf,
  validateRequired,
  validateUniqueLanguageName,
} from '../utils/validations'

const languageLevels = ['Básico', 'Intermedio', 'Avanzado', 'Nativo']

const emptyLanguage = {
  name: '',
  level: '',
  description: '',
}

function mergeLanguageData(languageData) {
  return {
    ...emptyLanguage,
    ...languageData,
  }
}

function buildLanguageErrors(formData, languages, currentLanguageId) {
  const errors = {}

  if (!validateRequired(formData.name)) {
    errors.name = 'El nombre del idioma es obligatorio.'
  } else if (!validateLength(formData.name, 3, 50)) {
    errors.name = 'El nombre debe tener entre 3 y 50 caracteres.'
  } else if (!validateUniqueLanguageName(formData.name, languages, currentLanguageId)) {
    errors.name = 'Ya registraste ese idioma.'
  }

  if (!validateRequired(formData.level)) {
    errors.level = 'El nivel es obligatorio.'
  } else if (!validateOneOf(formData.level, languageLevels)) {
    errors.level = 'Selecciona un nivel válido.'
  }

  if (formData.description && !validateLength(formData.description, 0, 200)) {
    errors.description = 'La descripción debe tener máximo 200 caracteres.'
  }

  return errors
}

function LanguageForm({ editingLanguage, languages, onFinishEditing }) {
  const { addItem, updateItem } = useCV()
  const [formData, setFormData] = useState(() => mergeLanguageData(editingLanguage))
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const isEditing = Boolean(editingLanguage?.id)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
    setSuccessMessage('')
  }

  const resetForm = () => {
    setFormData(mergeLanguageData(null))
    setErrors({})
    setSuccessMessage('')
  }

  const handleCancel = () => {
    resetForm()
    onFinishEditing()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = buildLanguageErrors(
      formData,
      languages,
      editingLanguage?.id ?? null,
    )
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage('')
      return
    }

    const normalizedLanguage = {
      name: formData.name.trim().replace(/\s+/g, ' '),
      level: formData.level,
      description: formData.description.trim(),
    }

    if (isEditing) {
      updateItem('languages', editingLanguage.id, normalizedLanguage)
      setSuccessMessage('Idioma actualizado correctamente')
      onFinishEditing()
      return
    }

    addItem('languages', normalizedLanguage)
    resetForm()
    setSuccessMessage('Idioma guardado correctamente')
  }

  return (
    <section className="content-card language-form-card">
      <div className="section-heading">
        <h2>{isEditing ? 'Editar idioma' : 'Agregar idioma'}</h2>
        <p>Registra los idiomas que dominas y el nivel correspondiente.</p>
      </div>

      <form className="personal-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="form-field">
            <span>Nombre del idioma</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej. Ingles"
            />
            {errors.name ? <small className="form-error">{errors.name}</small> : null}
          </label>

          <label className="form-field">
            <span>Nivel</span>
            <select name="level" value={formData.level} onChange={handleChange}>
              <option value="">Selecciona un nivel</option>
              {languageLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.level ? <small className="form-error">{errors.level}</small> : null}
          </label>

          <label className="form-field form-field-full">
            <span>Descripción o certificación opcional</span>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ej. Certificación, experiencia o contexto de uso."
            />
            {errors.description ? (
              <small className="form-error">{errors.description}</small>
            ) : null}
          </label>
        </div>

        <div className="form-actions">
          <button className="button primary-button" type="submit">
            {isEditing ? 'Guardar cambios' : 'Agregar idioma'}
          </button>

          {isEditing ? (
            <button className="button secondary-button" type="button" onClick={handleCancel}>
              Cancelar edición
            </button>
          ) : null}

          {successMessage ? <p className="form-success">{successMessage}</p> : null}
        </div>
      </form>
    </section>
  )
}

export default LanguageForm
