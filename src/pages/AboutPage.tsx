import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './AboutPage.module.css'

const LOGO = '/AlpineLogo.jpg'

const values = [
  {
    icon: <HandshakeIcon />,
    title: 'Honest Pricing',
    desc: 'We give written estimates before starting any work. No hidden fees, no surprise charges. You approve, we proceed.',
  },
  {
    icon: <StarIcon />,
    title: 'Craftsmanship',
    desc: 'We take pride in our work. Every job is done right the first time, with attention to detail and clean workspaces.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Safety First',
    desc: 'From gas line safety checks to proper refrigerant handling, we follow every safety protocol on every job.',
  },
  {
    icon: <HeartIcon />,
    title: 'Community',
    desc: 'We are Bay Area locals. We live here, raise families here, and take pride in serving our neighbors.',
  },
]

const team = [
  {
    name: 'Carlos Mendez',
    role: 'Founder & Master HVAC Technician',
    bio: '20 years of HVAC experience. NATE-certified, EPA 608 licensed. Carlos started Alpine after seeing Bay Area homeowners overcharged by corporate chains.',
    initials: 'CM',
  },
  {
    name: 'Angela Torres',
    role: 'Operations Manager',
    bio: '12 years in service operations. Angela ensures every job is scheduled promptly and every customer is followed up with after service.',
    initials: 'AT',
  },
  {
    name: 'Jason Wu',
    role: 'Lead Technician – Cooling Systems',
    bio: '8 years specializing in commercial and residential AC systems. Jason is our go-to expert for complex installations and diagnostics.',
    initials: 'JW',
  },
]

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us – Alpine Heating and Cooling'
  }, [])

  return (
    <>
      {/* Page header */}
      <section className={styles.pageHeader} aria-label="About page header">
        <div className="container">
          <div className={styles.headerInner}>
            <div className={styles.headerContent}>
              <span className="section-label">About Alpine</span>
              <h1 className={styles.pageTitle}>Bay Area HVAC Experts<br />Since 2009</h1>
              <p className={styles.pageSubtitle}>
                Alpine Heating and Cooling was built on a simple belief: Bay Area homeowners
                deserve honest, high-quality HVAC service at a fair price.
              </p>
              <Link to="/booking" className="btn btn-primary btn-lg">
                Work With Us
              </Link>
            </div>
            <div className={styles.headerVisual} aria-hidden="true">
              <img src={LOGO} alt="" className={styles.headerLogo} />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className={`section ${styles.storySection}`} aria-labelledby="story-heading">
        <div className="container">
          <div className={styles.storyLayout}>
            <div className={styles.storyStats}>
              {[
                { value: '2009', label: 'Founded' },
                { value: '5,000+', label: 'Customers Served' },
                { value: '12,000+', label: 'Jobs Completed' },
                { value: '4.9★', label: 'Average Rating' },
              ].map((s) => (
                <div key={s.label} className={styles.storyStat}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.storyContent}>
              <span className="section-label">Our Story</span>
              <h2 className="section-title" id="story-heading">
                Started by a Technician, Not an Accountant
              </h2>
              <div className={styles.storyText}>
                <p>
                  Alpine was founded in 2009 by Carlos Mendez, a master HVAC technician who grew
                  frustrated watching big-box HVAC companies overcharge Bay Area homeowners for
                  repairs they didn't need and equipment they didn't need to replace.
                </p>
                <p>
                  Carlos started Alpine with one service van, a commitment to honest diagnostics,
                  and word-of-mouth referrals. Fifteen years later, Alpine has grown to a full
                  team of 18 NATE-certified technicians serving the entire Bay Area — but that
                  founding commitment hasn't changed.
                </p>
                <p>
                  We still call every customer after service to make sure everything is working
                  right. We still tell you when you don't need a repair. And we still price
                  every job to be fair to the homeowner, not to maximize our margin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className={`section ${styles.valuesSection}`} aria-labelledby="values-heading">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Our Values</span>
            <h2 className="section-title" id="values-heading">What Drives Every Job We Do</h2>
            <p className="section-subtitle">
              These aren't marketing words — they're the standards we hold every Alpine
              technician accountable to on every call.
            </p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`section ${styles.teamSection}`} aria-labelledby="team-heading">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Our Team</span>
            <h2 className="section-title" id="team-heading">The People Behind Alpine</h2>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member) => (
              <div key={member.name} className={styles.teamCard}>
                <div className={styles.teamAvatar}>{member.initials}</div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
                <p className={styles.teamBio}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className={`section ${styles.certsSection}`} aria-labelledby="certs-heading">
        <div className="container">
          <div className={`text-center ${styles.certHeader}`}>
            <span className="section-label">Credentials</span>
            <h2 className="section-title" id="certs-heading">Licensed, Certified & Insured</h2>
          </div>
          <div className={styles.certsGrid}>
            {[
              { title: 'CA CSLB License', value: '#1045782', desc: 'California Contractors State License Board — C-20 HVAC Contractor' },
              { title: 'NATE Certified', value: 'All Technicians', desc: 'North American Technician Excellence certification for every Alpine tech' },
              { title: 'EPA 608', value: 'Universal Certified', desc: 'Certified for all refrigerant types including R-410A and R-32 systems' },
              { title: 'General Liability', value: '$2M Coverage', desc: 'Full liability and workers\' compensation insurance for your peace of mind' },
            ].map((c) => (
              <div key={c.title} className={styles.certCard}>
                <div className={styles.certBadge}><ShieldIcon /></div>
                <h3 className={styles.certTitle}>{c.title}</h3>
                <p className={styles.certValue}>{c.value}</p>
                <p className={styles.certDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.aboutCta} aria-label="Get in touch call-to-action">
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Experience the Alpine Difference?</h2>
            <p className={styles.ctaDesc}>
              Join thousands of Bay Area homeowners who trust Alpine for all their HVAC needs.
              Book a service call today — free estimates on all installations.
            </p>
            <div className={styles.ctaBtns}>
              <Link to="/booking" className="btn btn-primary btn-lg">Book Service Now</Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function HandshakeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M11 5h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zM2 3h8v2H4v14h8v2H2zm12 0h8v18h-10v-2h8V5h-6z"/>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  )
}
