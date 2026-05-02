import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStaggerIn, useFadeIn, useCountUp, useInView } from '../hooks/animations'
import styles from './HomePage.module.css'

/* ── Data ──────────────────────────────────────────────────────── */
const services = [
  {
    icon: <SnowflakeIcon />,
    title: 'Air Conditioning',
    desc: 'Installation, repair, and tune-ups for all AC brands. Stay cool all Bay Area summer.',
    href: '/services#ac-services',
    accent: 'cool',
  },
  {
    icon: <FlameIcon />,
    title: 'Heating & Furnace',
    desc: 'Expert furnace and heat pump installation and repair for Bay Area homes.',
    href: '/services#heating',
    accent: 'warm',
  },
  {
    icon: <WrenchIcon />,
    title: 'HVAC Repair',
    desc: 'Fast diagnostics and reliable repairs for all makes and models. Most jobs same-day.',
    href: '/services#repair',
    accent: 'primary',
  },
  {
    icon: <ShieldIcon />,
    title: 'Maintenance Plans',
    desc: 'Annual tune-ups that extend equipment life, improve efficiency, and prevent breakdowns.',
    href: '/services#maintenance',
    accent: 'success',
  },
]

const trustBadges = [
  { icon: <CertIcon />, label: 'CA Licensed', value: 'CSLB #1045782' },
  { icon: <ShieldIcon />, label: 'Fully Insured', value: '$2M Liability' },
  { icon: <CalendarIcon />, label: 'In Business', value: '15+ Years' },
  { icon: <StarIcon />, label: 'Customer Rating', value: '4.9 / 5.0' },
  { icon: <BoltIcon />, label: 'Emergency', value: '24 / 7' },
  { icon: <CheckIcon />, label: 'Free Estimates', value: 'Always' },
]

const testimonials = [
  {
    name: 'Jennifer M.',
    location: 'San Jose, CA',
    rating: 5,
    text: "Alpine replaced our furnace in under a day. Professional, clean, and explained everything clearly. Energy bill dropped significantly — wish I'd called them sooner.",
  },
  {
    name: 'David K.',
    location: 'Palo Alto, CA',
    rating: 5,
    text: 'AC broke on the hottest weekend of the year. Alpine sent someone within 2 hours. The pricing was fair and they did a complimentary system check. Incredible service.',
  },
  {
    name: 'Maria R.',
    location: 'Fremont, CA',
    rating: 5,
    text: "We've used Alpine for 4 years. Always on time, thorough, and honest — they once told us we did NOT need a part another company said we did. That integrity keeps us coming back.",
  },
]

const blogTeasers = [
  {
    title: 'How to Prepare Your HVAC for Bay Area Winters',
    excerpt: 'Five simple steps to winterize your system before temperatures drop.',
    date: 'Apr 10, 2025',
    category: 'Maintenance',
  },
  {
    title: '5 Signs Your Air Conditioner Needs Replacement',
    excerpt: 'Age, efficiency, and repair frequency are the key signals to watch.',
    date: 'Mar 24, 2025',
    category: 'Cooling',
  },
  {
    title: 'Why Regular Maintenance Saves You Money',
    excerpt: "Well-maintained systems use up to 15% less energy. Here's the math.",
    date: 'Feb 18, 2025',
    category: 'Savings',
  },
]

