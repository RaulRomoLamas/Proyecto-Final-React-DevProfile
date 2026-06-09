import { pdf } from '@react-pdf/renderer'
import { createElement } from 'react'
import PDFDocument from '../components/PDFDocument'

const defaultFileName = 'DevProfile_CV.pdf'
const imageCache = new Map()

const hasValue = (value) => String(value ?? '').trim().length > 0

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

function readBlobAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = url
  })
}

function getSvgSize(svgText) {
  const parser = new DOMParser()
  const svgElement = parser.parseFromString(svgText, 'image/svg+xml').documentElement
  const width = Number.parseFloat(svgElement.getAttribute('width'))
  const height = Number.parseFloat(svgElement.getAttribute('height'))
  const viewBox = svgElement.getAttribute('viewBox')?.split(/\s+/).map(Number)

  if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
    return { width, height }
  }

  if (viewBox?.length === 4 && viewBox[2] > 0 && viewBox[3] > 0) {
    return { width: viewBox[2], height: viewBox[3] }
  }

  return { width: 512, height: 512 }
}

async function convertSvgTextToPngDataUrl(svgText) {
  const { width, height } = getSvgSize(svgText)
  const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
  const svgUrl = URL.createObjectURL(svgBlob)

  try {
    const image = await loadImage(svgUrl)
    const canvas = document.createElement('canvas')
    const maxSize = 1200
    const scale = Math.min(1, maxSize / Math.max(width, height))

    canvas.width = Math.max(1, Math.round(width * scale))
    canvas.height = Math.max(1, Math.round(height * scale))
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)

    return canvas.toDataURL('image/png')
  } finally {
    URL.revokeObjectURL(svgUrl)
  }
}

async function convertImageUrlToDataUrl(imageUrl) {
  if (!hasValue(imageUrl) || imageUrl.startsWith('data:')) {
    return imageUrl
  }

  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl)
  }

  const convertedImage = fetch(imageUrl)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`No se pudo cargar la imagen: ${imageUrl}`)
      }

      const contentType = response.headers.get('content-type') ?? ''

      if (contentType.includes('svg') || imageUrl.toLowerCase().includes('.svg')) {
        return convertSvgTextToPngDataUrl(await response.text())
      }

      return readBlobAsDataUrl(await response.blob())
    })
    .catch(() => '')

  imageCache.set(imageUrl, convertedImage)
  return convertedImage
}

async function prepareCVDataForPDF(cvData) {
  const projects = Array.isArray(cvData.projects) ? cvData.projects : []
  const personal = cvData.personal ?? {}

  return {
    ...cvData,
    personal: {
      ...personal,
      profileImage: await convertImageUrlToDataUrl(personal.profileImage),
    },
    projects: await Promise.all(
      projects.map(async (project) => ({
        ...project,
        imageUrl: await convertImageUrlToDataUrl(project.imageUrl),
      })),
    ),
  }
}

export async function generatePDF(cvData, fileName = defaultFileName) {
  const preparedCVData = await prepareCVDataForPDF(cvData)
  const documentElement = createElement(PDFDocument, { cvData: preparedCVData })
  const blob = await pdf(documentElement).toBlob()

  downloadBlob(blob, fileName)
}
