import { useState } from 'react'
import { useCV } from '../context/CVContext'
import {
  validateLength,
  validateNumberRange,
  validateOneOf,
  validateRequired,
  validateUniqueSkillName,
} from '../utils/validations'

const skillCategories = [
  'Programacion',
  'Bases de datos',
  'Diseno web',
  'Idiomas',
  'Herramientas de desarrollo',
  'Habilidades blandas',
]

const emptySkill = {
  name: '',
  category: '',
  level: 50,
  description: '',
}

function mergeSkillData(skillData) {
  return {
    ...emptySkill,
    ...skillData,
  }
}

function buildSkillErrors(formData, skills, currentSkillId) {
  const errors = {}

  if (!validateRequired(formData.name)) {
    errors.name = 'El nombre de la habilidad es obligatorio.'
  } else if (!validateLength(formData.name, 2, 50)) {
    errors.name = 'El nombre debe tener entre 2 y 50 caracteres.'
  } else if (!validateUniqueSkillName(formData.name, skills, currentSkillId)) {
    errors.name = 'Ya existe una habilidad con ese nombre.'
  }

  if (!validateRequired(formData.category)) {
    errors.category = 'La categoria es obligatoria.'
  } else if (!validateOneOf(formData.category, skillCategories)) {
    errors.category = 'Selecciona una categoria valida.'
  }

  if (!validateRequired(formData.level)) {
    errors.level = 'El nivel es obligatorio.'
  } else if (!validateNumberRange(formData.level, 1, 100)) {
    errors.level = 'El nivel debe estar entre 1 y 100.'
  }

  if (!validateRequired(formData.description)) {
    errors.description = 'La descripcion de la habilidad es obligatoria.'
  } else if (!validateLength(formData.description, 10, 200)) {
    errors.description = 'La descripcion debe tener entre 10 y 200 caracteres.'
  }

  return errors
}

function SkillForm({ editingSkill, skills, onFinishEditing }) {
  const { addItem, updateItem } = useCV()
  const [formData, setFormData] = useState(() => mergeSkillData(editingSkill))
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const isEditing = Boolean(editingSkill?.id)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: name === 'level' ? value : value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
    setSuccessMessage('')
  }

  const resetForm = () => {
    setFormData(mergeSkillData(null))
    setErrors({})
    setSuccessMessage('')
  }

  const handleCancel = () => {
    resetForm()
    onFinishEditing()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = buildSkillErrors(formData, skills, editingSkill?.id ?? null)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage('')
      return
    }

    const normalizedSkill = {
      name: formData.name.trim().replace(/\s+/g, ' '),
      category: formData.category,
      level: Number(formData.level),
      description: formData.description.trim(),
    }

    if (isEditing) {
      updateItem('skills', editingSkill.id, normalizedSkill)
      setSuccessMessage('Habilidad actualizada correctamente')
      onFinishEditing()
      return
    }

    addItem('skills', normalizedSkill)
    resetForm()
    setSuccessMessage('Habilidad guardada correctamente')
  }

  return (
    <section className="content-card skill-form-card">
      <div className="section-heading">
        <h2>{isEditing ? 'Editar habilidad' : 'Agregar habilidad'}</h2>
        <p>Registra tus habilidades y define su nivel de dominio.</p>
      </div>

      <form className="personal-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="form-field">
            <span>Nombre de la habilidad</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej. React"
            />
            {errors.name ? <small className="form-error">{errors.name}</small> : null}
          </label>

          <label className="form-field">
            <span>Categoria</span>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Selecciona una categoria</option>
              {skillCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category ? (
              <small className="form-error">{errors.category}</small>
            ) : null}
          </label>

          <label className="form-field">
            <span>Nivel de dominio</span>
            <input
              type="number"
              name="level"
              min="1"
              max="100"
              value={formData.level}
              onChange={handleChange}
              placeholder="50"
            />
            {errors.level ? <small className="form-error">{errors.level}</small> : null}
          </label>

          <label className="form-field form-field-full">
            <span>Descripcion breve</span>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe brevemente tu experiencia o fortaleza con esta habilidad."
            />
            {errors.description ? (
              <small className="form-error">{errors.description}</small>
            ) : null}
          </label>
        </div>

        <div className="form-actions">
          <button className="button primary-button" type="submit">
            {isEditing ? 'Guardar cambios' : 'Agregar habilidad'}
          </button>

          {isEditing ? (
            <button className="button secondary-button" type="button" onClick={handleCancel}>
              Cancelar edicion
            </button>
          ) : null}

          {successMessage ? <p className="form-success">{successMessage}</p> : null}
        </div>
      </form>
    </section>
  )
}

export default SkillForm
