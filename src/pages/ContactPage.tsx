import { useState, useEffect, type FormEvent } from 'react'
import styles from './ContactPage.module.css'
import { submitToWeb3Forms } from '../lib/web3forms'

type ContactForm = {
  name: string
  phone: string
  email: string
  service: string
  message: string
}

const initialForm: ContactForm = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
}

const serviceOptions = [
  'AC Installation', 'AC Repair', 'Furnace Installation',
  'Furnace Repair', 'HVAC Maintenance', 'Emergency Service',
  'Ventilation / Air Quality', 'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm)
  const [errors, setErrors] = useState<Partial<ContactForm>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  useEffect(() => {
    document.title = 'Contact Us – Alpine Heating and Cooling'
  }, [])

  function validate(): boolean {
    const e: Partial<ContactForm> = {}
    if (!form.name.trim()) e.name = 'Your name is required.'
    if (!form.phone.trim()) {
      e.phone = 'Phone number is required.'
    } else if (!/^\+?[\d\s\-().]{7,15}$/.test(form.phone)) {
      e.phone = 'Please enter a valid phone number.'
    }
    if (!form.email.trim()) {
      e.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim()) e.message = 'Please describe what you need help with.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setSubmitError(false)
    const ok = await submitToWeb3Forms({
      subject: `New contact form message from ${form.name}`,
      name: form.name,
      phone: form.phone,
      email: form.email,
      service: form.service,
      message: form.message,
    })
    setSubmitting(false)
    if (ok) {
      setSubmitted(true)
      setForm(initialForm)
    } else {
      setSubmitError(true)
    }
  }

  function handleChange(field: keyof ContactForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <>
      {/* Page header */}
      <section className={styles.pageHeader} aria-label="Contact page header">
        <div className="container">
          <span className="section-label">Get In Touch</span>
          <h1 className={styles.pageTitle}>Contact Alpine Heating &amp; Cooling</h1>
          <p className={styles.pageSubtitle}>
            Have a question or ready to schedule service? Fill out the form and we'll get back to you
            within one business hour, or call us for immediate assistance.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Contact information and form">
        <div className="container">
          <div className={styles.contactLayout}>
            {/* Left: Contact info */}
            <aside className={styles.contactInfo} aria-label="Contact details">
              <h2 className={styles.infoTitle}>Reach Us Directly</h2>

              <div className={styles.infoCards}>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}><PhoneIcon /></div>
                  <div>
                    <h3 className={styles.infoLabel}>Phone</h3>
                    <a href="tel:+19252701355" className={styles.infoValue}>(925) 270-1355</a>
                    <p className={styles.infoNote}>Mon–Fri 8am–6pm · Sat 9am–4pm</p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}><BoltIcon /></div>
                  <div>
                    <h3 className={styles.infoLabel}>Emergency Line</h3>
                    <a href="tel:+19252701355" className={`${styles.infoValue} ${styles.emergency}`}>(925) 270-1355</a>
                    <p className={styles.infoNote}>Available 24 hours, 7 days a week</p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}><EmailIcon /></div>
                  <div>
                    <h3 className={styles.infoLabel}>Email</h3>
                    <a href="mailto:Service@alpineheatingac.com" className={styles.infoValue}>
                      Service@alpineheatingac.com
                    </a>
                    <p className={styles.infoNote}>We respond within 1 business hour</p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}><PinIcon /></div>
                  <div>
                    <h3 className={styles.infoLabel}>Office Address</h3>
                    <p className={styles.infoValue}>485 Railroad Ave</p>
                    <p className={styles.infoNote}>Pittsburg, CA 94565</p>
                  </div>
                </div>
              </div>

              {/* Service areas */}
              <div className={styles.areasBox}>
                <h3 className={styles.areasTitle}>Service Areas</h3>
                <div className={styles.areasList}>
                  {[
                    'Pittsburg', 'Antioch', 'Brentwood', 'Concord', 'Martinez',
                    'Walnut Creek', 'Livermore', 'Pleasanton', 'Dublin', 'Danville',
                    'Oakland', 'Fremont', 'Hayward', 'San Jose', 'San Francisco',
                  ].map((c) => (
                    <span key={c} className={styles.areaChip}>{c}</span>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right: Form + Map */}
            <div className={styles.contactRight}>
              {/* Contact Form */}
              <div className={styles.formCard}>
                <h2 className={styles.formTitle}>Send Us a Message</h2>

                {submitted ? (
                  <div className={styles.successMessage} role="alert">
                    <div className={styles.successIcon}><CheckIcon /></div>
                    <h3>Message Sent!</h3>
                    <p>
                      Thank you! We&apos;ve received your message and will contact you within one
                      business hour. For urgent matters, please call (925) 270-1355.
                    </p>
                    <button
                      className="btn btn-outline"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form} noValidate aria-label="Contact form">
                    <div className={styles.formRow}>
                      <div className={styles.field}>
                        <label htmlFor="c-name" className={styles.label}>Full Name *</label>
                        <input
                          id="c-name"
                          type="text"
                          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          autoComplete="name"
                          aria-required="true"
                          aria-describedby={errors.name ? 'c-name-error' : undefined}
                        />
                        {errors.name && <span id="c-name-error" className={styles.error} role="alert">{errors.name}</span>}
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="c-phone" className={styles.label}>Phone Number *</label>
                        <input
                          id="c-phone"
                          type="tel"
                          className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                          placeholder="(650) 555-0100"
                          value={form.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          autoComplete="tel"
                          aria-required="true"
                          aria-describedby={errors.phone ? 'c-phone-error' : undefined}
                        />
                        {errors.phone && <span id="c-phone-error" className={styles.error} role="alert">{errors.phone}</span>}
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="c-email" className={styles.label}>Email Address *</label>
                      <input
                        id="c-email"
                        type="email"
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        placeholder="jane@example.com"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        autoComplete="email"
                        aria-required="true"
                        aria-describedby={errors.email ? 'c-email-error' : undefined}
                      />
                      {errors.email && <span id="c-email-error" className={styles.error} role="alert">{errors.email}</span>}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="c-service" className={styles.label}>Service Needed</label>
                      <select
                        id="c-service"
                        className={styles.input}
                        value={form.service}
                        onChange={(e) => handleChange('service', e.target.value)}
                      >
                        <option value="">Select a service (optional)</option>
                        {serviceOptions.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="c-message" className={styles.label}>Message *</label>
                      <textarea
                        id="c-message"
                        className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                        placeholder="Describe what you need help with..."
                        rows={5}
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        aria-required="true"
                        aria-describedby={errors.message ? 'c-msg-error' : undefined}
                      />
                      {errors.message && <span id="c-msg-error" className={styles.error} role="alert">{errors.message}</span>}
                    </div>

                    {submitError && (
                      <p className={styles.error} role="alert">
                        Something went wrong sending your message. Please try again, or call us at{' '}
                        <a href="tel:+19252701355">(925) 270-1355</a>.
                      </p>
                    )}

                    <button
                      type="submit"
                      className={`btn btn-primary ${styles.submitBtn}`}
                      disabled={submitting}
                      aria-busy={submitting}
                    >
                      {submitting ? 'Sending…' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>

              {/* Google Maps */}
              <div className={styles.mapCard}>
                <h2 className={styles.mapTitle}>We Serve the Entire Bay Area</h2>
                <div className={styles.mapWrapper}>
                  <iframe
                    title="Alpine Heating and Cooling service area map"
                    src="https://maps.google.com/maps?q=San+Francisco+Bay+Area,+California&t=&z=9&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="340"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
      <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
  )
}
