import { useState, useEffect, type FormEvent } from 'react'
import styles from './BookingPage.module.css'

type BookingForm = {
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  city: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  notes: string
  paymentMethod: 'pay-later' | 'pay-now'
}

const initialForm: BookingForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  serviceType: '',
  preferredDate: '',
  preferredTime: '',
  notes: '',
  paymentMethod: 'pay-later',
}

const serviceTypes = [
  'AC Installation', 'AC Repair / Diagnostic',
  'Furnace Installation', 'Furnace Repair / Diagnostic',
  'HVAC Tune-Up / Maintenance', 'Emergency Service',
  'Duct Cleaning', 'Air Quality Inspection',
  'Thermostat Installation', 'New System Estimate',
]

const timeSlots = [
  '8:00 AM – 10:00 AM',
  '10:00 AM – 12:00 PM',
  '12:00 PM – 2:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM',
]

const serviceAreas = [
  'San Jose', 'Oakland', 'Fremont', 'Palo Alto',
  'Sunnyvale', 'Santa Clara', 'Mountain View',
  'San Francisco', 'Berkeley', 'Hayward',
  'Milpitas', 'Other Bay Area City',
]

function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

export default function BookingPage() {
  const [form, setForm] = useState<BookingForm>(initialForm)
  const [errors, setErrors] = useState<Partial<BookingForm>>({})
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Book Service – Alpine Heating and Cooling'
  }, [])

  function validateStep1(): boolean {
    const e: Partial<BookingForm> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.phone.trim()) e.phone = 'Required'
    else if (!/^\+?[\d\s\-().]{7,15}$/.test(form.phone)) e.phone = 'Invalid phone number'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2(): boolean {
    const e: Partial<BookingForm> = {}
    if (!form.serviceType) e.serviceType = 'Please select a service'
    if (!form.preferredDate) e.preferredDate = 'Please select a date'
    if (!form.preferredTime) e.preferredTime = 'Please select a time slot'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function nextStep() {
    if (step === 1 && validateStep1()) setStep(2)
    if (step === 2 && validateStep2()) setStep(3)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      const bookings = JSON.parse(localStorage.getItem('alpine_bookings') ?? '[]')
      bookings.push({ ...form, bookedAt: new Date().toISOString(), id: Date.now() })
      localStorage.setItem('alpine_bookings', JSON.stringify(bookings))
      setStep(3)
      setSubmitting(false)
    }, 900)
  }

  function handleChange(field: keyof BookingForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <>
      {/* Page header */}
      <section className={styles.pageHeader} aria-label="Booking page header">
        <div className="container">
          <span className="section-label">Schedule Service</span>
          <h1 className={styles.pageTitle}>Book Your HVAC Service</h1>
          <p className={styles.pageSubtitle}>
            Fill out the form below and we&apos;ll confirm your appointment within one business hour.
            Prefer to talk? Call us at <a href="tel:+16505487823">(650) 548-7823</a>.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Booking form">
        <div className="container">
          <div className={styles.bookingLayout}>
            {/* Form */}
            <div className={styles.formSection}>
              {/* Progress bar */}
              {step < 3 && (
                <div className={styles.progress} aria-label="Booking progress">
                  <div className={styles.progressSteps}>
                    {(['Your Info', 'Service Details', 'Confirm'] as const).map((label, i) => (
                      <div
                        key={label}
                        className={`${styles.progressStep} ${step > i + 1 ? styles.done : ''} ${step === i + 1 ? styles.active : ''}`}
                      >
                        <div className={styles.progressDot}>
                          {step > i + 1 ? <CheckIcon /> : <span>{i + 1}</span>}
                        </div>
                        <span className={styles.progressLabel}>{label}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.progressBar} aria-hidden="true">
                    <div className={styles.progressFill} style={{ width: `${((step - 1) / 2) * 100}%` }} />
                  </div>
                </div>
              )}

              {/* Step 1 */}
              {step === 1 && (
                <div className={styles.formCard}>
                  <h2 className={styles.stepTitle}>Your Contact Information</h2>
                  <div className={styles.form}>
                    <div className={styles.formRow}>
                      <Field label="First Name *" error={errors.firstName}>
                        <input
                          type="text"
                          className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                          placeholder="Jane"
                          value={form.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          autoComplete="given-name"
                        />
                      </Field>
                      <Field label="Last Name *" error={errors.lastName}>
                        <input
                          type="text"
                          className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                          placeholder="Smith"
                          value={form.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          autoComplete="family-name"
                        />
                      </Field>
                    </div>
                    <div className={styles.formRow}>
                      <Field label="Phone Number *" error={errors.phone}>
                        <input
                          type="tel"
                          className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                          placeholder="(650) 555-0100"
                          value={form.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          autoComplete="tel"
                        />
                      </Field>
                      <Field label="Email Address *" error={errors.email}>
                        <input
                          type="email"
                          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                          placeholder="jane@example.com"
                          value={form.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          autoComplete="email"
                        />
                      </Field>
                    </div>
                    <Field label="Service Address *" error={errors.address}>
                      <input
                        type="text"
                        className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
                        placeholder="123 Main Street"
                        value={form.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        autoComplete="street-address"
                      />
                    </Field>
                    <Field label="City *" error={errors.city}>
                      <select
                        className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                        value={form.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                      >
                        <option value="">Select your city</option>
                        {serviceAreas.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                    <button type="button" className={`btn btn-primary ${styles.nextBtn}`} onClick={nextStep}>
                      Continue to Service Details →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className={styles.formCard}>
                  <h2 className={styles.stepTitle}>Service Details</h2>
                  <div className={styles.form}>
                    <Field label="Service Type *" error={errors.serviceType}>
                      <select
                        className={`${styles.input} ${errors.serviceType ? styles.inputError : ''}`}
                        value={form.serviceType}
                        onChange={(e) => handleChange('serviceType', e.target.value)}
                      >
                        <option value="">Select a service</option>
                        {serviceTypes.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </Field>
                    <div className={styles.formRow}>
                      <Field label="Preferred Date *" error={errors.preferredDate}>
                        <input
                          type="date"
                          className={`${styles.input} ${errors.preferredDate ? styles.inputError : ''}`}
                          min={getTodayStr()}
                          value={form.preferredDate}
                          onChange={(e) => handleChange('preferredDate', e.target.value)}
                        />
                      </Field>
                      <Field label="Preferred Time *" error={errors.preferredTime}>
                        <select
                          className={`${styles.input} ${errors.preferredTime ? styles.inputError : ''}`}
                          value={form.preferredTime}
                          onChange={(e) => handleChange('preferredTime', e.target.value)}
                        >
                          <option value="">Select a time window</option>
                          {timeSlots.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <Field label="Additional Notes">
                      <textarea
                        className={`${styles.input} ${styles.textarea}`}
                        rows={4}
                        placeholder="Describe the issue, model number, or any special instructions..."
                        value={form.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                      />
                    </Field>

                    {/* Payment choice */}
                    <div className={styles.paymentSection}>
                      <p className={styles.paymentLabel}>Payment Option</p>
                      <div className={styles.paymentOptions}>
                        <label className={`${styles.payOption} ${form.paymentMethod === 'pay-later' ? styles.paySelected : ''}`}>
                          <input
                            type="radio"
                            name="payment"
                            value="pay-later"
                            checked={form.paymentMethod === 'pay-later'}
                            onChange={() => handleChange('paymentMethod', 'pay-later')}
                            className={styles.radioHidden}
                          />
                          <div className={styles.payOptionContent}>
                            <strong>Pay After Service</strong>
                            <span>We&apos;ll invoice you once the job is complete. Cash, check, or card accepted on-site.</span>
                          </div>
                        </label>
                        <label
                          className={`${styles.payOption} ${styles.payOptionDisabled}`}
                          title="Online payment coming soon"
                        >
                          <input type="radio" name="payment" value="pay-now" disabled className={styles.radioHidden} />
                          <div className={styles.payOptionContent}>
                            <strong>Pay Now (Coming Soon)</strong>
                            <span>Secure card payment via Stripe. Launching soon.</span>
                          </div>
                          <span className={styles.comingSoon}>Soon</span>
                        </label>
                      </div>
                    </div>

                    <div className={styles.stepNavBtns}>
                      <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                        ← Back
                      </button>
                      <button type="button" className={`btn btn-primary ${styles.nextBtn}`} onClick={nextStep}>
                        Review Booking →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 — Confirm / Success */}
              {step === 3 && submitting === false && form.firstName !== '' ? (
                <div className={styles.formCard}>
                  <h2 className={styles.stepTitle}>Review &amp; Confirm</h2>
                  <div className={styles.summary}>
                    <SummaryRow label="Name" value={`${form.firstName} ${form.lastName}`} />
                    <SummaryRow label="Phone" value={form.phone} />
                    <SummaryRow label="Email" value={form.email} />
                    <SummaryRow label="Address" value={`${form.address}, ${form.city}, CA`} />
                    <SummaryRow label="Service" value={form.serviceType} />
                    <SummaryRow label="Date" value={form.preferredDate} />
                    <SummaryRow label="Time Window" value={form.preferredTime} />
                    <SummaryRow label="Payment" value="Pay After Service" />
                    {form.notes && <SummaryRow label="Notes" value={form.notes} />}
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className={styles.stepNavBtns}>
                      <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>
                        ← Edit
                      </button>
                      <button type="submit" className={`btn btn-primary ${styles.nextBtn}`} disabled={submitting}>
                        {submitting ? 'Booking…' : 'Confirm Booking'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : step === 3 && !submitting ? (
                <BookingSuccess name={form.firstName} date={form.preferredDate} time={form.preferredTime} />
              ) : step === 3 && submitting ? (
                <div className={styles.formCard} style={{ textAlign: 'center', padding: '3rem' }}>
                  <p style={{ color: 'var(--color-gray-500)' }}>Booking your appointment…</p>
                </div>
              ) : null}
            </div>

            {/* Sidebar */}
            <aside className={styles.bookingSidebar} aria-label="Booking information">
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Why Book with Alpine?</h3>
                <ul className={styles.sidebarList}>
                  {[
                    'Confirmation within 1 business hour',
                    'Free estimates on all installations',
                    'NATE-certified technicians',
                    'Upfront pricing — no surprises',
                    'Licensed & insured — CSLB #1045782',
                    '2-year labor warranty on all repairs',
                  ].map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.sidebarCard + ' ' + styles.emergencyCard}>
                <h3 className={styles.emergencyTitle}>Need Immediate Help?</h3>
                <p>For emergencies, skip the form and call us directly. We dispatch 24/7.</p>
                <a href="tel:+16505487823" className={`btn btn-primary`} style={{ width: '100%', justifyContent: 'center' }}>
                  <PhoneIcon />
                  (650) 548-7823
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

/* ── Sub-components ─────────────────────────────────────────────── */
function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-gray-700)' }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: '0.8125rem', color: 'var(--color-danger)', fontWeight: 500 }}>{error}</span>}
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid var(--color-gray-100)' }}>
      <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>{label}</span>
      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-gray-800)' }}>{value}</span>
    </div>
  )
}

function BookingSuccess({ name, date, time }: { name: string; date: string; time: string }) {
  return (
    <div
      style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-2xl)',
        border: '1.5px solid var(--color-gray-100)',
        padding: '3rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'rgba(16,185,129,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-success)',
      }}>
        <CheckIcon />
      </div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
        Booking Confirmed, {name}!
      </h2>
      <p style={{ color: 'var(--color-gray-500)', lineHeight: 1.7 }}>
        Your appointment request for <strong>{date}</strong> at <strong>{time}</strong> has been received.
        An Alpine team member will call you within 1 business hour to confirm.
      </p>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-gray-400)' }}>
        Questions? Call us at <a href="tel:+16505487823" style={{ color: 'var(--color-warm)', fontWeight: 600 }}>(650) 548-7823</a>
      </p>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
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
