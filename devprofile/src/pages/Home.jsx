import { Link } from 'react-router-dom'
import { useCV } from '../context/CVContext'

function Home() {
  const { cvData } = useCV()

  return (
    <section className="page hero-section">
      <div className="hero-content">
        <p className="eyebrow">Proyecto final de React</p>
        <h1>DevProfile</h1>
        <h2>Generador Dinámico de CV en PDF</h2>
        <p>
          Captura, modifica, previsualiza y exporta tu información profesional
          en un CV moderno y fácil de mantener.
        </p>
        <Link className="button primary-button" to="/editor">
          Ir al editor
        </Link>

        <div className="stats-grid" aria-label="Resumen temporal del CV">
          <p>Habilidades registradas: {cvData.skills.length}</p>
          <p>Proyectos registrados: {cvData.projects.length}</p>
          <p>Educación registrada: {cvData.education.length}</p>
          <p>Idiomas registrados: {cvData.languages.length}</p>
        </div>
      </div>
    </section>
  )
}

export default Home
