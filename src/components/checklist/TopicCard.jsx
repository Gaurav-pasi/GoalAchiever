import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '../../contexts/ProgressContext'
import { getPriorityColor, getPriorityLabel } from '../../utils/progressCalculator'
import PhaseCheckbox from './PhaseCheckbox'
import ProgressBar from './ProgressBar'

export default function TopicCard({ topic, dayNumber }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const {
    toggleTheory,
    toggleInterviewQuestions,
    updateInterviewCounter,
    toggleHandson
  } = useProgress()

  const priorityColor = getPriorityColor(topic.priority)
  const priorityLabel = getPriorityLabel(topic.priority)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card card-hover"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold ${priorityColor}`}>
              {priorityLabel}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-dark-text-primary">
            {topic.name}
          </h3>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="touch-target p-2 rounded-lg hover:bg-dark-bg-cardHover transition-colors"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <ProgressBar topic={topic} />
      </div>

      {/* Phases */}
      <div className="space-y-3">
        {/* Theory */}
        <PhaseCheckbox
          type="theory"
          checked={topic.theory.completed}
          onChange={() => toggleTheory(dayNumber, topic.id)}
          label="Theory Learned"
        />

        {/* Interview Questions */}
        <PhaseCheckbox
          type="interview"
          checked={topic.interviewQuestions.completed}
          onChange={() => toggleInterviewQuestions(dayNumber, topic.id)}
          label="Interview Questions"
          counter={topic.interviewQuestions.questionsAnswered}
          maxCounter={topic.interviewQuestions.totalQuestions}
          onCounterChange={(newCount) => updateInterviewCounter(dayNumber, topic.id, newCount)}
        />

        {/* Hands-on Project */}
        <PhaseCheckbox
          type="handson"
          checked={topic.handson.completed}
          onChange={() => toggleHandson(dayNumber, topic.id)}
          label="Hands-on Project"
        />
      </div>

      {/* Expandable Notes Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-gray-800 space-y-3">
              {/* Theory Notes */}
              <div>
                <label className="text-xs font-medium text-dark-text-secondary block mb-1">
                  Theory Notes
                </label>
                <textarea
                  placeholder="Add your notes here..."
                  className="w-full px-3 py-2 bg-dark-bg-secondary border border-gray-700 rounded-lg text-sm text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  rows={3}
                  defaultValue={topic.theory.notes}
                />
              </div>

              {/* Interview Notes */}
              <div>
                <label className="text-xs font-medium text-dark-text-secondary block mb-1">
                  Interview Question Notes
                </label>
                <textarea
                  placeholder="Key questions and answers..."
                  className="w-full px-3 py-2 bg-dark-bg-secondary border border-gray-700 rounded-lg text-sm text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  rows={3}
                  defaultValue={topic.interviewQuestions.notes}
                />
              </div>

              {/* Hands-on Notes */}
              <div>
                <label className="text-xs font-medium text-dark-text-secondary block mb-1">
                  Hands-on Project Details
                </label>
                <input
                  type="text"
                  placeholder="Project name"
                  className="w-full px-3 py-2 bg-dark-bg-secondary border border-gray-700 rounded-lg text-sm text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
                  defaultValue={topic.handson.projectName}
                />
                <input
                  type="url"
                  placeholder="GitHub link"
                  className="w-full px-3 py-2 bg-dark-bg-secondary border border-gray-700 rounded-lg text-sm text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
                  defaultValue={topic.handson.githubLink}
                />
                <textarea
                  placeholder="Project notes..."
                  className="w-full px-3 py-2 bg-dark-bg-secondary border border-gray-700 rounded-lg text-sm text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  rows={2}
                  defaultValue={topic.handson.notes}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
