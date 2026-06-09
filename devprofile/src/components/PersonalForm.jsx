import { useState } from 'react'
import { useCV } from '../context/CVContext'
import { imageFileToDataUrl } from '../utils/imageFiles'
import {
  validateEmail,
  validateImageSource,
  validateLength,
  validateRequired,
  validateUrl,
} from '../utils/validations'

const avatarOptions = [
  {
    id: 'avatar-initials',
    name: 'Avatar iniciales',
    url: 'https://api.dicebear.com/9.x/initials/svg?seed=DevProfile',
  },
  {
    id: 'avatar-lorelei',
    name: 'Avatar profesional',
    url: 'https://api.dicebear.com/9.x/lorelei/svg?seed=DevProfile',
  },
  {
    id: 'avatar-adventurer',
    name: 'Avatar creativo',
    url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=DevProfile',
  },
]

const emptyForm = {
  name: '',
  profession: '',
  location: '',
  email: '',
  phone: '',
  description: '',
  links: {
    github: '',
    linkedin: '',
    portfolio: '',
  },
  profileImage: '',
}

function mergePersonalData(personalData) {
  return {
    ...emptyForm,
    ...personalData,
    links: {
      ...emptyForm.links,
      ...personalData?.links,
    },
  }
}

function buildErrors(formData) {
  const errors = {}

  if (!validateRequired(formData.name)) {
    errors.name = 'El nombre completo es obligatorio.'
  } else if (!validateLength(formData.name, 3, 80)) {
    errors.name = 'El nombre debe tener entre 3 y 80 caracteres.'
  }

  if (!validateRequired(formData.profession)) {
    errors.profession = 'La profesion o area de especialidad es obligatoria.'
  } else if (!validateLength(formData.profession, 3, 100)) {
    errors.profession = 'La profesion debe tener entre 3 y 100 caracteres.'
  }

  if (!validateRequired(formData.location)) {
    errors.location = 'La ubicacion es obligatoria.'
  } else if (!validateLength(formData.location, 3, 100)) {
    errors.location = 'La ubicacion debe tener entre 3 y 100 caracteres.'
  }

  if (!validateRequired(formData.email)) {
    errors.email = 'El correo electronico es obligatorio.'
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Escribe un correo electronico valido.'
  }

  if (formData.phone && !validateLength(formData.phone, 0, 20)) {
    errors.phone = 'El telefono no puede superar 20 caracteres.'
  }

  if (!validateRequired(formData.description)) {
    errors.description = 'La descripcion profesional es obligatoria.'
  } else if (!validateLength(formData.description, 30, 500)) {
    errors.description = 'La descripcion debe tener entre 30 y 500 caracteres.'
  }

  if (formData.links.github && !validateUrl(formData.links.github)) {
    errors.github = 'El enlace de GitHub debe ser una URL valida.'
  }

  if (formData.links.linkedin && !validateUrl(formData.links.linkedin)) {
    errors.linkedin = 'El enlace de LinkedIn debe ser una URL valida.'
  }

  if (formData.links.portfolio && !validateUrl(formData.links.portfolio)) {
    errors.portfolio = 'El portafolio debe ser una URL valida.'
  }

  if (formData.profileImage && !validateImageSource(formData.profileImage)) {
    errors.profileImage = 'La imagen de perfil no es valida.'
  }

  return errors
}

