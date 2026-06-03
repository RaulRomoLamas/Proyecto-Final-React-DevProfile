import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/editor', label: 'Editor' },
  { to: '/preview', label: 'Vista previa' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'Acerca de' },
]

function Navbar() {
  return (
    <header className="navbar">
      <NavLink className="navbar-brand" to="/">
        DevProfile
      </NavLink>

      <nav className="navbar-links" aria-label="Navegación principal">
        {links.map((link) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'navbar-link active' : 'navbar-link'
            }
            end={link.to === '/'}
            key={link.to}
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <ThemeToggle />
    </header>
  )
}

export default Navbar
