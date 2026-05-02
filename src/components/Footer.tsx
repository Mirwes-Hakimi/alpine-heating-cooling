import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const LOGO = '/AlpineLogo.jpg'

const serviceAreas = [
  // Peninsula & South Bay
  'San Jose', 'Palo Alto', 'Sunnyvale', 'Santa Clara',
  'Mountain View', 'Milpitas', 'Fremont',
  // Oakland / Inner East Bay
  'Oakland', 'Berkeley', 'Hayward', 'San Leandro',
  // East Bay corridor — Brentwood to Martinez
  'Pittsburg', 'Antioch', 'Brentwood', 'Concord',
  'Martinez', 'Walnut Creek', 'Pleasant Hill',
  // Tri-Valley
  'Livermore', 'Pleasanton', 'Dublin', 'San Ramon', 'Danville',
  // SF & Peninsula
  'San Francisco', 'Santa Cruz',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand column */}
            <div className={styles.brand}>
              <Link to="/" className={styles.logoLink} aria-label="Alpine Heating and Cooling – Home">
                <img src={LOGO} alt="Alpine Heating and Cooling" className={styles.logoImg} />
                <div>
                  <div className={styles.logoName}>Alpine</div>
                  <div className={styles.logoSub}>Heating &amp; Cooling</div>
                </div>
              </Link>
              <p className={styles.tagline}>
                Professional HVAC services trusted by thousands of Bay Area homeowners since 2009.
              </p>
              <div className={styles.social}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialLink}>
                  <FacebookIcon />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
                  <InstagramIcon />
                </a>
                <a href="https://yelp.com" target="_blank" rel="noopener noreferrer" aria-label="Yelp" className={styles.socialLink}>
                  <YelpIcon />
                </a>
                <a href="https://google.com" target="_blank" rel="noopener noreferrer" aria-label="Google" className={styles.socialLink}>
                  <GoogleIcon />
                </a>
              </div>
            </div>

            {/* Services column */}
            <div className={styles.col}>
              <h3 className={styles.colTitle}>Our Services</h3>
              <ul className={styles.colList}>
                <li><Link to="/services#ac-services">AC Installation &amp; Repair</Link></li>
                <li><Link to="/services#heating">Furnace Installation &amp; Repair</Link></li>
                <li><Link to="/services#maintenance">HVAC Maintenance</Link></li>
                <li><Link to="/services#emergency">Emergency Services</Link></li>
                <li><Link to="/services#ventilation">Ventilation &amp; Air Quality</Link></li>
                <li><Link to="/booking">Schedule Service</Link></li>
              </ul>
            </div>

            {/* Company column */}
            <div className={styles.col}>
              <h3 className={styles.colTitle}>Company</h3>
              <ul className={styles.colList}>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/blog">Blog &amp; Tips</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/booking">Book Appointment</Link></li>
                <li><a href="#areas">Service Areas</a></li>
              </ul>
            </div>

            {/* Contact column */}
            <div className={styles.col}>
              <h3 className={styles.colTitle}>Contact Us</h3>
              <ul className={styles.contactList}>
                <li>
                  <PinIcon />
                  <span>485 Railroad Ave<br />Pittsburg, CA 94565</span>
                </li>
                <li>
                  <PhoneIcon />
                  <a href="tel:+16505487823">(650) 548-7823</a>
                </li>
                <li>
                  <EmailIcon />
                  <a href="mailto:info@alpinehvacbay.com">info@alpinehvacbay.com</a>
                </li>
                <li>
                  <ClockIcon />
                  <span>Mon–Fri: 8am–6pm<br />Sat: 9am–4pm<br />Sun: Emergency only</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Service areas */}
          <div className={styles.areas} id="areas">
            <h3 className={styles.areasTitle}>Service Areas</h3>
            <div className={styles.areasList}>
              {serviceAreas.map((city) => (
                <span key={city} className={styles.areaChip}>{city}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              &copy; {year} Alpine Heating and Cooling. All rights reserved.
            </p>
            <div className={styles.badges}>
              <span className={styles.badge}>
                <ShieldIcon />
                Licensed &amp; Insured
              </span>
              <span className={styles.badge}>
                <StarIcon />
                4.9 ★ Rating
              </span>
              <span className={styles.badge}>
                <BoltIcon />
                24/7 Emergency
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
    </svg>
  )
}

function YelpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M21.111 18.226c-.141.969-2.119 3.483-3.029 3.847-.311.124-.611.094-.85-.09l-3.184-2.41a.44.44 0 0 0-.438-.057.444.444 0 0 0-.27.381l-.098 1.566c-.063.996-1.547 1.64-2.509 1.537-2.032-.218-4.786-1.963-5.812-3.837-.312-.572-.222-1.187.232-1.531l3.12-2.304a.444.444 0 0 0 .065-.619.443.443 0 0 0-.435-.153l-1.54.288c-.982.181-2.038-.776-2.077-1.769-.08-2.085 1.142-5.19 2.779-6.611.499-.432 1.079-.472 1.558-.104l3.008 2.304a.44.44 0 0 0 .437.057.444.444 0 0 0 .271-.381l.025-3.966c.016-.996 1.078-1.76 2.04-1.537 2.003.469 4.786 2.476 5.637 4.443.254.581.093 1.177-.393 1.475l-3.184 1.919a.441.441 0 0 0-.152.604.44.44 0 0 0 .507.173l3.784-1.288c.937-.316 2.053.532 2.053 1.534.001 2.069-.944 4.863-1.745 6.328z"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
      <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
    </svg>
  )
}
