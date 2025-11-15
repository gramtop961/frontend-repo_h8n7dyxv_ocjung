import { motion } from 'framer-motion'
import { Home, BookOpen, FileText, ClipboardList, Users, CalendarDays, Megaphone, Upload, Check, X, Menu, User, CheckCircle } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

export const Icon = { Home, BookOpen, FileText, ClipboardList, Users, CalendarDays, Megaphone, Upload, Check, X, Menu, User, CheckCircle }

export const Page = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 text-slate-800">
    <div className="fixed inset-0 bg-[radial-gradient(65%_40%_at_50%_0%,rgba(37,99,235,0.15),rgba(59,130,246,0)_70%)] pointer-events-none"/>
    {children}
  </div>
)

export const Shell = ({ title, children }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <motion.h1
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
    >
      {title}
    </motion.h1>
    <div className="mt-6">{children}</div>
  </div>
)

export const Navbar = () => {
  const links = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/teacher', label: 'Teacher', icon: Users },
    { to: '/student', label: 'Student', icon: User },
    { to: '/attendance', label: 'Attendance', icon: CheckCircle },
  ]
  return (
    <div className="sticky top-0 z-40 backdrop-blur-md bg-white/60 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-inner" />
          <span className="font-semibold text-slate-800">BlueSchool</span>
        </div>
        <nav className="flex items-center gap-1">
          {links.map(({ to, label, icon: IconC }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => `inline-flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              <IconC size={18} />
              <span className="hidden sm:block text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

export const Card = ({ title, icon: I, action, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    whileHover={{ y: -2 }}
    className="rounded-2xl bg-white/90 backdrop-blur p-4 shadow-[0_6px_30px_-12px_rgba(37,99,235,0.2)] border border-slate-200/60"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {I && <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-sm"><I size={18}/></div>}
        <h3 className="font-medium text-slate-800">{title}</h3>
      </div>
      {action}
    </div>
    <div className="text-sm text-slate-600">{children}</div>
  </motion.div>
)

export const Toggle = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)} className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${checked ? 'bg-green-500' : 'bg-slate-300'}`}>
    <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}></span>
  </button>
)

export const Grid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {children}
  </div>
)
