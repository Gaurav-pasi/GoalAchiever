import { useState } from 'react'
import { CheckCircle2, Circle, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuestionCard({ question, onToggle, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedAnswer, setEditedAnswer] = useState(question.answer || '')

  const handleSave = () => {
    onEdit(question.id, { ...question, answer: editedAnswer })
    setIsEditing(false)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'System Design': 'bg-blue-600/20 text-blue-400',
      'Database': 'bg-purple-600/20 text-purple-400',
      'Security': 'bg-red-600/20 text-red-400',
      'API': 'bg-green-600/20 text-green-400',
      'DevOps': 'bg-orange-600/20 text-orange-400',
      'Performance': 'bg-yellow-600/20 text-yellow-400',
    }
    return colors[category] || 'bg-gray-600/20 text-gray-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card border border-gray-800 hover:border-gray-700 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(question.id)}
          className="mt-1 flex-shrink-0"
        >
          {question.completed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <Circle className="w-5 h-5 text-gray-600 hover:text-gray-500" />
          )}
        </button>

        {/* Question Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className={`text-sm font-medium ${question.completed ? 'text-gray-400 line-through' : 'text-dark-text-primary'}`}>
              {question.question}
            </h4>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(question.category)}`}>
                {question.category}
              </span>
            </div>
          </div>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {question.tags.map((tag, idx) => (
                <span key={idx} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Answer Section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 pt-3 border-t border-gray-800"
              >
                {isEditing ? (
                  <div>
                    <textarea
                      value={editedAnswer}
                      onChange={(e) => setEditedAnswer(e.target.value)}
                      placeholder="Write your answer here..."
                      className="w-full px-3 py-2 bg-dark-bg-secondary border border-gray-700 rounded-lg text-sm text-dark-text-primary placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                      rows={6}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleSave}
                        className="btn-primary text-xs px-3 py-1"
                      >
                        Save Answer
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn-secondary text-xs px-3 py-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-dark-text-secondary">Your Answer:</p>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        <Edit2 size={12} />
                        Edit
                      </button>
                    </div>
                    {question.answer ? (
                      <p className="text-sm text-dark-text-secondary whitespace-pre-wrap">
                        {question.answer}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-600 italic">
                        No answer yet. Click Edit to add your answer.
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Actions */}
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={14} />
                  Hide Answer
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  {question.answer ? 'View Answer' : 'Add Answer'}
                </>
              )}
            </button>
            <button
              onClick={() => onDelete(question.id)}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
            >
              <Trash2 size={12} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
