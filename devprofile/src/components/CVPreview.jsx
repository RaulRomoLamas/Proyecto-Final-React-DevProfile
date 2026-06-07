import { useCV } from '../context/CVContext'

const hasValue = (value) => String(value ?? '').trim().length > 0

function ExternalLink({ href, children }) {
  if (!hasValue(href)) {
    return null
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function CVSection({ title, children }) {
  return (
    <section className="cv-preview-section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function CVPreview() {
  const { cvData } = useCV()
  const personal = cvData.personal ?? {}
  const links = personal.links ?? {}
  const skills = Array.isArray(cvData.skills) ? cvData.skills : []
  const projects = Array.isArray(cvData.projects) ? cvData.projects : []
  const education = Array.isArray(cvData.education) ? cvData.education : []
  const languages = Array.isArray(cvData.languages) ? cvData.languages : []

  return (
    <article className="cv-preview-sheet" aria-label="Vista previa del CV">
      <header className="cv-preview-header">
        {personal.profileImage ? (
          <img
            className="cv-preview-avatar"
            src={personal.profileImage}
            alt={`Foto de perfil de ${personal.name}`}
          />
        ) : null}

        <div className="cv-preview-intro">
          <h1>{personal.name}</h1>
          <p className="cv-preview-profession">{personal.profession}</p>

          <div className="cv-preview-contact">
            {personal.location ? <span>{personal.location}</span> : null}
            {personal.email ? <a href={`mailto:${personal.email}`}>{personal.email}</a> : null}
            {personal.phone ? <span>{personal.phone}</span> : null}
          </div>

          {personal.description ? (
            <p className="cv-preview-profile">{personal.description}</p>
          ) : null}

          <div className="cv-preview-links">
            <ExternalLink href={links.github}>GitHub</ExternalLink>
            <ExternalLink href={links.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink href={links.portfolio}>Portafolio</ExternalLink>
          </div>
        </div>
      </header>

      {skills.length > 0 ? (
        <CVSection title="Habilidades">
          <div className="cv-preview-grid">
            {skills.map((skill) => {
              const level = Math.min(100, Math.max(0, Number(skill.level) || 0))

              return (
                <article className="cv-preview-item" key={skill.id}>
                  <div className="cv-preview-item-header">
                    <h3>{skill.name}</h3>
                    <span>{level}/100</span>
                  </div>
                  {skill.category ? <p className="cv-preview-tag">{skill.category}</p> : null}
                  {skill.description ? <p>{skill.description}</p> : null}
                  <div className="cv-preview-level-track" aria-hidden="true">
                    <div
                      className="cv-preview-level-fill"
                      style={{ width: `${level}%` }}
                    />
                  </div>
                </article>
              )
            })}
          </div>
        </CVSection>
      ) : null}

      {projects.length > 0 ? (
        <CVSection title="Proyectos">
          <div className="cv-preview-grid">
            {projects.map((project) => (
              <article className="cv-preview-item cv-preview-project" key={project.id}>
                {project.imageUrl ? (
                  <img
                    className="cv-preview-project-image"
                    src={project.imageUrl}
                    alt={`Captura del proyecto ${project.name}`}
                  />
                ) : null}
                <h3>{project.name}</h3>
                {project.technologies ? (
                  <p className="cv-preview-tag">{project.technologies}</p>
                ) : null}
                {project.description ? <p>{project.description}</p> : null}
                <div className="cv-preview-links">
                  <ExternalLink href={project.repositoryUrl}>Repositorio</ExternalLink>
                  <ExternalLink href={project.deployUrl}>Deploy</ExternalLink>
                </div>
              </article>
            ))}
          </div>
        </CVSection>
      ) : null}

      {education.length > 0 ? (
        <CVSection title="Educación, cursos y certificaciones">
          <div className="cv-preview-stack">
            {education.map((educationItem) => {
              const program = educationItem.program || educationItem.degree

              return (
                <article className="cv-preview-item" key={educationItem.id}>
                  <div className="cv-preview-item-header">
                    <h3>{program}</h3>
                    {educationItem.period ? <span>{educationItem.period}</span> : null}
                  </div>
                  {educationItem.institution ? (
                    <p className="cv-preview-tag">{educationItem.institution}</p>
                  ) : null}
                  {educationItem.description ? <p>{educationItem.description}</p> : null}
                  <div className="cv-preview-links">
                    <ExternalLink href={educationItem.evidenceUrl}>Evidencia</ExternalLink>
                  </div>
                </article>
              )
            })}
          </div>
        </CVSection>
      ) : null}

      {languages.length > 0 ? (
        <CVSection title="Idiomas">
          <div className="cv-preview-grid compact">
            {languages.map((language) => (
              <article className="cv-preview-item" key={language.id}>
                <div className="cv-preview-item-header">
                  <h3>{language.name}</h3>
                  <span>{language.level}</span>
                </div>
                {language.description ? <p>{language.description}</p> : null}
              </article>
            ))}
          </div>
        </CVSection>
      ) : null}
    </article>
  )
}

export default CVPreview
