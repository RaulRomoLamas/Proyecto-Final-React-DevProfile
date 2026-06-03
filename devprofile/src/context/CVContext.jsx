import { createContext, useMemo, useState } from 'react'

const CVContext = createContext(null)

const initialCVData = {
  personalInfo: {},
  experience: [],
  education: [],
  skills: [],
}

export function CVProvider({ children }) {
  const [cvData, setCVData] = useState(initialCVData)

  const value = useMemo(
    () => ({
      cvData,
      setCVData,
    }),
    [cvData],
  )

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>
}
