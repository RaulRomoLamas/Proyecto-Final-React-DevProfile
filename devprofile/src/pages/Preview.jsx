import { useState } from 'react'
import { Link } from 'react-router-dom'
import CVPreview from '../components/CVPreview'
import { useCV } from '../context/CVContext'
import { generatePDF } from '../utils/pdfGenerator'

const hasValue = (value) => String(value ?? '').trim().length > 0

function Preview() {
  const { cvData } = useCV()
  const [isGenerating, setIsGenerating] = useState(false)
  const [pdfError, setPdfError] = useState('')
  const personal = cvData.personal ?? {}
  const hasMinimumData =
    hasValue(personal.name) && hasValue(personal.profession) && hasValue(personal.email)

  const handleExportPDF = async () => {
    setIsGenerating(true)
    setPdfError('')

    try {
      await generatePDF(cvData)
    } catch {
      setPdfError('No se pudo generar el PDF. Revisa los datos e intenta de nuevo.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section className="page preview-page">
      <header className="content-card preview-header">
        <div>
          <h1>Previsualización del CV</h1>
          <p>Revisa la información capturada antes de exportar el CV a PDF.</p>
        </div>

        <div className="preview-actions">
          <Link className="button secondary-button" to="/editor">
            Ir al editor
          </Link>
          <button
            className="button primary-button"
            type="button"
            onClick={handleExportPDF}
            disabled={!hasMinimumData || isGenerating}
          >
            {isGenerating ? 'Generando PDF...' : 'Exportar a PDF'}
          </button>
        </div>
        {pdfError ? <p className="form-error preview-error">{pdfError}</p> : null}
      </header>

      {hasMinimumData ? (
        <CVPreview />
      ) : (
        <section className="content-card preview-empty-state">
          <p>
            Aún no hay información suficiente para mostrar el CV. Captura tus datos en
            el editor.
          </p>
          <Link className="button primary-button" to="/editor">
            Ir al editor
          </Link>
        </section>
      )}
    </section>
  )
}

export default Preview
