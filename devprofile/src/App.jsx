import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useCV } from './context/CVContext'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import Home from './pages/Home'
import Preview from './pages/Preview'
import defaultCVData from './utils/defaultCVData'

function App() {
  const { setCvData, clearCV } = useCV()

  const loadDemoData = () => {
    setCvData({
      ...defaultCVData,
      personal: {
        ...defaultCVData.personal,
        name: 'Raul Romo Lamas',
        profession: 'Ingeniería en Sistemas',
        location: 'Aguascalientes',
        links: {
          ...defaultCVData.personal.links,
          github: 'https://github.com',
        },
      },
      skills: [
        { id: 'skill-react', name: 'React' },
        { id: 'skill-node', name: 'Node.js' },
      ],
      projects: [
        {
          id: 'project-devprofile',
          name: 'DevProfile',
          description: 'Generador dinámico de CV en PDF.',
        },
        {
          id: 'project-portfolio',
          name: 'Portafolio web',
          description: 'Sitio personal para mostrar proyectos profesionales.',
        },
      ],
      education: [
        {
          id: 'education-systems',
          institution: 'Universidad',
          degree: 'Ingeniería en Sistemas',
        },
      ],
      languages: [
        { id: 'language-spanish', name: 'Español', level: 'Nativo' },
        { id: 'language-english', name: 'Inglés', level: 'Intermedio' },
      ],
    })
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-layout">
        <div className="demo-actions" aria-label="Acciones temporales de prueba">
          <button className="button primary-button" type="button" onClick={loadDemoData}>
            Cargar datos demo
          </button>
          <button className="button secondary-button" type="button" onClick={clearCV}>
            Limpiar datos
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