/* ═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  useEffect(() => {
    document.title = 'Alpine Heating and Cooling – Bay Area HVAC Experts'
  }, [])

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TrustSection />
      <WhyUsSection />
      <TestimonialsSection />
      <BlogTeaserSection />
      <EmergencyCTA />
    </>
  )
}

/* ── Hero ──────────────────────────────────────────────────────── */
function HeroSection() {
  // Build an array of 14 particle objects. Each gets a unique position, size, speed, and color.
  // We use the index (i) with modulo math to spread them around without true randomness
  // (so the pattern is the same on every render — no hydration mismatch)
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    top: `${8 + i * 6.5}%`,                // vertically spread from 8% to ~98%
    left: `${5 + (i * 13) % 90}%`,         // horizontally distributed using modulo to wrap
    size: 3 + (i % 4) * 2,                 // alternates between 3, 5, 7, 9 px
    dur: `${6 + (i % 5) * 2}s`,            // duration cycles: 6s, 8s, 10s, 12s, 14s
    delay: `${(i * 0.6) % 5}s`,            // staggered start times so they don't all move together
    // Every 4th particle is warm (orange), every 3rd is cool (blue), rest are white
    variant: i % 4 === 0 ? 'warm' : i % 3 === 0 ? 'cool' : '',
  }))

  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Aurora: multi-color radial gradient haze that breathes slowly */}
      <div className={styles.heroAurora} aria-hidden="true" />

      {/* Mesh grid: faint grid lines overlaid on the gradient background */}
      <div className={styles.heroMesh} aria-hidden="true" />

      {/* Ambient orbs: large blurry color blobs that drift around */}
      <div className={styles.heroOrb1} aria-hidden="true" />
      <div className={styles.heroOrb2} aria-hidden="true" />
      <div className={styles.heroOrb3} aria-hidden="true" />

      {/* Floating particles: small dots scattered across the hero */}
      <div className={styles.particles} aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            // Apply color variant class (warm/cool/default) depending on the particle's index
            className={`${styles.particle} ${p.variant === 'warm' ? styles.particleWarm : p.variant === 'cool' ? styles.particleCool : ''}`}
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.dur,    // overrides the default 8s in CSS
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Floating decorative icons in the background */}
      <div className={styles.floatingSnowflake} aria-hidden="true">
        <SnowflakeIcon />
      </div>
      <div className={styles.floatingFlame} aria-hidden="true">
        <FlameIcon />
      </div>

      {/* "● Available 24/7" pill badge — floats in the top-right corner */}
      <div className={styles.heroLiveBadge} aria-hidden="true">
        <span className={styles.heroBadgeDot} />
        <span>Available 24/7</span>
      </div>

      {/* Main content grid: left column = text, right column = logo + stats */}
      <div className={`container ${styles.heroInner}`}>

        {/* Left column: all the text content and CTAs */}
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className="badge badge-warm">Bay Area's #1 HVAC Company</span>
          </div>

          <h1 className={styles.heroTitle}>
            Reliable Heating &amp;
            <br />
            {/* heroGradient applies an animated color-shifting gradient to this word */}
            <span className={styles.heroGradient}>Cooling</span>
            <span className={styles.heroSubText}> in the Bay Area</span>
          </h1>

          <p className={styles.heroDesc}>
            Licensed, insured, and trusted by <strong>5,000+</strong> Bay Area families since 2009.
            Fast response, upfront pricing, and guaranteed workmanship on every job.
          </p>

          <div className={styles.heroCtas}>
            {/* ctaBook adds the glowing pulse animation on top of btn-primary */}
            <Link to="/booking" className={`btn btn-primary btn-lg ${styles.ctaBook}`}>
              <CalendarIcon />
              Book Service
            </Link>
            <a href="tel:+16505487823" className="btn btn-secondary btn-lg">
              <PhoneIcon />
              (650) 548-7823
            </a>
          </div>

          <div className={styles.heroTrust}>
            <TrustPill icon={<CheckIcon />} text="Licensed &amp; Insured" />
            <TrustPill icon={<CheckIcon />} text="Free Estimates" />
            <TrustPill icon={<CheckIcon />} text="Same-Day Service" />
          </div>

          {/* Mobile-only: stat bubbles (15+ yrs, 5000+ customers, etc.)
              Hidden on desktop via CSS — desktop shows them in heroVisual instead */}
          <div className={styles.heroMobileStats}>
            <HeroStats />
          </div>

          {/* Scroll-down indicator: mouse icon with a bouncing dot inside */}
          <div className={styles.scrollIndicator} aria-hidden="true">
            <span>Scroll</span>
            <div className={styles.scrollDot} />
          </div>
        </div>

        {/* Right column: logo card + stat bubbles (desktop only) */}
        <div className={styles.heroVisual} aria-hidden="true">
          {/* Animated gradient border ring around the logo */}
          <div className={styles.logoGlowRing}>
            <div className={styles.logoCard}>
              <img
                src="/AlpineLogo.jpg"
                alt=""
                className={styles.heroLogo}
              />
            </div>
          </div>
          {/* Count-up stat bubbles: 15+, 5000+, 4.9/5★, 2hr */}
          <HeroStats />
        </div>
      </div>

      {/* Diagonal white shape at the bottom that creates a slope into the next section */}
      <div className={styles.heroDivider} aria-hidden="true">
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,0 L1440,60 L1440,90 L0,90 Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

function TrustPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className={styles.trustPill}>
      <span className={styles.trustPillIcon}>{icon}</span>
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </span>
  )
}

// HeroStats renders a 4-cell grid of animated count-up numbers
function HeroStats() {
  // Each stat has: end (the target number), suffix (text appended), label (caption below)
  const stats = [
    { end: 15,   suffix: '+',   label: 'Years Exp.'  },
    { end: 5000, suffix: '+',   label: 'Customers'   },
    { end: 49,   suffix: '/5★', label: 'Rating'      }, // displayed as "4.9/5★" — special-cased below
    { end: 2,    suffix: 'hr',  label: 'Response'    },
  ]
  return (
    // grid layout defined in .heroStats CSS class
    <div className={styles.heroStats}>
      {stats.map((s) => (
        // Each stat is its own component so each has its own IntersectionObserver + rAF counter
        <CountUpStat key={s.label} end={s.end} suffix={s.suffix} label={s.label} />
      ))}
    </div>
  )
}

