import { useState } from 'react'
import { useCV } from '../context/CVContext'
import {
  validateLength,
  validateRequired,
  validateUniqueProjectName,
  validateUrl,
} from '../utils/validations'

const emptyProject = {
  name: '',
  description: '',
  technologies: '',
  repositoryUrl: '',
  deployUrl: '',
  imageUrl: '',
}

function mergeProjectData(projectData) {
  return {
    ...emptyProject,
    ...projectData,
  }
}

function buildProjectErrors(formData, projects, currentProjectId) {
  const errors = {}

  if (!validateRequired(formData.name)) {
    errors.name = 'El nombre del proyecto es obligatorio.'
  } else if (!validateLength(formData.name, 3, 80)) {
    errors.name = 'El nombre debe tener entre 3 y 80 caracteres.'
  } else if (!validateUniqueProjectName(formData.name, projects, currentProjectId)) {
    errors.name = 'Ya existe un proyecto con ese nombre.'
  }

  if (!validateRequired(formData.description)) {
    errors.description = 'La descripcion del proyecto es obligatoria.'
  } else if (!validateLength(formData.description, 20, 500)) {
    errors.description = 'La descripcion debe tener entre 20 y 500 caracteres.'
  }

  if (!validateRequired(formData.technologies)) {
    errors.technologies = 'Las tecnologias utilizadas son obligatorias.'
  } else if (!validateLength(formData.technologies, 2, 150)) {
    errors.technologies = 'Las tecnologias deben tener entre 2 y 150 caracteres.'
  }

  if (!validateUrl(formData.repositoryUrl)) {
    errors.repositoryUrl = 'El enlace del repositorio no es valido.'
  }

  if (!validateUrl(formData.deployUrl)) {
    errors.deployUrl = 'El enlace del deploy no es valido.'
  }

  if (!validateUrl(formData.imageUrl)) {
    errors.imageUrl = 'El enlace de la imagen no es valido.'
  }

  return errors
}

function ProjectForm({ editingProject, projects, onFinishEditing }) {
  const { addItem, updateItem } = useCV()
  const [formData, setFormData] = useState(() => mergeProjectData(editingProject))
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const isEditing = Boolean(editingProject?.id)

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
    setFormData(mergeProjectData(null))
    setErrors({})
    setSuccessMessage('')
  }

  const handleCancel = () => {
    resetForm()
    onFinishEditing()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = buildProjectErrors(
      formData,
      projects,
      editingProject?.id ?? null,
    )
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage('')
      return
    }

    const normalizedProject = {
      name: formData.name.trim().replace(/\s+/g, ' '),
      description: formData.description.trim(),
      technologies: formData.technologies.trim().replace(/\s+/g, ' '),
      repositoryUrl: formData.repositoryUrl.trim(),
      deployUrl: formData.deployUrl.trim(),
      imageUrl: formData.imageUrl.trim(),
    }

    if (isEditing) {
      updateItem('projects', editingProject.id, normalizedProject)
      setSuccessMessage('Proyecto actualizado correctamente')
      onFinishEditing()
      return
    }

    addItem('projects', normalizedProject)
    resetForm()
    setSuccessMessage('Proyecto guardado correctamente')
  }

  return (
    <section className="content-card project-form-card">
      <div className="section-heading">
        <h2>{isEditing ? 'Editar proyecto' : 'Agregar proyecto'}</h2>
        <p>Registra tus proyectos con enlaces, tecnologias e imagen representativa.</p>
      </div>

      <form className="personal-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="form-field">
            <span>Nombre del proyecto</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej. DevProfile"
            />
            {errors.name ? <small className="form-error">{errors.name}</small> : null}
          </label>

          <label className="form-field">
            <span>Tecnologias utilizadas</span>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="Ej. React, Vite, CSS"
            />
            {errors.technologies ? (
              <small className="form-error">{errors.technologies}</small>
            ) : null}
          </label>

          <label className="form-field form-field-full">
            <span>Descripcion</span>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el objetivo, alcance o resultado del proyecto."
            />
            {errors.description ? (
              <small className="form-error">{errors.description}</small>
            ) : null}
          </label>

          <label className="form-field">
            <span>Enlace al repositorio</span>
            <input
              type="url"
              name="repositoryUrl"
              value={formData.repositoryUrl}
              onChange={handleChange}
              placeholder="https://github.com/usuario/proyecto"
            />
            {errors.repositoryUrl ? (
              <small className="form-error">{errors.repositoryUrl}</small>
            ) : null}
          </label>

          <label className="form-field">
            <span>Enlace al deploy</span>
            <input
              type="url"
              name="deployUrl"
              value={formData.deployUrl}
              onChange={handleChange}
              placeholder="https://proyecto.com"
            />
            {errors.deployUrl ? (
              <small className="form-error">{errors.deployUrl}</small>
            ) : null}
          </label>

          <label className="form-field form-field-full">
            <span>Imagen o captura representativa por URL</span>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://sitio.com/imagen.png"
            />
            {errors.imageUrl ? (
              <small className="form-error">{errors.imageUrl}</small>
            ) : null}
          </label>
        </div>

        <div className="form-actions">
          <button className="button primary-button" type="submit">
            {isEditing ? 'Guardar cambios' : 'Agregar proyecto'}
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

export default ProjectForm
