import { Book, MessageSquare, Code, CheckCircle } from 'lucide-react'
import { calculateDayProgress, calculateDSAProgress } from '../../utils/progressCalculator'
import AnimatedProgress from '../animations/AnimatedProgress'
import { motion } from 'framer-motion'

export default function DayStats({ day }) {
  const dayProgress = calculateDayProgress(day)
  const dsaProgress = calculateDSAProgress(day)

  // Calculate individual phase completions
  const theoryCompleted = day.topics.filter(t => t.theory.completed).length
  const interviewCompleted = day.topics.filter(t => t.interviewQuestions.completed).length
  const handsonCompleted = day.topics.filter(t => t.handson.completed).length
  const totalTopics = day.topics.length

  const stats = [
    {
      icon: Book,
      label: 'Theory',
      value: theoryCompleted,
      total: totalTopics,
      color: 'text-blue-500'
    },
    {
      icon: MessageSquare,
      label: 'Interview',
      value: interviewCompleted,
      total: totalTopics,
      color: 'text-yellow-500'
    },
    {
      icon: Code,
      label: 'Hands-on',
      value: handsonCompleted,
      total: totalTopics,
      color: 'text-purple-500'
    },
    {
      icon: CheckCircle,
      label: 'DSA Problems',
      value: dsaProgress.completed,
      total: dsaProgress.total,
      color: 'text-emerald-500'
    }
  ]

  return (
    <div className="card">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-dark-text-primary">
            Day Progress
          </h3>
          <span className="text-2xl font-bold text-emerald-400">
            {dayProgress.percentage}%
          </span>
        </div>
        <AnimatedProgress percentage={dayProgress.percentage} showLabel={false} height="h-3" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        {stats.map(({ icon: Icon, label, value, total, color }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-bg-secondary/50 rounded-lg p-3 border border-gray-800"
          >
            <Icon className={`${color} mb-2`} size={20} />
            <p className="text-xs text-dark-text-muted mb-1">{label}</p>
            <p className="text-lg font-bold text-dark-text-primary">
              {value}/{total}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Deliverables */}
      {day.deliverables && day.deliverables.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <h4 className="text-sm font-semibold text-dark-text-secondary mb-2">
            Deliverables
          </h4>
          <ul className="space-y-1">
            {day.deliverables.map((deliverable, index) => (
              <li key={index} className="text-xs text-dark-text-muted flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
