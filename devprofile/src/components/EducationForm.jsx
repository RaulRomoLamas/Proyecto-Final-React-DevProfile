import { useState } from 'react'
import { useCV } from '../context/CVContext'
import {
  validateLength,
  validateRequired,
  validateUniqueEducationProgram,
  validateUrl,
} from '../utils/validations'

const emptyEducation = {
  institution: '',
  program: '',
  period: '',
  description: '',
  evidenceUrl: '',
}

function mergeEducationData(educationData) {
  return {
    ...emptyEducation,
    ...educationData,
    program: educationData?.program ?? educationData?.degree ?? '',
  }
}

function buildEducationErrors(formData, education, currentEducationId) {
  const errors = {}

  if (!validateRequired(formData.institution)) {
    errors.institution = 'La institución es obligatoria.'
  } else if (!validateLength(formData.institution, 3, 100)) {
    errors.institution = 'La institución debe tener entre 3 y 100 caracteres.'
  }

  if (!validateRequired(formData.program)) {
    errors.program = 'El programa, curso o certificación es obligatorio.'
  } else if (!validateLength(formData.program, 3, 120)) {
    errors.program = 'El programa debe tener entre 3 y 120 caracteres.'
  } else if (!validateUniqueEducationProgram(formData.program, education, currentEducationId)) {
    errors.program = 'Ya existe un registro con ese programa.'
  }

  if (!validateRequired(formData.period)) {
    errors.period = 'El periodo o año es obligatorio.'
  } else if (!validateLength(formData.period, 4, 30)) {
    errors.period = 'El periodo debe tener entre 4 y 30 caracteres.'
  }

  if (!validateRequired(formData.description)) {
    errors.description = 'La descripción es obligatoria.'
  } else if (!validateLength(formData.description, 10, 300)) {
    errors.description = 'La descripción debe tener entre 10 y 300 caracteres.'
  }

  if (!validateUrl(formData.evidenceUrl)) {
    errors.evidenceUrl = 'El enlace de evidencia no es válido.'
  }

  return errors
}

function EducationForm({ editingEducation, education, onFinishEditing }) {
  const { addItem, updateItem } = useCV()
  const [formData, setFormData] = useState(() => mergeEducationData(editingEducation))
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const isEditing = Boolean(editingEducation?.id)

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
    setFormData(mergeEducationData(null))
    setErrors({})
    setSuccessMessage('')
  }

  const handleCancel = () => {
    resetForm()
    onFinishEditing()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = buildEducationErrors(
      formData,
      education,
      editingEducation?.id ?? null,
    )
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage('')
      return
    }

    const normalizedEducation = {
      institution: formData.institution.trim().replace(/\s+/g, ' '),
      program: formData.program.trim().replace(/\s+/g, ' '),
      period: formData.period.trim().replace(/\s+/g, ' '),
      description: formData.description.trim(),
      evidenceUrl: formData.evidenceUrl.trim(),
    }

    if (isEditing) {
      updateItem('education', editingEducation.id, normalizedEducation)
      setSuccessMessage('Registro actualizado correctamente')
      onFinishEditing()
      return
    }

    addItem('education', normalizedEducation)
    resetForm()
    setSuccessMessage('Registro guardado correctamente')
  }

  return (
    <section className="content-card education-form-card">
      <div className="section-heading">
        <h2>{isEditing ? 'Editar educación' : 'Agregar educación'}</h2>
        <p>Registra estudios, cursos o certificaciones relevantes para tu perfil.</p>
      </div>

      <form className="personal-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="form-field">
            <span>Institución</span>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="Ej. Universidad"
            />
            {errors.institution ? (
              <small className="form-error">{errors.institution}</small>
            ) : null}
          </label>

          <label className="form-field">
            <span>Programa, curso o certificación</span>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              placeholder="Ej. Ingeniería en Sistemas"
            />
            {errors.program ? (
              <small className="form-error">{errors.program}</small>
            ) : null}
          </label>

          <label className="form-field">
            <span>Periodo o año</span>
            <input
              type="text"
              name="period"
              value={formData.period}
              onChange={handleChange}
              placeholder="Ej. 2022 - 2026"
            />
            {errors.period ? <small className="form-error">{errors.period}</small> : null}
          </label>

          <label className="form-field">
            <span>Enlace de evidencia</span>
            <input
              type="url"
              name="evidenceUrl"
              value={formData.evidenceUrl}
              onChange={handleChange}
              placeholder="https://sitio.com/certificado"
            />
            {errors.evidenceUrl ? (
              <small className="form-error">{errors.evidenceUrl}</small>
            ) : null}
          </label>

          <label className="form-field form-field-full">
            <span>Descripción breve</span>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe brevemente el aprendizaje o logro obtenido."
            />
            {errors.description ? (
              <small className="form-error">{errors.description}</small>
            ) : null}
          </label>
        </div>

        <div className="form-actions">
          <button className="button primary-button" type="submit">
            {isEditing ? 'Guardar cambios' : 'Agregar registro'}
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

export default EducationForm
