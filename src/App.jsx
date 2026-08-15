import { useEffect, useRef, useState } from 'react'
import './App.css'
import RoadmapPage from './pages/RoadmapPage.jsx'
import CommandsPage from './pages/CommandsPage.jsx'

const NAV_LINKS = [
  { href: '#about', label: 'Tentang' },
  { href: '#skills', label: 'Keahlian' },
  { href: '#equipment', label: 'Pengalaman' },
  { href: '#/roadmap', label: 'Roadmap' },
  { href: '#/terminal', label: 'Terminal' },
  { href: '#contact', label: 'Kontak' },
]

function getRoute() {
  const hash = window.location.hash
  if (hash.startsWith('#/roadmap')) return 'roadmap'
  if (hash.startsWith('#/terminal')) return 'terminal'
  return 'home'
}

const SKILLS = [
  {
    no: '01',
    title: 'Dasar Jaringan',
    body: 'Memahami IP addressing, subnetting, TCP/IP, dan cara perangkat berkomunikasi dalam satu jaringan lokal.',
    tag: 'OSI · TCP/IP',
  },
  {
    no: '02',
    title: 'Router',
    body: 'Konfigurasi dasar, manajemen DHCP, port forwarding, dan penanganan lalu lintas antar-jaringan.',
    tag: 'DHCP · NAT',
  },
  {
    no: '03',
    title: 'Managed Switch',
    body: 'Manajemen port, pembuatan VLAN, dan pengaturan bandwidth ant-grade untuk jaringan yang terbagi rapi.',
    tag: 'VLAN · Port',
  },
  {
    no: '04',
    title: 'Modem',
    body: 'Setup, koneksi ke ISP, dan troubleshooting sinyal agar perangkat-rumah atau kantor tetap terhubung.',
    tag: 'ISP · DSL/Fiber',
  },
  {
    no: '05',
    title: 'Troubleshooting',
    body: 'Menelusuri titik gagal: kabel, koneksi, konfigurasi. Dari lapisan fisik hingga lapisan aplikasi.',
    tag: 'Ping · Trace',
  },
  {
    no: '06',
    title: 'Topologi Jaringan',
    body: 'Merancang susunan perangkat (LAN/WAN) yang stabil dan mudah dikembangkan sesuai kebutuhan.',
    tag: 'LAN · WAN · Mesh',
  },
]

const EQUIPMENT = [
  {
    name: 'Router',
    detail: 'Mode bridge/router, DHCP, port forwarding',
    note: 'perangkat inti yang mengarahkan lalu lintas data antar jaringan',
  },
  {
    name: 'Managed Switch',
    detail: 'Konfigurasi port, VLAN, proteksi switch',
    note: 'splitting jaringan dengan kontrol per-port yang lebih teliti',
  },
  {
    name: 'Modem',
    detail: 'Koneksi ISP, sinkronisasi sinyal',
    note: 'jembatan dari penyedia layanan ke jaringan lokal',
  },
  {
    name: 'Access Point',
    detail: 'Jangkauan Wi-Fi, SSID, keamanan',
    note: 'memperluas koneksi tanpa kabel seluruh ruangan',
  },
]

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
)

const NET_NODES = [
  { x: 40, y: 30, s: 14 },
  { x: 40, y: 175, s: 14 },
  { x: 205, y: 60, s: 30 },
  { x: 205, y: 215, s: 30 },
  { x: 380, y: 175, s: 20 },
  { x: 380, y: 40, s: 20 },
]

const NET_LINKS = [
  [0, 2],
  [1, 2],
  [1, 3],
  [2, 3],
  [3, 5],
  [2, 4],
  [3, 4],
]

