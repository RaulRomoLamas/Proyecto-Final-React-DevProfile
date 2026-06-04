function SkillCard({ skill, onEdit, onDelete }) {
  const handleDelete = () => {
    const shouldDelete = window.confirm(
      `Deseas eliminar la habilidad "${skill.name}"?`,
    )

    if (shouldDelete) {
      onDelete(skill.id)
    }
  }

  return (
    <article className="skill-card">
      <div className="skill-card-header">
        <div>
          <h3>{skill.name}</h3>
          <p className="skill-category">{skill.category}</p>
        </div>

        <span className="skill-level-badge">{skill.level}%</span>
      </div>

      <div className="skill-level">
        <div className="skill-level-track" aria-hidden="true">
          <div className="skill-level-fill" style={{ width: `${skill.level}%` }} />
        </div>
        <p>Nivel de dominio: {skill.level} de 100</p>
      </div>

      <p className="skill-description">{skill.description}</p>

      <div className="skill-card-actions">
        <button className="button secondary-button" type="button" onClick={() => onEdit(skill.id)}>
          Editar
        </button>
        <button className="button danger-button" type="button" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default SkillCard
