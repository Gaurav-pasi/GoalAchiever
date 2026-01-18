import { motion } from 'framer-motion'
import { getProgressColor } from '../../utils/progressCalculator'

export default function AnimatedProgress({
  percentage,
  showLabel = true,
  height = 'h-2',
  className = ''
}) {
  const colorClass = getProgressColor(percentage)

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-dark-text-secondary">Progress</span>
          <motion.span
            key={percentage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs font-medium text-emerald-400"
          >
            {percentage}%
          </motion.span>
        </div>
      )}
      <div className={`w-full ${height} bg-gray-700 rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full ${colorClass} rounded-full`}
          style={{
            backgroundImage: percentage > 0
              ? 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)'
              : 'none'
          }}
        />
      </div>
    </div>
  )
}

// Circular Progress variant
export function CircularProgress({ percentage, size = 64, strokeWidth = 6 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-700"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-emerald-500"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          key={percentage}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm font-bold text-emerald-400"
        >
          {percentage}%
        </motion.span>
      </div>
    </div>
  )
}
