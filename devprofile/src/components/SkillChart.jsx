import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useCV } from '../context/CVContext'

const normalizeLevel = (level) => {
  const parsedLevel = Number(level)

  if (Number.isNaN(parsedLevel)) {
    return 0
  }

  return Math.min(100, Math.max(0, parsedLevel))
}

function SkillChart() {
  const { cvData } = useCV()
  const skills = Array.isArray(cvData.skills) ? cvData.skills : []
  const chartData = skills.map((skill) => ({
    name: skill.name || 'Sin nombre',
    level: normalizeLevel(skill.level),
    category: skill.category || 'Sin categoria',
  }))
  const chartWidth = Math.max(640, chartData.length * 110)

  return (
    <section className="skill-chart-card" aria-label="Grafica de habilidades">
      <div className="skill-chart-header">
        <h2>Nivel de dominio por habilidad</h2>
        <p>Escala de 1 a 100</p>
      </div>

      <div className="skill-chart-scroll">
        <div className="skill-chart-inner" style={{ width: `${chartWidth}px` }}>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={chartData}
              margin={{ top: 16, right: 24, left: 0, bottom: 56 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                angle={-35}
                height={80}
                interval={0}
                textAnchor="end"
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis
                allowDecimals={false}
                domain={[0, 100]}
                tickCount={6}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => [`${value} de 100`, 'Nivel']}
                labelFormatter={(label) => `Habilidad: ${label}`}
              />
              <Bar dataKey="level" fill="#edc85b" name="Nivel" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default SkillChart
