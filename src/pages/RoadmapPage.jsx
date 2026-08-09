import { useState } from 'react'
import { ROADMAP } from '../data/roadmap.js'
import {
  STATUS,
  STATUS_LABEL,
  STATUS_NEXT,
  useRoadmapProgress,
} from '../hooks/useRoadmapProgress.js'
import './RoadmapPage.css'

function Field({ label, children }) {
  return (
    <label className="rm-field">
      <span className="rm-field-label">{label}</span>
      {children}
    </label>
  )
}

function ItemRow({ item, rec, open, onToggle, onCycle, onChange }) {
  const status = rec.status
  return (
    <div className="rm-item">
      <div className="rm-item-row">
        <button
          type="button"
          className={`rm-status rm-status-${status}`}
          onClick={() => onCycle(item.id)}
          title="Klik untuk ganti status"
          aria-label={`Status ${item.topik}: ${STATUS_LABEL[status]}. Klik untuk ganti.`}
        >
          {STATUS_LABEL[status]}
        </button>
        <button
          type="button"
          className="rm-item-head"
          onClick={onToggle}
          aria-expanded={open}
          aria-label={`${open ? 'Tutup' : 'Buka'} detail ${item.topik}`}
        >
          <span className="rm-item-id">{item.id}</span>
          <span className="rm-item-topik">{item.topik}</span>
          <span className="rm-item-chev" aria-hidden="true">
            {open ? '–' : '+'}
          </span>
        </button>
      </div>

      {open ? (
        <div className="rm-item-detail">
          <p className="rm-item-deskripsi">{item.deskripsi}</p>
          <div className="rm-item-fields">
            <Field label="Tanggal mulai">
              <input
                type="date"
                className="rm-input"
                value={rec.mulai}
                onChange={(e) => onChange(item.id, { mulai: e.target.value })}
              />
            </Field>
            <Field label="Tanggal selesai">
              <input
                type="date"
                className="rm-input"
                value={rec.selesai}
                onChange={(e) => onChange(item.id, { selesai: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Link dokumentasi">
            <input
              type="url"
              className="rm-input"
              placeholder="https://github.com/…"
              value={rec.link}
              onChange={(e) => onChange(item.id, { link: e.target.value })}
            />
          </Field>
          <Field label="Catatan / insight">
            <textarea
              rows={3}
              className="rm-input rm-textarea"
              placeholder="Apa yang kamu pelajari, masalah yang ketemu, atau caranya…"
              value={rec.catatan}
              onChange={(e) => onChange(item.id, { catatan: e.target.value })}
            />
          </Field>
        </div>
      ) : null}
    </div>
  )
}

function Fase({ fase, open, onToggle, progress, openItems, onToggleItem, onCycle, onChange }) {
  const done = fase.items.filter((it) => progress[it.id]?.status === STATUS.selesai).length
  const total = fase.items.length
  const pct = Math.round((done / total) * 100)

  return (
    <section className="rm-fase">
      <button
        type="button"
        className="rm-fase-head"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`${open ? 'Tutup' : 'Buka'} fase ${fase.no} ${fase.title}`}
      >
        <span className="rm-fase-title">
          <span className="rm-fase-no">{fase.no}</span>
          <span className="rm-fase-name">
            {fase.title}
            <span className="rm-fase-meta">{fase.duration}</span>
          </span>
        </span>
        <span className="rm-fase-side">
          <span className="rm-fase-count">
            {done}/{total}
          </span>
          <span className="rm-fase-chev" aria-hidden="true">
            {open ? '–' : '+'}
          </span>
        </span>
        <span className="rm-fase-bar" aria-hidden="true">
          <span className="rm-fase-bar-fill" style={{ width: `${pct}%` }} />
        </span>
      </button>

      {open ? (
        <div className="rm-fase-body">
          <p className="rm-fase-goal">{fase.goal}</p>
          <div className="rm-items">
            {fase.items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                rec={progress[item.id]}
                open={openItems.has(item.id)}
                onToggle={() => onToggleItem(item.id)}
                onCycle={onCycle}
                onChange={onChange}
              />
            ))}
          </div>
          <div className="rm-checkpoint">
            <span className="rm-checkpoint-label">checkpoint</span>
            {fase.checkpoint}
          </div>
        </div>
      ) : null}
    </section>
  )
}

function RoadmapPage() {
  const { data, setStatus, updateDetail, resetAll, stats } = useRoadmapProgress()
  const [openFases, setOpenFases] = useState(() => new Set(['fase-0']))
  const [openItems, setOpenItems] = useState(() => new Set())

  const pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0

  const toggleSet = (setter, id) =>
    setter((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const handleReset = () => {
    if (window.confirm('Beneran mau reset semua progress roadmap? Aksi ini nggak bisa di-undo.')) {
      resetAll()
      setOpenItems(new Set())
    }
  }

  return (
    <div className="rm-page">
      <section className="rm-dashboard container">
        <p className="eyebrow">Roadmap Belajar</p>
        <h1>
          Dari nol sampai<br />
          siap kerja NOC.
        </h1>
        <p className="rm-dash-sub">
          8 fase · {stats.total} item. Klik pill status buat nandain progres, expand item untuk
          catat tanggal &amp; catatan.
        </p>

        <div className="rm-prog-wrap">
          <div className="rm-prog-label">
            <span>Progress keseluruhan</span>
            <span className="rm-prog-value">{pct}%</span>
          </div>
          <div
            className="rm-bar"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="rm-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="rm-stats">
          <span className="rm-stat rm-stat-ok">{stats.done}</span>
          <span className="rm-stat-label">selesai</span>
          <span className="rm-stat rm-stat-warn">{stats.inProgress}</span>
          <span className="rm-stat-label">berjalan</span>
          <span className="rm-stat">{stats.notStarted}</span>
          <span className="rm-stat-label">belum mulai</span>
        </div>

        <button type="button" className="rm-reset" onClick={handleReset}>
          Reset semua progress
        </button>
      </section>

      <section className="rm-fases">
        {ROADMAP.map((fase) => (
          <Fase
            key={fase.id}
            fase={fase}
            open={openFases.has(fase.id)}
            onToggle={() => toggleSet(setOpenFases, fase.id)}
            progress={data}
            openItems={openItems}
            onToggleItem={(id) => toggleSet(setOpenItems, id)}
            onCycle={(id) => setStatus(id, STATUS_NEXT[data[id]?.status] || STATUS.jalan)}
            onChange={updateDetail}
          />
        ))}
      </section>
    </div>
  )
}

export default RoadmapPage