import { useEffect, useState } from 'react'
import { Card, Grid, Icon } from './UI'

const BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Student() {
  const [className] = useState('6A')
  const [subject, setSubject] = useState('Maths')
  const [notes, setNotes] = useState([])
  const [assignments, setAssignments] = useState([])
  const [worksheets, setWorksheets] = useState([])
  const [attendance, setAttendance] = useState('N/A')

  useEffect(() => {
    const today = new Date().toISOString().slice(0,10)
    fetch(`${BASE}/api/notes?class_name=${className}&subject=${subject}`).then(r=>r.json()).then(setNotes)
    fetch(`${BASE}/api/assignments?class_name=${className}&subject=${subject}`).then(r=>r.json()).then(setAssignments)
    fetch(`${BASE}/api/worksheets?class_name=${className}&subject=${subject}`).then(r=>r.json()).then(setWorksheets)
    fetch(`${BASE}/api/attendance?date_value=${today}`).then(r=>r.json()).then(data=>{
      setAttendance(data.length ? 'Recorded' : 'Not Recorded')
    }).catch(()=>setAttendance('Not Recorded'))
  }, [className, subject])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input value={subject} onChange={e=>setSubject(e.target.value)} className="px-3 py-2 rounded-xl border"/>
        <div className="text-sm text-slate-500">Class {className}</div>
      </div>
      <Grid>
        <Card title="Notes" icon={Icon.BookOpen}>
          <ul className="space-y-2">
            {notes.map((n, i)=>(
              <li key={i} className="p-3 rounded-xl bg-slate-50 border">
                <div className="font-medium">{n.title}</div>
                <div className="text-xs text-slate-500">{n.subject}</div>
              </li>
            ))}
            {notes.length===0 && <div className="text-slate-500 text-sm">No notes yet</div>}
          </ul>
        </Card>
        <Card title="Assignments" icon={Icon.ClipboardList}>
          <ul className="space-y-2">
            {assignments.map((a, i)=>(
              <li key={i} className="p-3 rounded-xl bg-slate-50 border">
                <div className="font-medium">{a.title}</div>
                <div className="text-xs text-slate-500">Due: {a.due_date}</div>
              </li>
            ))}
            {assignments.length===0 && <div className="text-slate-500 text-sm">No assignments</div>}
          </ul>
        </Card>
        <Card title="Worksheets" icon={Icon.FileText}>
          <ul className="space-y-2">
            {worksheets.map((w, i)=>(
              <li key={i} className="p-3 rounded-xl bg-slate-50 border">
                <div className="font-medium">{w.title}</div>
              </li>
            ))}
            {worksheets.length===0 && <div className="text-slate-500 text-sm">No worksheets</div>}
          </ul>
        </Card>
        <Card title="Attendance Status" icon={Icon.Users}>
          <div className="text-sm">{attendance}</div>
        </Card>
      </Grid>
    </div>
  )
}