function NetworkGraph() {
  return (
    <svg
      viewBox="0 0 440 260"
      role="img"
      aria-label="Ilustrasi topologi jaringan sederhana"
      className="net-graph"
    >
      {NET_LINKS.map(([a, b], i) => {
        const p = NET_NODES[a]
        const q = NET_NODES[b]
        return (
          <line
            key={i}
            x1={p.x + p.s / 2}
            y1={p.y + p.s / 2}
            x2={q.x + q.s / 2}
            y2={q.y + q.s / 2}
            className="net-link"
          />
        )
      })}
      {NET_NODES.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x}
            y={n.y}
            width={n.s}
            height={n.s}
            className={i === 2 ? 'net-node core' : 'net-node'}
          />
          {i === 2 ? (
            <text x={n.x + n.s / 2} y={n.y + n.s / 2 + 4} textAnchor="middle" className="net-core-tag">
              R
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  )
}

function App() {
  const rootRef = useRef(null)
  const toggleRef = useRef(null)
  const menuRef = useRef(null)
  const [route, setRoute] = useState(getRoute)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true
      menuRef.current?.querySelector('a')?.focus()
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false
      toggleRef.current?.focus()
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const renderNavLink = (l, extra = {}) => {
    const active =
      (l.href === '#/roadmap' && route === 'roadmap') ||
      (l.href === '#/terminal' && route === 'terminal')
    return (
      <a key={l.href} href={l.href} className={active ? 'is-active' : undefined} {...extra}>
        {l.label}
      </a>
    )
  }

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll('[data-reveal]')
    if (!els) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [route])

  return (
    <div ref={rootRef}>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label="Reza kembali ke atas">
            <img src="/header.png" alt="Logo Reza" className="brand-logo" />
          </a>
          <nav className="site-nav" aria-label="Navigasi utama">
            {NAV_LINKS.map((l) => renderNavLink(l))}
          </nav>
          <button
            type="button"
            ref={toggleRef}
            className={`nav-toggle ${menuOpen ? 'is-open' : ''}`}
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          >
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
          </button>
          <a href="#contact" className="header-cta">
            Hubungi
          </a>
        </div>

        {menuOpen ? (
          <div className="mobile-menu-wrap">
            <div className="mobile-backdrop" onClick={closeMenu} />
            <nav id="mobile-menu" ref={menuRef} className="mobile-menu" aria-label="Navigasi utama ponsel">
              {NAV_LINKS.map((l) => renderNavLink(l, { onClick: closeMenu }))}
            </nav>
          </div>
        ) : null}
      </header>

      {route === 'roadmap' ? (
        <main id="top">
          <RoadmapPage />
        </main>
      ) : route === 'terminal' ? (
        <main id="top">
          <CommandsPage />
        </main>
      ) : (
        <main id="top">
          <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">Portofolio · Dasar Jaringan</p>
              <h1>
                Reza<span className="h-soft">.</span>
                <br />
                Menghubungkan perangkat,
                <br />
                <span className="h-accent">menghidupkan koneksi.</span>
              </h1>
              <p className="hero-lead">
                Saya menekuni dasar jaringan dan berpengalaman menangani{' '}
                <strong>router</strong>, <strong>managed switch</strong>, dan{' '}
                <strong>modem</strong>: dari konfigurasi sampai menelusuri
                masalah koneksi.
              </p>
            </div>

            <div className="hero-graphic" data-reveal>
              <NetworkGraph />
              <div className="hero-strip">
                <div className="strip-item">
                  <span className="strip-k">IP</span>
                  <span className="strip-v">IPv4 / IPv6</span>
                </div>
                <div className="strip-item">
                  <span className="strip-k">VLAN</span>
                  <span className="strip-v">managed switch</span>
                </div>
                <div className="strip-item">
                  <span className="strip-k">WAN</span>
                  <span className="strip-v">router · modem</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="container about-grid" data-reveal>
            <div>
              <p className="eyebrow">Tentang Saya</p>
              <h2>Dunia saya: alamat IP, router,<br />dan cara koneksi bekerja.</h2>
            </div>
<div className="about-body">
              <p>
                Ketertarikan saya pada jaringan berawal dari rasa penasaran
                gimana perangkat bisa saling terhubung. Saya belajar dari nol:
                alamat IP, cara router mengarahkan data, dan cara switch membagi
                koneksi.
              </p>
              <p>
                Keseharian saya berkutat dengan{' '}
                <strong>modem</strong>, <strong>router</strong>, dan{' '}
                <strong>managed switch</strong>. Level masih dasar, tapi saya
                terbiasa menelusuri masalah koneksi langkah demi langkah sampai
                akar penyebabnya ketemu.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills">
          <div className="container">
            <div className="skills-head" data-reveal>
              <p className="eyebrow">Keahlian</p>
              <h2>Dasar-dasar yang saya kuasai<br />dan pakai setiap hari.</h2>
            </div>
            <div className="skills-grid">
              {SKILLS.map((s) => (
                <article className="skill-card" key={s.no} data-reveal>
                  <span className="skill-no">{s.no}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <div className="skill-tag">{s.tag}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="equipment" className="section equipment">
          <div className="container">
            <div className="equip-head" data-reveal>
              <p className="eyebrow">Pengalaman</p>
              <h2>Peralatan yang pernah saya<br />pasang dan rawat.</h2>
            </div>
            <div className="equip-list">
              {EQUIPMENT.map((eq, i) => (
                <div className="equip-row" key={eq.name} data-reveal>
                  <span className="equip-idx">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="equip-name">{eq.name}</h3>
                  <p className="equip-note">{eq.note}</p>
                  <span className="equip-detail">{eq.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="container contact-panel" data-reveal>
            <p className="eyebrow">Kontak</p>
            <h2>
              Ada jaringan yang perlu
              <br />
              diperbaiki atau diatur?
            </h2>
            <p className="contact-note">
              Ceritakan kebutuhan Anda. Saya siap membantu urusan koneksi dan
              konfigurasi perangkat.
            </p>
            <a href="mailto:rezzreborn@gmail.com" className="btn btn-light">
              kirim email →
            </a>
            <div className="contact-meta">
              <span>
                <a
                  href="https://github.com/reza-maulanaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  github.com/reza-maulanaa ↗
                </a>
              </span>
              <span>rezzreborn@gmail.com</span>
              <span>Indonesia · WIB</span>
            </div>
          </div>
        </section>
      </main>
      )}

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="#top" className="brand" aria-label="Reza kembali ke atas">
              <img src="/header.png" alt="Logo Reza" className="brand-logo" />
            </a>
            <p className="footer-desc">
              Fokus Reza pada dasar jaringan: router, managed switch, modem, dan
              troubleshooting koneksi.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <p className="footer-head">Navigasi</p>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <address className="footer-links">
            <p className="footer-head">Terhubung</p>
            <a
              href="https://github.com/reza-maulanaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/reza-maulana-38932240a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a href="mailto:rezzreborn@gmail.com">rezzreborn@gmail.com</a>
          </address>
        </div>

        <div className="footer-bottom">
          <div className="container footer-copy">
            © {new Date().getFullYear()} Reza. Dibuat dari nol.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App