// CountUpStat: a single animated number cell
// useCountUp watches for the element to enter the viewport, then counts from 0 to `end`
// using requestAnimationFrame for a smooth, GPU-friendly animation (no setInterval)
function CountUpStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { ref, count } = useCountUp(end, 1600) // 1600ms = animation duration
  return (
    <div
      className={styles.statBubble}
      ref={ref as React.RefObject<HTMLDivElement>} // ref tells useCountUp which element to observe
    >
      <strong>
        {/* Special case for rating: we store 49 as the target but display it as "4.9"
            because count-up counts integers — 4.9 isn't a whole number */}
        {end === 49 ? `4.9` : count}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  )
}

/* ── Services ──────────────────────────────────────────────────── */
function ServicesSection() {
  const { containerRef, getStyle } = useStaggerIn(100)
  const headRef = useFadeIn(0, 'up')

  return (
    <section className={`section ${styles.servicesSection}`} aria-labelledby="services-heading">
      <div className="container">
        <div
          className={`text-center ${styles.sectionHead}`}
          ref={headRef.ref as React.RefObject<HTMLDivElement>}
          style={headRef.style}
        >
          <span className="section-label">What We Do</span>
          <h2 className="section-title" id="services-heading">Complete HVAC Services</h2>
          <p className="section-subtitle">
            From emergency repairs to full system installations, Alpine handles everything —
            backed by 15+ years of Bay Area experience.
          </p>
        </div>

        <div
          className={styles.servicesGrid}
          ref={containerRef as React.RefObject<HTMLDivElement>}
        >
          {services.map((s, i) => (
            <Link
              to={s.href}
              key={s.title}
              className={`${styles.serviceCard} ${styles[`accent_${s.accent}`]}`}
              style={getStyle(i)}
            >
              <div className={styles.serviceIconWrap}>
                <div className={styles.serviceIcon}>{s.icon}</div>
              </div>
              <h3 className={styles.serviceTitle}>{s.title}</h3>
              <p className={styles.serviceDesc}>{s.desc}</p>
              <span className={styles.serviceLink}>
                Learn more <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Trust badges ──────────────────────────────────────────────── */
function TrustSection() {
  const { containerRef, getStyle } = useStaggerIn(70)

  return (
    <section className={styles.trustSection} aria-label="Trust credentials">
      <div className="container">
        <div
          className={styles.trustGrid}
          ref={containerRef as React.RefObject<HTMLDivElement>}
        >
          {trustBadges.map((b, i) => (
            <div key={b.label} className={styles.trustBadge} style={getStyle(i)}>
              <div className={styles.trustIcon}>{b.icon}</div>
              <div>
                <div className={styles.trustLabel}>{b.label}</div>
                <div className={styles.trustValue}>{b.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Why Us ────────────────────────────────────────────────────── */
function WhyUsSection() {
  const leftRef = useFadeIn(0, 'left')
  const { containerRef, getStyle } = useStaggerIn(100)

  const reasons = [
    {
      icon: <BoltIcon />,
      title: 'Fast Response',
      desc: 'Most calls answered in 60 seconds. Same-day service on most jobs. 24/7 emergency dispatch.',
    },
    {
      icon: <DollarIcon />,
      title: 'Upfront Pricing',
      desc: 'Written estimate before any work begins. No hidden fees. You approve, we proceed.',
    },
    {
      icon: <CertIcon />,
      title: 'NATE-Certified',
      desc: 'All Alpine technicians are NATE-certified, background-checked, and factory-trained.',
    },
    {
      icon: <StarIcon />,
      title: '5-Star Service',
      desc: 'Over 800 five-star reviews on Google and Yelp. We treat every home like our own.',
    },
  ]

  return (
    <section className={`section ${styles.whySection}`} aria-labelledby="why-heading">
      <div className="container">
        <div className={styles.whyLayout}>
          <div
            className={styles.whyLeft}
            ref={leftRef.ref as React.RefObject<HTMLDivElement>}
            style={leftRef.style}
          >
            <span className="section-label">Why Alpine?</span>
            <h2 className="section-title" id="why-heading">
              HVAC Service That Goes Beyond the Job
            </h2>
            <p className="section-subtitle">
              We don't just fix your system — we educate you on how it works,
              what to watch for, and how to get the most out of your investment.
            </p>
            <div className={styles.whyActions}>
              <Link to="/about" className="btn btn-outline">Our Story</Link>
              <Link to="/booking" className="btn btn-primary">Book a Technician</Link>
            </div>
          </div>

          <div
            className={styles.whyGrid}
            ref={containerRef as React.RefObject<HTMLDivElement>}
          >
            {reasons.map((r, i) => (
              <div key={r.title} className={styles.whyCard} style={getStyle(i)}>
                <div className={styles.whyCardIcon}>{r.icon}</div>
                <h3 className={styles.whyCardTitle}>{r.title}</h3>
                <p className={styles.whyCardDesc}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials ──────────────────────────────────────────────── */
function TestimonialsSection() {
  const headRef = useFadeIn()
  const { containerRef, getStyle } = useStaggerIn(120)

  return (
    <section className={`section ${styles.testimonialsSection}`} aria-labelledby="testimonials-heading">
      <div className="container">
        <div
          className={`text-center ${styles.sectionHead}`}
          ref={headRef.ref as React.RefObject<HTMLDivElement>}
          style={headRef.style}
        >
          <span className="section-label">Customer Reviews</span>
          <h2 className="section-title" id="testimonials-heading">
            What Bay Area Homeowners Say
          </h2>
        </div>

        <div
          className={styles.testimonialsGrid}
          ref={containerRef as React.RefObject<HTMLDivElement>}
        >
          {testimonials.map((t, i) => (
            <blockquote key={t.name} className={styles.testimonialCard} style={getStyle(i)}>
              <div className={styles.quoteIcon} aria-hidden="true">&ldquo;</div>
              <div
                className={styles.testimonialStars}
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, j) => <StarIcon key={j} />)}
              </div>
              <p className={styles.testimonialText}>{t.text}</p>
              <footer className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>{t.name.charAt(0)}</div>
                <div>
                  <cite className={styles.testimonialName}>{t.name}</cite>
                  <span className={styles.testimonialLocation}>{t.location}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Blog teasers ──────────────────────────────────────────────── */
function BlogTeaserSection() {
  const headRef = useFadeIn()
  const { containerRef, getStyle } = useStaggerIn(100)

  return (
    <section className={`section ${styles.blogSection}`} aria-labelledby="blog-heading">
      <div className="container">
        <div
          className={`text-center ${styles.sectionHead}`}
          ref={headRef.ref as React.RefObject<HTMLDivElement>}
          style={headRef.style}
        >
          <span className="section-label">HVAC Tips &amp; Insights</span>
          <h2 className="section-title" id="blog-heading">From Our Blog</h2>
        </div>

        <div
          className={styles.blogGrid}
          ref={containerRef as React.RefObject<HTMLDivElement>}
        >
          {blogTeasers.map((post, i) => (
            <Link to="/blog" key={post.title} className={styles.blogCard} style={getStyle(i)}>
              <div className={styles.blogMeta}>
                <span className="badge badge-cool">{post.category}</span>
                <time>{post.date}</time>
              </div>
              <h3 className={styles.blogTitle}>{post.title}</h3>
              <p className={styles.blogExcerpt}>{post.excerpt}</p>
              <span className={styles.blogReadMore}>Read article <ArrowIcon /></span>
            </Link>
          ))}
        </div>

        <div className={styles.blogFooter}>
          <Link to="/blog" className="btn btn-outline">View All Articles</Link>
        </div>
      </div>
    </section>
  )
}

/* ── Emergency CTA ─────────────────────────────────────────────── */
function EmergencyCTA() {
  const { ref: sectionRef, inView } = useInView(0.2)

  return (
    <section
      className={styles.emergencySection}
      aria-label="Emergency HVAC service"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className={styles.emergencyBg} aria-hidden="true" />
      <div className="container">
        <div
          className={styles.emergencyInner}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className={styles.emergencyPulse} aria-hidden="true">
            <BoltIcon />
          </div>
          <div className={styles.emergencyContent}>
            <h2 className={styles.emergencyTitle}>HVAC Emergency? We&apos;re Available 24/7</h2>
            <p className={styles.emergencyDesc}>
              Furnace out at midnight? AC failed during a heat wave?
              Alpine&apos;s emergency line is always staffed — same-hour dispatch.
            </p>
          </div>
          <div className={styles.emergencyCtas}>
            <a href="tel:+16505487823" className="btn btn-primary btn-lg">
              <PhoneIcon />
              Call Now: (650) 548-7823
            </a>
            <Link to="/booking" className="btn btn-secondary btn-lg">
              Schedule Online
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── SVG Icons ─────────────────────────────────────────────────── */
function SnowflakeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/>
    </svg>
  )
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
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

function CertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M9 11.5c0 2.49 2.01 4.5 4.5 4.5S18 13.99 18 11.5 15.99 7 13.5 7 9 9.01 9 11.5zM4 4h3.5l2 2H19c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm9.5 4.5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
    </svg>
  )
}

function DollarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
    </svg>
  )
}
