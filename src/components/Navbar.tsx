import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const LOGO = '/AlpineLogo.jpg'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* close mobile menu on route change */
  useEffect(() => setMenuOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      {/* Top gradient accent stripe */}
      <div className={styles.topAccent} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>

        {/* ── Logo ── */}
        <Link
          to="/"
          className={styles.logo}
          aria-label="Alpine Heating and Cooling – Home"
        >
          <img
            src={LOGO}
            alt="Alpine Heating and Cooling"
            className={styles.logoImg}
          />
        </Link>

        {/* ── Desktop nav ── */}
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList} role="list">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Desktop actions ── */}
        <div className={styles.actions}>
          <a
            href="tel:+19252701355"
            className={styles.phoneLink}
            aria-label="Call us at (925) 270-1355"
          >
            <span className={styles.phoneDot} aria-hidden="true" />
            <PhoneIcon />
            <span>(925) 270-1355</span>
          </a>

          <Link to="/booking" className={`${styles.bookBtn}`}>
            <CalendarIcon />
            Book Service
          </Link>
        </div>

        {/* ── Hamburger ── */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <>
          <div
            id="mobile-menu"
            className={styles.mobileMenu}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Logo in mobile menu */}
            <div className={styles.mobileLogoRow}>
              <img src={LOGO} alt="Alpine Heating and Cooling" className={styles.mobileLogo} />
            </div>

            <nav>
              <ul className={styles.mobileNavList} role="list">
                {navLinks.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) =>
                        `${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`
                      }
                    >
                      {label}
                      <ArrowIcon />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.mobileDivider} />

            <div className={styles.mobileActions}>
              <a href="tel:+19252701355" className={styles.mobilePhone}>
                <PhoneIcon />
                <span>(925) 270-1355</span>
                <span className={styles.mobileAvail}>Available 24/7</span>
              </a>
              <Link to="/booking" className={styles.mobileBook}>
                <CalendarIcon />
                Book Service Online
              </Link>
            </div>
          </div>

          <div
            className={styles.backdrop}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        </>
      )}
    </header>
  )
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
    </svg>
  )
}
