function EducationCard({ educationItem, onEdit, onDelete }) {
  const program = educationItem.program || educationItem.degree || 'Programa sin nombre'

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      `Deseas eliminar el registro "${program}"?`,
    )

    if (shouldDelete) {
      onDelete(educationItem.id)
    }
  }

  return (
    <article className="education-card">
      <div className="education-card-header">
        <div>
          <h3>{program}</h3>
          <p className="education-institution">{educationItem.institution}</p>
        </div>

        <span className="education-period">{educationItem.period}</span>
      </div>

      <p className="education-description">{educationItem.description}</p>

      {educationItem.evidenceUrl ? (
        <div className="education-links">
          <a href={educationItem.evidenceUrl} target="_blank" rel="noreferrer">
            Ver evidencia
          </a>
        </div>
      ) : null}

      <div className="education-card-actions">
        <button
          className="button secondary-button"
          type="button"
          onClick={() => onEdit(educationItem.id)}
        >
          Editar
        </button>
        <button className="button danger-button" type="button" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default EducationCard
