import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, TrendingUp } from 'lucide-react'
import { useProgress } from '../contexts/ProgressContext'
import PageTransition from '../components/animations/PageTransition'
import OverallStats from '../components/stats/OverallStats'
import { calculateDayProgress } from '../utils/progressCalculator'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { progress } = useProgress()
  const currentDay = progress.days.find(d => d.dayNumber === progress.currentDay)
  const currentDayProgress = currentDay ? calculateDayProgress(currentDay) : null

  // Get recent activity (last 5 days with progress)
  const recentDays = progress.days
    .filter(day => {
      const dayProg = calculateDayProgress(day)
      return dayProg.percentage > 0
    })
    .slice(-5)
    .reverse()

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-dark-text-primary mb-2"
        >
          Welcome Back! 👋
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-dark-text-secondary"
        >
          Let's continue your backend engineering journey
        </motion.p>
      </div>

      {/* Current Day Card */}
      {currentDay && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card mb-8 gradient-primary"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-white" size={20} />
                <span className="text-white/80 text-sm font-medium">
                  Day {currentDay.dayNumber} of 60
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {currentDay.title}
              </h2>
              <p className="text-white/90 text-sm mb-4">
                {currentDay.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="text-white">
                  <span className="text-sm">Progress: </span>
                  <span className="text-xl font-bold">{currentDayProgress?.percentage}%</span>
                </div>
                <div className="text-white/80 text-sm">
                  {currentDay.topics.length} topics • {currentDay.dsaProblems.length} DSA problems
                </div>
              </div>
            </div>
            <Link
              to={`/day/${currentDay.dayNumber}`}
              className="btn-primary bg-white text-emerald-600 hover:bg-gray-100 flex items-center gap-2 whitespace-nowrap"
            >
              Continue Learning
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Overall Stats */}
      <OverallStats />

      {/* Recent Activity */}
      {recentDays.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-emerald-500" size={20} />
            <h2 className="text-xl font-bold text-dark-text-primary">
              Recent Activity
            </h2>
          </div>

          <div className="space-y-3">
            {recentDays.map((day) => {
              const dayProg = calculateDayProgress(day)
              return (
                <Link
                  key={day.dayNumber}
                  to={`/day/${day.dayNumber}`}
                  className="card card-hover block"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-dark-text-muted">
                          Day {day.dayNumber}
                        </span>
                        {dayProg.percentage === 100 && (
                          <span className="text-xs bg-emerald-600/20 text-emerald-400 px-2 py-0.5 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-dark-text-primary mb-2">
                        {day.title}
                      </h3>
                      <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all"
                          style={{ width: `${dayProg.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-400">
                        {dayProg.percentage}%
                      </p>
                      <p className="text-xs text-dark-text-muted">
                        {dayProg.completed}/{dayProg.total}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/roadmap" className="card card-hover">
          <h3 className="font-semibold text-dark-text-primary mb-2">
            View Full Roadmap
          </h3>
          <p className="text-sm text-dark-text-secondary">
            See all 60 days at a glance
          </p>
        </Link>
        <Link to={`/day/${progress.currentDay}`} className="card card-hover">
          <h3 className="font-semibold text-dark-text-primary mb-2">
            Today's Learning
          </h3>
          <p className="text-sm text-dark-text-secondary">
            Jump to Day {progress.currentDay}
          </p>
        </Link>
      </div>
    </PageTransition>
  )
}
