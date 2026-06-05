import { useState } from 'react'
import PersonalForm from '../components/PersonalForm'
import ProjectCard from '../components/ProjectCard'
import ProjectForm from '../components/ProjectForm'
import SkillCard from '../components/SkillCard'
import SkillForm from '../components/SkillForm'
import { useCV } from '../context/CVContext'

function Editor() {
  const { cvData, removeItem } = useCV()
  const skills = Array.isArray(cvData.skills) ? cvData.skills : []
  const projects = Array.isArray(cvData.projects) ? cvData.projects : []
  const [editingSkillId, setEditingSkillId] = useState(null)
  const [editingProjectId, setEditingProjectId] = useState(null)

  const editingSkill = skills.find((skill) => skill.id === editingSkillId) ?? null
  const editingProject =
    projects.find((project) => project.id === editingProjectId) ?? null

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

  const handleEditProject = (projectId) => {
    setEditingProjectId(projectId)
  }

  const handleDeleteProject = (projectId) => {
    removeItem('projects', projectId)

    if (editingProjectId === projectId) {
      setEditingProjectId(null)
    }
  }

  const handleFinishProjectEditing = () => {
    setEditingProjectId(null)
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
          skills={skills}
          onFinishEditing={handleFinishEditing}
        />

        <section className="skills-list" aria-label="Lista de habilidades">
          {skills.length === 0 ? (
            <div className="content-card empty-state">
              <p>Aun no has registrado habilidades.</p>
            </div>
          ) : (
            skills.map((skill) => (
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

      <section className="projects-section">
        <div className="content-card projects-hero">
          <div className="section-heading">
            <h2>Proyectos</h2>
            <p>
              Agrega, edita y organiza los proyectos que quieres incluir en tu CV.
            </p>
          </div>
        </div>

        <ProjectForm
          key={editingProject?.id ?? 'new-project'}
          editingProject={editingProject}
          projects={projects}
          onFinishEditing={handleFinishProjectEditing}
        />

        <section className="projects-list" aria-label="Lista de proyectos">
          {projects.length === 0 ? (
            <div className="content-card empty-state">
              <p>Aun no has registrado proyectos.</p>
            </div>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            ))
          )}
        </section>
      </section>
    </section>
  )
}

export default Editor
