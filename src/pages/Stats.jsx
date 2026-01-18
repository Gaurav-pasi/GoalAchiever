import { useProgress } from '../contexts/ProgressContext'
import PageTransition from '../components/animations/PageTransition'
import OverallStats from '../components/stats/OverallStats'
import { BarChart3, TrendingUp, Award, Calendar } from 'lucide-react'
import { groupDaysByStatus } from '../utils/progressCalculator'

export default function Stats() {
  const { progress, stats } = useProgress()
  const { completed, inProgress } = groupDaysByStatus(progress.days)

  const achievements = [
    {
      icon: Award,
      title: 'Days Completed',
      value: completed.length,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      icon: TrendingUp,
      title: 'Days In Progress',
      value: inProgress.length,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: Calendar,
      title: 'Current Day',
      value: progress.currentDay,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: BarChart3,
      title: 'Overall Progress',
      value: `${stats.overallProgress}%`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ]

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-text-primary mb-2">
          Statistics
        </h1>
        <p className="text-dark-text-secondary">
          Track your learning progress and achievements
        </p>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {achievements.map(({ icon: Icon, title, value, color, bgColor }) => (
          <div key={title} className="card">
            <div className={`inline-flex p-3 rounded-lg ${bgColor} mb-3`}>
              <Icon className={color} size={24} />
            </div>
            <p className="text-sm text-dark-text-secondary mb-1">{title}</p>
            <p className="text-2xl font-bold text-dark-text-primary">{value}</p>
          </div>
        ))}
      </div>

      {/* Overall Stats */}
      <OverallStats />

      {/* Learning Streak (Future Enhancement) */}
      <div className="card mt-8">
        <h2 className="text-xl font-bold text-dark-text-primary mb-4">
          Coming Soon
        </h2>
        <div className="text-dark-text-secondary space-y-2">
          <p>📈 Learning streak tracking</p>
          <p>⏱️ Time spent per topic</p>
          <p>🎯 Difficulty ratings</p>
          <p>🚀 Completion velocity</p>
          <p>📊 Weekly progress charts</p>
        </div>
      </div>
    </PageTransition>
  )
}
