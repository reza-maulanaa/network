import { useState } from 'react'
import { COMMAND_COLLECTION } from '../data/commands.js'
import './CommandsPage.css'

function CmdTable({ section }) {
  const hasLayer = 'layer' in (section.rows[0] ?? {})
  const colClass = hasLayer ? 'tc-row--3col' : 'tc-row--2col'
  return (
    <div className="tc-table">
      <div className={`tc-row tc-row-head ${colClass}`} aria-hidden="true">
        {hasLayer ? <span className="tc-col tc-col-layer">Layer</span> : null}
        <span className="tc-col tc-col-cmd">Command</span>
        <span className="tc-col tc-col-fn">Fungsi</span>
      </div>
      {section.rows.map((r, i) => (
        <div className={`tc-row ${colClass}`} key={i}>
          {hasLayer ? (
            <span className="tc-col tc-col-layer">
              <span className="tc-layer">{r.layer}</span>
            </span>
          ) : null}
          <code className="tc-col tc-col-cmd tc-cmd">{r.command}</code>
          <span className="tc-col tc-col-fn">{r.fungsi}</span>
        </div>
      ))}
    </div>
  )
}

function Section({ section, open, onToggle }) {
  return (
    <section className={`tc-sec${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="tc-sec-head"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`${open ? 'Tutup' : 'Buka'} ${section.title}`}
      >
        <span className="tc-sec-no">{section.no}</span>
        <span className="tc-sec-name">
          <span className="tc-sec-title">{section.title}</span>
          <span className="tc-sec-meta">{section.meta}</span>
        </span>
        <span className="tc-sec-count">
          {section.rows.length} perintah
        </span>
      </button>
      {open ? (
        <div className="tc-sec-body">
          <p className="tc-sec-desc">{section.desc}</p>
          <CmdTable section={section} />
        </div>
      ) : null}
    </section>
  )
}

function CommandsPage() {
  const [openIds, setOpenIds] = useState(() => new Set([COMMAND_COLLECTION[0]?.id]))

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="tc-page">
      <section className="tc-header container">
        <p className="eyebrow">Linux Command</p>
        <h1>
          Terminal: senjata<br />
          network engineer.
        </h1>
        <p className="tc-header-sub">
          {COMMAND_COLLECTION.length} kategori ·{' '}
          {COMMAND_COLLECTION.reduce((n, s) => n + s.rows.length, 0)} perintah
          penting. Klik kategori buat buka daftar perintah.
        </p>
      </section>

      <section className="tc-sections">
        {COMMAND_COLLECTION.map((section) => (
          <Section
            key={section.id}
            section={section}
            open={openIds.has(section.id)}
            onToggle={() => toggle(section.id)}
          />
        ))}
      </section>
    </div>
  )
}

export default CommandsPage