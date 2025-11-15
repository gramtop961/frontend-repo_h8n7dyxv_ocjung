import { useEffect, useMemo, useState } from 'react'
import { Card, Grid, Icon, Toggle } from './UI'

const BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Attendance() {
  const [className, setClassName] = useState('6A')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState({})
  const [loading, setLoading] = useState(false)

  const presentCount = useMemo(()=> Object.values(attendance).filter(v=>v==='present').length, [attendance])

  // Load students for class
  useEffect(()=>{
    fetch(`${BASE}/api/students?class_name=${className}`)
      .then(r=>r.json())
      .then(setStudents)
      .catch(()=>setStudents([]))
  },[className])

  // Load attendance for date
  useEffect(()=>{
    setLoading(true)
    fetch(`${BASE}/api/attendance?date_value=${date}`)
      .then(r=>r.json())
      .then((rows)=>{
        const map = {}
        rows.forEach(r=>{ map[r.student_id] = r.status })
        setAttendance(map)
      })
      .catch(()=>setAttendance({}))
      .finally(()=>setLoading(false))
  },[date, className])

  const toggleAttendance = (id) => {
    setAttendance(prev => {
      const newVal = prev[id] === 'present' ? 'absent' : 'present'
      fetch(`${BASE}/api/attendance/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: id, date, status: newVal })
      }).catch(()=>{})
      return { ...prev, [id]: newVal }
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 border">
          <Icon.CalendarDays size={16} className="text-blue-600"/>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="outline-none"/>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 border">
          <Icon.Users size={16} className="text-blue-600"/>
          <input value={className} onChange={e=>setClassName(e.target.value)} className="outline-none"/>
        </div>
        <div className="text-sm text-slate-500">{presentCount} present</div>
      </div>

      <Grid>
        <Card title="Attendance" icon={Icon.Users} action={<div className="text-xs text-slate-500">{loading ? 'Loading…' : `${presentCount}/${students.length} present`}</div>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {students.map(s => (
              <div key={s._id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.roll_no}</div>
                </div>
                <Toggle checked={attendance[s._id] === 'present'} onChange={() => toggleAttendance(s._id)} />
              </div>
            ))}
            {students.length===0 && (
              <div className="text-sm text-slate-500">No students found for this class</div>
            )}
          </div>
        </Card>
      </Grid>
    </div>
  )
}
