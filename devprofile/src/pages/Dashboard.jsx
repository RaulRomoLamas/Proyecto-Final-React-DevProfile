import { Link } from 'react-router-dom'
import SkillChart from '../components/SkillChart'
import { useCV } from '../context/CVContext'

const getTopCategory = (skills) => {
  const categoryCounts = skills.reduce((counts, skill) => {
    const category = skill.category || 'Sin categoria'

    return {
      ...counts,
      [category]: (counts[category] ?? 0) + 1,
    }
  }, {})

  const [topCategory] = Object.entries(categoryCounts).reduce(
    (currentTop, categoryEntry) => {
      if (categoryEntry[1] > currentTop[1]) {
        return categoryEntry
      }

      return currentTop
    },
    ['Sin categoria', 0],
  )

  return topCategory
}

const getHighestSkill = (skills) => {
  return skills.reduce((highestSkill, skill) => {
    const skillLevel = Number(skill.level) || 0
    const highestLevel = Number(highestSkill.level) || 0

    return skillLevel > highestLevel ? skill : highestSkill
  }, skills[0])
}

function Dashboard() {
  const { cvData } = useCV()
  const skills = Array.isArray(cvData.skills) ? cvData.skills : []
  const totalSkills = skills.length
  const averageLevel =
    totalSkills > 0
      ? Math.round(
          skills.reduce((total, skill) => total + (Number(skill.level) || 0), 0) /
            totalSkills,
        )
      : 0
  const topCategory = totalSkills > 0 ? getTopCategory(skills) : 'Sin datos'
  const highestSkill = totalSkills > 0 ? getHighestSkill(skills) : null
  const highestLevel = highestSkill ? Number(highestSkill.level) || 0 : 0

  return (
    <section className="page dashboard-page">
      <header className="content-card dashboard-header">
        <h1>Dashboard de habilidades</h1>
        <p>Visualización dinámica de las habilidades registradas.</p>
      </header>

      {totalSkills === 0 ? (
        <section className="content-card dashboard-empty-state">
          <p>
            Aún no hay habilidades registradas. Agrega habilidades desde el editor para
            visualizar la gráfica.
          </p>
          <Link className="button primary-button" to="/editor">
            Ir al editor
          </Link>
        </section>
      ) : (
        <>
          <section className="dashboard-summary" aria-label="Resumen de habilidades">
            <article className="summary-card">
              <span>Total de habilidades</span>
              <strong>{totalSkills}</strong>
            </article>

            <article className="summary-card">
              <span>Promedio de nivel</span>
              <strong>{averageLevel}</strong>
            </article>

            <article className="summary-card">
              <span>Categoría con más habilidades</span>
              <strong>{topCategory}</strong>
            </article>

            <article className="summary-card">
              <span>Nivel más alto registrado</span>
              <strong>{highestLevel}</strong>
              <small>{highestSkill?.name}</small>
            </article>
          </section>

          <SkillChart />
        </>
      )}
    </section>
  )
}

export default Dashboard
