import { useState } from 'react'
import PersonalForm from '../components/PersonalForm'
import SkillCard from '../components/SkillCard'
import SkillForm from '../components/SkillForm'
import { useCV } from '../context/CVContext'

function Editor() {
  const { cvData, removeItem } = useCV()
  const [editingSkillId, setEditingSkillId] = useState(null)

  const editingSkill = cvData.skills.find((skill) => skill.id === editingSkillId) ?? null

  const handleEditSkill = (skillId) => {
    setEditingSkillId(skillId)
  }

  const handleDeleteSkill = (skillId) => {
    removeItem('skills', skillId)

    if (editingSkillId === skillId) {
      setEditingSkillId(null)
    }
  }

  const handleFinishEditing = () => {
    setEditingSkillId(null)
  }

  return (
    <section className="page editor-page">
      <header className="content-card editor-hero">
        <h1>Editor del CV</h1>
        <p>
          Aqui puedes capturar y modificar tu informacion profesional para mantener
          tu CV actualizado.
        </p>
      </header>

      <PersonalForm
        key={JSON.stringify(cvData.personal)}
        initialData={cvData.personal}
      />

      <section className="skills-section">
        <div className="content-card skills-hero">
          <div className="section-heading">
            <h2>Habilidades</h2>
            <p>
              Agrega, edita y organiza las habilidades que quieres mostrar en tu CV.
            </p>
          </div>
        </div>

        <SkillForm
          key={editingSkill?.id ?? 'new-skill'}
          editingSkill={editingSkill}
          skills={cvData.skills}
          onFinishEditing={handleFinishEditing}
        />

        <section className="skills-list" aria-label="Lista de habilidades">
          {cvData.skills.length === 0 ? (
            <div className="content-card empty-state">
              <p>Aun no has registrado habilidades.</p>
            </div>
          ) : (
            cvData.skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onEdit={handleEditSkill}
                onDelete={handleDeleteSkill}
              />
            ))
          )}
        </section>
      </section>
    </section>
  )
}

export default Editor
