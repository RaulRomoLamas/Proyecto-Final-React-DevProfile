function ProjectCard({ project, onEdit, onDelete }) {
  const handleDelete = () => {
    const shouldDelete = window.confirm(
      `Deseas eliminar el proyecto "${project.name}"?`,
    )

    if (shouldDelete) {
      onDelete(project.id)
    }
  }

  return (
    <article className="project-card">
      {project.imageUrl ? (
        <img
          className="project-image"
          src={project.imageUrl}
          alt={`Captura de ${project.name}`}
        />
      ) : null}

      <div className="project-card-body">
        <div className="project-card-header">
          <div>
            <h3>{project.name}</h3>
            <p className="project-technologies">{project.technologies}</p>
          </div>
        </div>

        <p className="project-description">{project.description}</p>

        <div className="project-links">
          {project.repositoryUrl ? (
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
              Repositorio
            </a>
          ) : null}

          {project.deployUrl ? (
            <a href={project.deployUrl} target="_blank" rel="noreferrer">
              Deploy
            </a>
          ) : null}
        </div>

        <div className="project-card-actions">
          <button className="button secondary-button" type="button" onClick={() => onEdit(project.id)}>
            Editar
          </button>
          <button className="button danger-button" type="button" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
