import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ProgressProvider } from './contexts/ProgressContext'

// Import pages
import Dashboard from './pages/Dashboard'
import DayView from './pages/DayView'
import RoadmapOverview from './pages/RoadmapOverview'
import Stats from './pages/Stats'

// Import layout components
import Header from './components/layout/Header'
import BottomNav from './components/layout/BottomNav'

function App() {
  return (
    <ProgressProvider>
      <Router basename="/GoalAchiever">
        <div className="min-h-screen bg-dark-bg-primary text-dark-text-primary">
          {/* Header - visible on all pages */}
          <Header />

          {/* Main content */}
          <main className="pb-20 md:pb-8">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/day/:dayNumber" element={<DayView />} />
                <Route path="/roadmap" element={<RoadmapOverview />} />
                <Route path="/stats" element={<Stats />} />
              </Routes>
            </AnimatePresence>
          </main>

          {/* Bottom navigation - mobile only */}
          <BottomNav />
        </div>
      </Router>
    </ProgressProvider>
  )
}

export default App
