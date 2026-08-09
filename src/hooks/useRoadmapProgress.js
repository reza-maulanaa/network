import { useEffect, useMemo, useState } from 'react'
import { ROADMAP } from '../data/roadmap.js'

const STORAGE_KEY = 'noc-roadmap-progress-v2'

export const STATUS = {
  belum: 'belum',
  jalan: 'jalan',
  selesai: 'selesai',
}

export const STATUS_NEXT = {
  belum: STATUS.jalan,
  jalan: STATUS.selesai,
  selesai: STATUS.belum,
}

export const STATUS_LABEL = {
  belum: 'Belum Mulai',
  jalan: 'Sedang Berjalan',
  selesai: 'Selesai',
}

const EMPTY = { status: STATUS.belum, catatan: '', link: '', mulai: '', selesai: '' }

const ALL_ITEMS = ROADMAP.flatMap((fase) => fase.items)

function defaultMap() {
  return Object.fromEntries(ALL_ITEMS.map((item) => [item.id, { ...EMPTY }]))
}

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultMap()
    const parsed = JSON.parse(raw)
    const base = defaultMap()
    for (const item of ALL_ITEMS) {
      const saved = parsed[item.id]
      if (saved) base[item.id] = { ...EMPTY, ...saved }
    }
    return base
  } catch {
    return defaultMap()
  }
}

export function useRoadmapProgress() {
  const [data, setData] = useState(load)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // storage penuh / private mode — progress cuma di memori, jangan crash
    }
  }, [data])

  const setStatus = (id, status) =>
    setData((d) => ({ ...d, [id]: { ...d[id], status } }))

  const updateDetail = (id, patch) =>
    setData((d) => ({ ...d, [id]: { ...d[id], ...patch } }))

  const resetAll = () => setData(defaultMap())

  const stats = useMemo(() => {
    const total = ALL_ITEMS.length
    let done = 0
    let inProgress = 0
    for (const item of ALL_ITEMS) {
      const st = data[item.id]?.status || STATUS.belum
      if (st === STATUS.selesai) done++
      else if (st === STATUS.jalan) inProgress++
    }
    return { total, done, inProgress, notStarted: total - done - inProgress }
  }, [data])

  return { data, setStatus, updateDetail, resetAll, stats }
}
