import AnimatedProgress from '../animations/AnimatedProgress'
import { motion } from 'framer-motion'

export default function ProgressBar({ topic }) {
  // Calculate topic progress
  let completed = 0
  if (topic.theory.completed) completed++
  if (topic.interviewQuestions.completed) completed++
  if (topic.handson.completed) completed++

  const percentage = Math.round((completed / 3) * 100)

  // Show confetti effect when 100% complete
  const isComplete = percentage === 100

  return (
    <div className="relative">
      <AnimatedProgress percentage={percentage} showLabel={true} />

      {/* Completion celebration */}
      {isComplete && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2"
        >
          <span className="text-2xl">🎉</span>
        </motion.div>
      )}
    </div>
  )
}
