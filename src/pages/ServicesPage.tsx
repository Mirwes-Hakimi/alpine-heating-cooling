import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './ServicesPage.module.css'

const services = [
  {
    id: 'ac-services',
    icon: <SnowflakeIcon size={40} />,
    accent: 'cool',
    badge: 'Cooling',
    title: 'AC Installation & Repair',
    subtitle: 'Keep your home comfortable year-round with Bay Area\'s most trusted AC team.',
    desc: 'Whether you need a new system installed or your current AC is acting up, Alpine\'s certified technicians handle it all. We service every major brand including Carrier, Trane, Lennox, Daikin, and Rheem.',
    features: [
      'Central AC installation & replacement',
      'Mini-split / ductless system installation',
      'AC repair — all makes & models',
      'Refrigerant recharge & leak detection',
      'Capacitor, compressor & coil repair',
      'Thermostat installation & smart upgrades',
      'Post-install efficiency testing',
    ],
    cta: 'Book AC Service',
  },
  {
    id: 'heating',
    icon: <FlameIcon size={40} />,
    accent: 'warm',
    badge: 'Heating',
    title: 'Furnace & Heating',
    subtitle: 'Bay Area nights get cold. Trust Alpine to keep your heating system dependable.',
    desc: 'Alpine installs, repairs, and maintains gas furnaces, heat pumps, and electric heating systems throughout the Bay Area. Our technicians are factory-trained on the latest high-efficiency models.',
    features: [
      'Gas furnace installation & replacement',
      'Heat pump installation & repair',
      'Forced-air & electric heating systems',
      'Heat exchanger inspection & repair',
      'Gas line connection & safety check',
      'Pilot light & ignition repair',
      'Carbon monoxide safety testing',
    ],
    cta: 'Book Heating Service',
  },
  {
    id: 'maintenance',
    icon: <ShieldIcon size={40} />,
    accent: 'success',
    badge: 'Maintenance',
    title: 'HVAC Maintenance Plans',
    subtitle: 'Prevent breakdowns before they happen with a scheduled tune-up plan.',
    desc: 'Regular maintenance extends system life by 30–50%, improves efficiency by up to 15%, and keeps your warranty valid. Alpine\'s plans are flexible and affordable, with no surprise fees.',
    features: [
      '20-point system inspection',
      'Filter replacement (we supply the filter)',
      'Coil cleaning — indoor & outdoor',
      'Drain line flush',
      'Refrigerant level check',
      'Electrical connection tightening',
      'Priority scheduling for plan members',
    ],
    cta: 'View Maintenance Plans',
  },
  {
    id: 'emergency',
    icon: <BoltIcon size={40} />,
    accent: 'danger',
    badge: '24/7 Emergency',
    title: 'Emergency HVAC Service',
    subtitle: 'HVAC failures don\'t wait for business hours — and neither do we.',
    desc: 'Our emergency line is staffed around the clock, 365 days a year. We aim to have a technician at your door within 2 hours of your call, any time of day or night.',
    features: [
      'Available every day, including holidays',
      'Typically on-site within 2 hours',
      'Fully stocked service vans',
      'No extra charge for evenings (before 10pm)',
      'After-hours surcharge disclosed upfront',
      'Priority for existing maintenance customers',
      'All work warrantied',
    ],
    cta: 'Call Emergency Line',
  },
  {
    id: 'ventilation',
    icon: <WindIcon size={40} />,
    accent: 'primary',
    badge: 'Air Quality',
    title: 'Ventilation & Indoor Air Quality',
    subtitle: 'Breathe cleaner air at home with Alpine\'s air quality solutions.',
    desc: 'Poor indoor air quality causes allergies, fatigue, and respiratory issues. Alpine improves your home\'s air through proper ventilation, filtration, and humidity control.',
    features: [
      'Whole-home air purifiers',
      'UV germicidal light installation',
      'HEPA filtration upgrade',
      'Humidifier & dehumidifier systems',
      'ERV / HRV ventilation systems',
      'Duct sealing & insulation',
      'Air quality testing',
    ],
    cta: 'Improve My Air Quality',
  },
]

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'HVAC Services – Alpine Heating and Cooling'
  }, [])

  return (
    <>
      {/* Page header */}
      <section className={styles.pageHeader} aria-label="Services page header">
        <div className={styles.pageHeaderBlob} aria-hidden="true" />
        <div className="container">
          <span className="section-label">Our Services</span>
          <h1 className={styles.pageTitle}>Complete HVAC Solutions<br />for Bay Area Homes</h1>
          <p className={styles.pageSubtitle}>
            From installation to emergency repair, Alpine handles every aspect of your home comfort system.
            Licensed, insured, and backed by 15+ years of Bay Area HVAC experience.
          </p>
          <div className={styles.pageActions}>
            <a href="tel:+16505487823" className="btn btn-primary btn-lg">
              <PhoneIcon />
              Call (650) 548-7823
            </a>
            <Link to="/booking" className="btn btn-secondary btn-lg">
              Book Online
            </Link>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="section" aria-label="Service details">
        <div className="container">
          <div className={styles.servicesStack}>
            {services.map((service, i) => (
              <article
                key={service.id}
                id={service.id}
                className={`${styles.serviceBlock} ${i % 2 === 1 ? styles.reverse : ''}`}
                aria-labelledby={`${service.id}-title`}
              >
                <div className={`${styles.serviceVisual} ${styles[`accent_${service.accent}`]}`}>
                  <div className={styles.serviceIconWrap}>{service.icon}</div>
                  <div className={styles.serviceAccentText}>{service.badge}</div>
                </div>

                <div className={styles.serviceContent}>
                  <span className={`badge ${getBadgeClass(service.accent)}`}>{service.badge}</span>
                  <h2 className={styles.serviceTitle} id={`${service.id}-title`}>{service.title}</h2>
                  <p className={styles.serviceSubtitle}>{service.subtitle}</p>
                  <p className={styles.serviceDesc}>{service.desc}</p>

                  <ul className={styles.featureList} aria-label="Included services">
                    {service.features.map((f) => (
                      <li key={f}>
                        <CheckIcon />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.serviceCtas}>
                    <Link to="/booking" className="btn btn-primary">
                      {service.cta}
                    </Link>
                    {service.id === 'emergency' ? (
                      <a href="tel:+16505487823" className="btn btn-outline">
                        <PhoneIcon />
                        (650) 548-7823
                      </a>
                    ) : (
                      <Link to="/contact" className="btn btn-outline">
                        Ask a Question
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Brands we service */}
      <section className={`section ${styles.brandsSection}`} aria-labelledby="brands-heading">
        <div className="container text-center">
          <span className="section-label">Brands We Service</span>
          <h2 className="section-title" id="brands-heading">We Work on All Major Brands</h2>
          <p className="section-subtitle" style={{ margin: '0 auto var(--space-10)' }}>
            Alpine technicians are factory-trained and certified on all leading HVAC manufacturers.
          </p>
          <div className={styles.brandsGrid}>
            {['Carrier', 'Trane', 'Lennox', 'Daikin', 'Rheem', 'Goodman', 'York', 'Mitsubishi'].map((b) => (
              <div key={b} className={styles.brandChip}>{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.servicesCta} aria-label="Book a service call-to-action">
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to Schedule?</h2>
            <p className={styles.ctaDesc}>
              Book online in 2 minutes, or call us for same-day service.
              Free estimates on all installations.
            </p>
            <div className={styles.ctaBtns}>
              <Link to="/booking" className="btn btn-primary btn-lg">Book Online Now</Link>
              <a href="tel:+16505487823" className="btn btn-secondary btn-lg">
                <PhoneIcon /> (650) 548-7823
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function getBadgeClass(accent: string) {
  switch (accent) {
    case 'cool': return 'badge-cool'
    case 'warm': return 'badge-warm'
    case 'success': return 'badge-success'
    default: return 'badge-cool'
  }
}

function SnowflakeIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/>
    </svg>
  )
}

function FlameIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M13.5 .67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
    </svg>
  )
}

function ShieldIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
    </svg>
  )
}

function BoltIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
    </svg>
  )
}

function WindIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  )
}
