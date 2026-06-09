import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import Home from './pages/Home'
import Preview from './pages/Preview'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-layout">
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
