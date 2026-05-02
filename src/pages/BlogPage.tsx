import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './BlogPage.module.css'

type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  readTime: string
  tags: string[]
}

const posts: Post[] = [
  {
    slug: 'bay-area-winter-hvac-prep',
    title: 'How to Prepare Your HVAC System for Bay Area Winters',
    excerpt: 'Bay Area winters are mild by national standards, but a cold snap can still leave you without heat if your furnace hasn\'t been serviced. Here are five concrete steps to winterize your HVAC system before temperatures drop.',
    date: 'April 10, 2025',
    author: 'Carlos Mendez',
    category: 'Maintenance',
    readTime: '5 min read',
    tags: ['heating', 'furnace', 'maintenance', 'winter'],
  },
  {
    slug: 'ac-replacement-signs',
    title: '5 Signs Your Air Conditioner Needs Replacement (Not Just Repair)',
    excerpt: 'When is it time to stop pouring money into repairs and invest in a new system? Age, SEER rating, R-22 refrigerant usage, and frequency of repairs all factor into this decision. We break it down clearly.',
    date: 'March 24, 2025',
    author: 'Jason Wu',
    category: 'Cooling',
    readTime: '7 min read',
    tags: ['AC', 'replacement', 'cooling', 'efficiency'],
  },
  {
    slug: 'hvac-maintenance-savings',
    title: 'Why Regular HVAC Maintenance Saves You Money (With Numbers)',
    excerpt: 'A $150 annual tune-up can prevent a $2,000 compressor failure. We break down what preventive maintenance actually costs versus what system failures cost — the math is clear.',
    date: 'February 18, 2025',
    author: 'Angela Torres',
    category: 'Savings',
    readTime: '6 min read',
    tags: ['maintenance', 'savings', 'efficiency'],
  },
  {
    slug: 'seer-ratings-explained',
    title: 'SEER Ratings and AFUE: What Those Numbers Actually Mean for Your Bills',
    excerpt: 'SEER 16 vs SEER 20 — what\'s the real-world energy savings? And what does 95% AFUE mean for your gas bill? We do the math for Bay Area climate conditions so you can make an informed upgrade decision.',
    date: 'January 29, 2025',
    author: 'Carlos Mendez',
    category: 'Education',
    readTime: '8 min read',
    tags: ['SEER', 'AFUE', 'efficiency', 'buying guide'],
  },
  {
    slug: 'emergency-hvac-tips',
    title: 'Emergency HVAC: What to Do Before the Technician Arrives',
    excerpt: 'Your AC goes out in a heat wave. Your furnace stops in the middle of the night. Here\'s exactly what to check yourself — safely — before calling for service, and what NOT to do that could make things worse.',
    date: 'January 5, 2025',
    author: 'Jason Wu',
    category: 'Emergency',
    readTime: '5 min read',
    tags: ['emergency', 'troubleshooting', 'DIY'],
  },
  {
    slug: 'indoor-air-quality-guide',
    title: 'A Homeowner\'s Guide to Indoor Air Quality in the Bay Area',
    excerpt: 'Wildfire smoke, pollen, and humidity all affect your indoor air. Learn which filtration solutions actually work — HEPA, UV, and whole-home purifiers compared — and which are marketing hype.',
    date: 'December 12, 2024',
    author: 'Angela Torres',
    category: 'Air Quality',
    readTime: '9 min read',
    tags: ['air quality', 'filtration', 'health'],
  },
]

const categories = ['All', 'Maintenance', 'Cooling', 'Savings', 'Education', 'Emergency', 'Air Quality']

const categoryColors: Record<string, string> = {
  Maintenance: 'badge-success',
  Cooling: 'badge-cool',
  Savings: 'badge-warm',
  Education: 'badge-cool',
  Emergency: 'badge-warm',
  'Air Quality': 'badge-success',
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    document.title = 'HVAC Tips & Blog – Alpine Heating and Cooling'
  }, [])

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory)

  const [featured, ...rest] = filtered

  return (
    <>
      {/* Page header */}
      <section className={styles.pageHeader} aria-label="Blog page header">
        <div className="container">
          <span className="section-label">HVAC Knowledge Base</span>
          <h1 className={styles.pageTitle}>Tips, Guides &amp; HVAC Insights</h1>
          <p className={styles.pageSubtitle}>
            Practical advice from Alpine&apos;s certified technicians to help Bay Area homeowners
            get the most from their HVAC systems — and know when to call for help.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Blog posts">
        <div className="container">
          {/* Category filter */}
          <div className={styles.filterBar} role="navigation" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featured && (
            <Link to={`/blog`} className={styles.featuredPost} aria-label={`Read: ${featured.title}`}>
              <div className={styles.featuredBadge}>
                <span className={`badge ${categoryColors[featured.category] || 'badge-cool'}`}>{featured.category}</span>
                <span className={styles.featuredLabel}>Latest Article</span>
              </div>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              <div className={styles.featuredMeta}>
                <AuthorChip name={featured.author} />
                <time className={styles.postDate}>{featured.date}</time>
                <span className={styles.readTime}>{featured.readTime}</span>
              </div>
            </Link>
          )}

          {/* Post grid */}
          {rest.length > 0 && (
            <div className={styles.postGrid}>
              {rest.map((post) => (
                <Link to={`/blog`} key={post.slug} className={styles.postCard} aria-label={`Read: ${post.title}`}>
                  <div className={styles.postCardTop}>
                    <span className={`badge ${categoryColors[post.category] || 'badge-cool'}`}>{post.category}</span>
                    <time className={styles.postDate}>{post.date}</time>
                  </div>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <div className={styles.postMeta}>
                    <AuthorChip name={post.author} />
                    <span className={styles.readTime}>{post.readTime}</span>
                  </div>
                  <div className={styles.postTags}>
                    {post.tags.slice(0, 3).map((t) => (
                      <span key={t} className={styles.tag}>#{t}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className={styles.emptyState}>
              <p>No articles in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className={styles.blogCta} aria-label="Newsletter signup call-to-action">
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Get Seasonal HVAC Tips</h2>
              <p className={styles.ctaDesc}>
                We send one useful email per season — tune-up reminders, energy-saving tips,
                and exclusive offers for Bay Area homeowners.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Contact Alpine
              </Link>
              <Link to="/booking" className="btn btn-secondary btn-lg">
                Book a Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function AuthorChip({ name }: { name: string }) {
  const initials = name.split(' ').map((w) => w[0]).join('')
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-cool))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.7rem', fontWeight: 700, color: 'white', flexShrink: 0,
      }}>
        {initials}
      </div>
      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-gray-600)' }}>{name}</span>
    </div>
  )
}
