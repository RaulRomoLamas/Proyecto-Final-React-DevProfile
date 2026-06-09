const maxFileSize = 5 * 1024 * 1024

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

function getScaledSize(width, height, maxWidth, maxHeight) {
  const scale = Math.min(1, maxWidth / width, maxHeight / height)

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  }
}

export async function imageFileToDataUrl(file, options = {}) {
  const {
    maxWidth = 1200,
    maxHeight = 900,
    quality = 0.86,
  } = options

  if (!file) {
    return ''
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Selecciona un archivo de imagen válido.')
  }

  if (file.size > maxFileSize) {
    throw new Error('La imagen no debe superar 5 MB.')
  }

  const originalDataUrl = await readFileAsDataUrl(file)

  if (file.type === 'image/svg+xml') {
    return originalDataUrl
  }

  const image = await loadImage(originalDataUrl)
  const canvas = document.createElement('canvas')
  const size = getScaledSize(image.width, image.height, maxWidth, maxHeight)

  canvas.width = size.width
  canvas.height = size.height
  canvas.getContext('2d').drawImage(image, 0, 0, size.width, size.height)

  return canvas.toDataURL('image/jpeg', quality)
}
