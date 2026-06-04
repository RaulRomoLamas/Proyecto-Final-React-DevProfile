/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import defaultCVData from '../utils/defaultCVData'

const CVContext = createContext(null)

const storageKey = 'devprofile_cv'

const cloneDefaultCVData = () => structuredClone(defaultCVData)

const ensureArraySection = (currentSection) => {
  return Array.isArray(currentSection) ? currentSection : []
}

const createItemId = () => {
  if (crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function CVProvider({ children }) {
  const [cvData, setCvData] = useLocalStorage(storageKey, defaultCVData)

  const updateSection = useCallback((section, data) => {
    setCvData((currentData) => ({
      ...currentData,
      [section]: data,
    }))
  }, [setCvData])

  const addItem = useCallback((section, item) => {
    setCvData((currentData) => ({
      ...currentData,
      [section]: [
        ...ensureArraySection(currentData[section]),
        {
          id: item.id ?? createItemId(),
          ...item,
        },
      ],
    }))
  }, [setCvData])

  const updateItem = useCallback((section, id, data) => {
    setCvData((currentData) => ({
      ...currentData,
      [section]: ensureArraySection(currentData[section]).map((item) =>
        item.id === id ? { ...item, ...data } : item,
      ),
    }))
  }, [setCvData])

  const removeItem = useCallback((section, id) => {
    setCvData((currentData) => ({
      ...currentData,
      [section]: ensureArraySection(currentData[section]).filter(
        (item) => item.id !== id,
      ),
    }))
  }, [setCvData])

  const clearCV = useCallback(() => {
    setCvData(cloneDefaultCVData())
  }, [setCvData])

  const value = useMemo(
    () => ({
      cvData,
      setCvData,
      updateSection,
      addItem,
      updateItem,
      removeItem,
      clearCV,
    }),
    [addItem, clearCV, cvData, removeItem, setCvData, updateItem, updateSection],
  )

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>
}

export function useCV() {
  const context = useContext(CVContext)

  if (!context) {
    throw new Error('useCV debe usarse dentro de CVProvider')
  }

  return context
}
