import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CVProvider } from './context/CVContext.jsx'
import './styles/global.css'
import './styles/dark-mode.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CVProvider>
      <App />
    </CVProvider>
  </StrictMode>,
)
