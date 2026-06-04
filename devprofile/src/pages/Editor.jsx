import PersonalForm from '../components/PersonalForm'
import { useCV } from '../context/CVContext'

function Editor() {
  const { cvData } = useCV()

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
    </section>
  )
}

export default Editor