function PersonalForm({ initialData }) {
  const { updateSection } = useCV()
  const [formData, setFormData] = useState(() => mergePersonalData(initialData))
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleFieldChange = (event) => {
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

  const handleLinkChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      links: {
        ...currentData.links,
        [name]: value,
      },
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
    setSuccessMessage('')
  }

  const handleAvatarSelect = (avatarUrl) => {
    setFormData((currentData) => ({
      ...currentData,
      profileImage: avatarUrl,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      profileImage: '',
    }))
    setSuccessMessage('')
  }

  const handleProfileImageUpload = async (event) => {
    const [file] = event.target.files

    if (!file) {
      return
    }

    try {
      const profileImage = await imageFileToDataUrl(file, {
        maxWidth: 900,
        maxHeight: 900,
        quality: 0.88,
      })

      setFormData((currentData) => ({
        ...currentData,
        profileImage,
      }))
      setErrors((currentErrors) => ({
        ...currentErrors,
        profileImage: '',
      }))
      setSuccessMessage('')
    } catch (error) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        profileImage: error.message,
      }))
    } finally {
      event.target.value = ''
    }
  }

  const handleRemoveProfileImage = () => {
    setFormData((currentData) => ({
      ...currentData,
      profileImage: '',
    }))
    setErrors((currentErrors) => ({
      ...currentErrors,
      profileImage: '',
    }))
    setSuccessMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = buildErrors(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage('')
      return
    }

    const normalizedData = {
      ...formData,
      name: formData.name.trim(),
      profession: formData.profession.trim(),
      location: formData.location.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      description: formData.description.trim(),
      links: {
        github: formData.links.github.trim(),
        linkedin: formData.links.linkedin.trim(),
        portfolio: formData.links.portfolio.trim(),
      },
      profileImage: formData.profileImage.trim(),
    }

    updateSection('personal', normalizedData)
    setFormData(normalizedData)
    setSuccessMessage('Datos personales guardados correctamente')
  }

  return (
    <section className="content-card personal-editor">
      <div className="section-heading">
        <h2>Datos personales</h2>
        <p>Completa la informacion principal que aparecera en tu CV profesional.</p>
      </div>

      <form className="personal-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="form-field">
            <span>Nombre completo</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFieldChange}
              placeholder="Ej. Raquel Romero Lopez"
            />
            {errors.name ? <small className="form-error">{errors.name}</small> : null}
          </label>

          <label className="form-field">
            <span>Carrera, profesion o area de especialidad</span>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleFieldChange}
              placeholder="Ej. Desarrolladora frontend"
            />
            {errors.profession ? (
              <small className="form-error">{errors.profession}</small>
            ) : null}
          </label>

          <label className="form-field">
            <span>Ciudad o ubicacion general</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleFieldChange}
              placeholder="Ej. Ciudad de Mexico, Mexico"
            />
            {errors.location ? (
              <small className="form-error">{errors.location}</small>
            ) : null}
          </label>

          <label className="form-field">
            <span>Correo electronico</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFieldChange}
              placeholder="correo@ejemplo.com"
            />
            {errors.email ? <small className="form-error">{errors.email}</small> : null}
          </label>

          <label className="form-field">
            <span>Telefono</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFieldChange}
              placeholder="Ej. +52 449 123 4567"
            />
            {errors.phone ? <small className="form-error">{errors.phone}</small> : null}
          </label>

          <label className="form-field form-field-full">
            <span>Descripcion o perfil profesional</span>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleFieldChange}
              placeholder="Resume tu experiencia, fortalezas y objetivos profesionales."
            />
            {errors.description ? (
              <small className="form-error">{errors.description}</small>
            ) : null}
          </label>

          <label className="form-field">
            <span>GitHub</span>
            <input
              type="url"
              name="github"
              value={formData.links.github}
              onChange={handleLinkChange}
              placeholder="https://github.com/usuario"
            />
            {errors.github ? <small className="form-error">{errors.github}</small> : null}
          </label>

          <label className="form-field">
            <span>LinkedIn</span>
            <input
              type="url"
              name="linkedin"
              value={formData.links.linkedin}
              onChange={handleLinkChange}
              placeholder="https://www.linkedin.com/in/usuario"
            />
            {errors.linkedin ? (
              <small className="form-error">{errors.linkedin}</small>
            ) : null}
          </label>

          <label className="form-field">
            <span>Portafolio web</span>
            <input
              type="url"
              name="portfolio"
              value={formData.links.portfolio}
              onChange={handleLinkChange}
              placeholder="https://tuportafolio.com"
            />
            {errors.portfolio ? (
              <small className="form-error">{errors.portfolio}</small>
            ) : null}
          </label>
        </div>

        <div className="avatar-section">
          <div className="section-heading">
            <h3>Imagen de perfil</h3>
            <p>Elige un avatar predeterminado o sube una imagen desde tu computadora.</p>
          </div>

          <div className="avatar-grid" role="list" aria-label="Avatares predeterminados">
            {avatarOptions.map((avatar) => {
              const isSelected = formData.profileImage === avatar.url

              return (
                <button
                  key={avatar.id}
                  type="button"
                  className={`avatar-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect(avatar.url)}
                >
                  <img src={avatar.url} alt={avatar.name} />
                  <span>{avatar.name}</span>
                </button>
              )
            })}
          </div>

          <label className="form-field">
            <span>Subir imagen desde tu computadora</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageUpload}
            />
            {errors.profileImage ? (
              <small className="form-error">{errors.profileImage}</small>
            ) : null}
          </label>

          {formData.profileImage ? (
            <div className="image-preview">
              <img src={formData.profileImage} alt="Vista previa del perfil" />
              <div>
                <p>Vista previa de la imagen seleccionada.</p>
                <button
                  className="button secondary-button"
                  type="button"
                  onClick={handleRemoveProfileImage}
                >
                  Quitar imagen
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="form-actions">
          <button className="button primary-button" type="submit">
            Guardar datos personales
          </button>
          {successMessage ? <p className="form-success">{successMessage}</p> : null}
        </div>
      </form>
    </section>
  )
}

export default PersonalForm
