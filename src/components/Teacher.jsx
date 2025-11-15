import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Grid, Icon, Toggle } from './UI'

const BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Teacher() {
  const [students, setStudents] = useState([])
  const [className, setClassName] = useState('6A')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [attendance, setAttendance] = useState({})
  const [file, setFile] = useState(null)
  const [subject, setSubject] = useState('Maths')

  useEffect(()=>{
    fetch(`${BASE}/api/students?class_name=${className}`).then(r=>r.json()).then(data=>{
      setStudents(data)
    }).catch(()=>setStudents([]))
  },[className])

  const presentCount = useMemo(()=> Object.values(attendance).filter(v=>v==='present').length, [attendance])

  const toggleAttendance = (id) => {
    setAttendance(prev => {
      const newVal = prev[id] === 'present' ? 'absent' : 'present'
      // Optimistic set then call API
      fetch(`${BASE}/api/attendance/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: id, date, status: newVal })
      }).catch(()=>{})
      return { ...prev, [id]: newVal }
    })
  }

  const upload = async (e) => {
    e.preventDefault()
    if (!file) return
    const form = new FormData()
    form.append('file', file)
    form.append('uploaded_by', 'Teacher A')
    form.append('subject', subject)
    form.append('class_name', className)
    await fetch(`${BASE}/api/upload`, { method: 'POST', body: form })
  }

  return (
    <Grid>
      <Card title="Upload Files" icon={Icon.Upload}>
        <form onSubmit={upload} className="flex flex-col sm:flex-row items-center gap-3">
          <input type="file" onChange={e=>setFile(e.target.files?.[0])} className="block w-full text-sm text-slate-700 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Subject" className="px-3 py-2 rounded-xl border"/>
          <input value={className} onChange={e=>setClassName(e.target.value)} placeholder="Class" className="px-3 py-2 rounded-xl border"/>
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">Upload</button>
        </form>
      </Card>

      <Card title="Attendance" icon={Icon.Users} action={<div className="text-xs text-slate-500">{presentCount} present</div>}>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="px-3 py-2 rounded-xl border"/>
          <input value={className} onChange={e=>setClassName(e.target.value)} className="px-3 py-2 rounded-xl border"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {students.map(s => (
            <div key={s._id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-slate-500">{s.roll_no}</div>
              </div>
              <Toggle checked={attendance[s._id] === 'present'} onChange={() => toggleAttendance(s._id)} />
            </div>
          ))}
        </div>
      </Card>
    </Grid>
  )
}
