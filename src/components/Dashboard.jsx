import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Grid, Icon } from './UI'

const SectionList = ({ items = [], empty = 'No items yet' }) => (
  <ul className="space-y-2">
    <AnimatePresence>
      {items.length === 0 && (
        <motion.li initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} className="text-slate-500 text-sm">{empty}</motion.li>
      )}
      {items.map((i, idx) => (
        <motion.li key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="font-medium text-slate-800">{i.title}</div>
          {i.subject && <div className="text-xs text-slate-500">{i.subject}</div>}
        </motion.li>
      ))}
    </AnimatePresence>
  </ul>
)

export default function Dashboard() {
  const [notes, setNotes] = useState([])
  const [assignments, setAssignments] = useState([])
  const [worksheets, setWorksheets] = useState([])
  const [attendance, setAttendance] = useState([])
  const [circulars, setCirculars] = useState([])
  const [events, setEvents] = useState([])

  const BASE = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(() => {
    const load = async () => {
      const [n, a, w, c, e] = await Promise.all([
        fetch(`${BASE}/api/notes`).then(r => r.json()),
        fetch(`${BASE}/api/assignments`).then(r => r.json()),
        fetch(`${BASE}/api/worksheets`).then(r => r.json()),
        fetch(`${BASE}/api/circulars`).then(r => r.json()),
        fetch(`${BASE}/api/events`).then(r => r.json()),
      ])
      setNotes(n)
      setAssignments(a)
      setWorksheets(w)
      setCirculars(c)
      setEvents(e)
      const today = new Date().toISOString().slice(0,10)
      fetch(`${BASE}/api/attendance?date_value=${today}`).then(r=>r.json()).then(setAttendance).catch(()=>{})
    }
    load()
  }, [])

  return (
    <Grid>
      <Card title="Notes" icon={Icon.BookOpen}>
        <SectionList items={notes} empty="No notes yet" />
      </Card>
      <Card title="Assignments" icon={Icon.ClipboardList}>
        <SectionList items={assignments} empty="No assignments yet" />
      </Card>
      <Card title="Worksheets" icon={Icon.FileText}>
        <SectionList items={worksheets} empty="No worksheets yet" />
      </Card>
      <Card title="Attendance" icon={Icon.Users}>
        <div className="text-sm text-slate-600">{attendance.length} records for today</div>
      </Card>
      <Card title="Circulars" icon={Icon.Megaphone}>
        <SectionList items={circulars} empty="No circulars" />
      </Card>
      <Card title="Events" icon={Icon.CalendarDays}>
        <SectionList items={events} empty="No events" />
      </Card>
    </Grid>
  )
}
