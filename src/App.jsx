import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Teacher from './components/Teacher'
import Student from './components/Student'
import Attendance from './components/Attendance'
import { Navbar, Page, Shell } from './components/UI'

export default function App() {
  const location = useLocation()
  return (
    <Page>
      <Navbar />
      <div className="pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Shell title="Dashboard"><Dashboard/></Shell>} />
              <Route path="/teacher" element={<Shell title="Teacher Dashboard"><Teacher/></Shell>} />
              <Route path="/student" element={<Shell title="Student Dashboard"><Student/></Shell>} />
              <Route path="/attendance" element={<Shell title="Attendance"><Attendance/></Shell>} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </Page>
  )
}
