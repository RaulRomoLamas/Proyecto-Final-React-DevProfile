import { useState } from 'react'
import EducationCard from '../components/EducationCard'
import EducationForm from '../components/EducationForm'
import LanguageCard from '../components/LanguageCard'
import LanguageForm from '../components/LanguageForm'
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
  const education = Array.isArray(cvData.education) ? cvData.education : []
  const languages = Array.isArray(cvData.languages) ? cvData.languages : []
  const [editingSkillId, setEditingSkillId] = useState(null)
  const [editingProjectId, setEditingProjectId] = useState(null)
  const [editingEducationId, setEditingEducationId] = useState(null)
  const [editingLanguageId, setEditingLanguageId] = useState(null)

  const editingSkill = skills.find((skill) => skill.id === editingSkillId) ?? null
  const editingProject =
    projects.find((project) => project.id === editingProjectId) ?? null
  const editingEducation =
    education.find((educationItem) => educationItem.id === editingEducationId) ?? null
  const editingLanguage =
    languages.find((language) => language.id === editingLanguageId) ?? null

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

  const handleEditEducation = (educationId) => {
    setEditingEducationId(educationId)
  }

  const handleDeleteEducation = (educationId) => {
    removeItem('education', educationId)

    if (editingEducationId === educationId) {
      setEditingEducationId(null)
    }
  }

  const handleFinishEducationEditing = () => {
    setEditingEducationId(null)
  }

  const handleEditLanguage = (languageId) => {
    setEditingLanguageId(languageId)
  }

  const handleDeleteLanguage = (languageId) => {
    removeItem('languages', languageId)

    if (editingLanguageId === languageId) {
      setEditingLanguageId(null)
    }
  }

  const handleFinishLanguageEditing = () => {
    setEditingLanguageId(null)
  }

  return (
    <section className="page editor-page">
      <header className="content-card editor-hero">
        <h1>Editor del CV</h1>
        <p>
          Aquí puedes capturar y modificar tu información profesional para mantener
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
              <p>Aún no has registrado habilidades.</p>
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

      <section className="education-section">
        <div className="content-card education-hero">
          <div className="section-heading">
            <h2>Educación, cursos y certificaciones</h2>
            <p>
              Agrega estudios, cursos o certificaciones que refuercen tu perfil.
            </p>
          </div>
        </div>

        <EducationForm
          key={editingEducation?.id ?? 'new-education'}
          editingEducation={editingEducation}
          education={education}
          onFinishEditing={handleFinishEducationEditing}
        />

        <section className="education-list" aria-label="Lista de educación">
          {education.length === 0 ? (
            <div className="content-card empty-state">
              <p>Aún no has registrado educación, cursos o certificaciones.</p>
            </div>
          ) : (
            education.map((educationItem) => (
              <EducationCard
                key={educationItem.id}
                educationItem={educationItem}
                onEdit={handleEditEducation}
                onDelete={handleDeleteEducation}
              />
            ))
          )}
        </section>
      </section>

      <section className="languages-section">
        <div className="content-card languages-hero">
          <div className="section-heading">
            <h2>Idiomas</h2>
            <p>Agrega los idiomas que dominas y el nivel correspondiente.</p>
          </div>
        </div>

        <LanguageForm
          key={editingLanguage?.id ?? 'new-language'}
          editingLanguage={editingLanguage}
          languages={languages}
          onFinishEditing={handleFinishLanguageEditing}
        />

        <section className="languages-list" aria-label="Lista de idiomas">
          {languages.length === 0 ? (
            <div className="content-card empty-state">
              <p>Aún no has registrado idiomas.</p>
            </div>
          ) : (
            languages.map((language) => (
              <LanguageCard
                key={language.id}
                language={language}
                onEdit={handleEditLanguage}
                onDelete={handleDeleteLanguage}
              />
            ))
          )}
        </section>
      </section>
    </section>
  )
}

export default Editor
