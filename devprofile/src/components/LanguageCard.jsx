function LanguageCard({ language, onEdit, onDelete }) {
  const handleDelete = () => {
    const shouldDelete = window.confirm(
      `Deseas eliminar el idioma "${language.name}"?`,
    )

    if (shouldDelete) {
      onDelete(language.id)
    }
  }

  return (
    <article className="language-card">
      <div className="language-card-header">
        <div>
          <h3>{language.name}</h3>
          <p className="language-level">{language.level}</p>
        </div>
      </div>

      {language.description ? (
        <p className="language-description">{language.description}</p>
      ) : null}

      <div className="language-card-actions">
        <button
          className="button secondary-button"
          type="button"
          onClick={() => onEdit(language.id)}
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

export default LanguageCard
