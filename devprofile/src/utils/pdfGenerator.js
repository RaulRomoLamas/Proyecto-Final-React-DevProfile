import { pdf } from '@react-pdf/renderer'
import { createElement } from 'react'
import PDFDocument from '../components/PDFDocument'

const defaultFileName = 'DevProfile_CV.pdf'

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function generatePDF(cvData, fileName = defaultFileName) {
  const documentElement = createElement(PDFDocument, { cvData })
  const blob = await pdf(documentElement).toBlob()

  downloadBlob(blob, fileName)
}
