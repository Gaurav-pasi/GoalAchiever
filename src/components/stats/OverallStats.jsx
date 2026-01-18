import { Book, MessageSquare, Code, Target } from 'lucide-react'
import CountUp from '../animations/CountUp'
import { CircularProgress } from '../animations/AnimatedProgress'
import StaggerContainer, { StaggerItem } from '../animations/StaggerContainer'
import { useProgress } from '../../contexts/ProgressContext'

export default function OverallStats() {
  const { stats } = useProgress()

  const statCards = [
    {
      icon: Target,
      label: 'Topics Completed',
      value: stats.topicsCompleted,
      total: stats.totalTopics,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      icon: Book,
      label: 'Theory Learned',
      value: stats.theoryCompleted,
      total: stats.totalTopics,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: MessageSquare,
      label: 'Interview Questions',
      value: stats.interviewsCompleted,
      total: stats.totalTopics,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: Code,
      label: 'Hands-on Projects',
      value: stats.handsonCompleted,
      total: stats.totalTopics,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Overall Progress Circle */}
      <div className="card text-center">
        <h2 className="text-xl font-bold text-dark-text-primary mb-6">
          Overall Progress
        </h2>
        <div className="flex justify-center mb-4">
          <CircularProgress percentage={stats.overallProgress} size={120} strokeWidth={8} />
        </div>
        <p className="text-dark-text-secondary text-sm">
          <CountUp end={stats.topicsCompleted} duration={1500} /> of {stats.totalTopics} topics completed
        </p>
      </div>

      {/* Stat Cards Grid */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ icon: Icon, label, value, total, color, bgColor }) => (
          <StaggerItem key={label}>
            <div className="card h-[180px] w-full flex flex-col">
              <div className={`inline-flex p-3 rounded-lg ${bgColor} mb-3`}>
                <Icon className={`${color}`} size={24} />
              </div>
              <p className="text-sm text-dark-text-secondary mb-1">{label}</p>
              <p className="text-2xl font-bold text-dark-text-primary flex-1">
                <CountUp end={value} duration={1000} /> / {total}
              </p>
              <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${bgColor} rounded-full transition-all duration-500`}
                  style={{ width: `${total > 0 ? (value / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
