import { useState } from 'react'
import { Filter, Search } from 'lucide-react'
import QuestionCard from './QuestionCard'
import QuestionForm from './QuestionForm'
import { AnimatePresence } from 'framer-motion'

export default function QuestionList({ questions, onAdd, onToggle, onEdit, onDelete, topicName }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all') // all, completed, pending

  const categories = [
    'all',
    'System Design',
    'Database',
    'Security',
    'API',
    'DevOps',
    'Performance',
    'Caching',
    'Messaging',
    'Cloud',
    'Other'
  ]

  // Filter questions
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.answer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = filterCategory === 'all' || q.category === filterCategory

    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'completed' && q.completed) ||
                         (filterStatus === 'pending' && !q.completed)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const completedCount = questions.filter(q => q.completed).length
  const totalCount = questions.length

  return (
    <div className="space-y-4">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-dark-text-primary">
            Interview Questions
          </h3>
          <p className="text-sm text-dark-text-secondary">
            {completedCount} of {totalCount} answered
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            completedCount === totalCount && totalCount > 0
              ? 'bg-emerald-600/20 text-emerald-400'
              : 'bg-gray-700 text-gray-400'
          }`}>
            {totalCount === 0 ? 'No questions yet' :
             completedCount === totalCount ? '✓ Complete' :
             `${Math.round((completedCount / totalCount) * 100)}% done`}
          </span>
        </div>
      </div>

      {/* Add Question Form */}
      <QuestionForm onAdd={onAdd} topicName={topicName} />

      {/* Search and Filters */}
      {totalCount > 0 && (
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions, answers, or tags..."
              className="w-full pl-10 pr-4 py-2 bg-dark-bg-secondary border border-gray-700 rounded-lg text-sm text-dark-text-primary placeholder-gray-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1 bg-dark-bg-secondary border border-gray-700 rounded-lg text-xs text-dark-text-primary focus:outline-none focus:border-emerald-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1 bg-dark-bg-secondary border border-gray-700 rounded-lg text-xs text-dark-text-primary focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Answered</option>
            </select>

            {(searchTerm || filterCategory !== 'all' || filterStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterCategory('all')
                  setFilterStatus('all')
                }}
                className="text-xs text-emerald-400 hover:text-emerald-300"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredQuestions.length === 0 ? (
            <div className="card text-center py-8">
              <p className="text-dark-text-secondary text-sm">
                {totalCount === 0
                  ? 'No interview questions yet. Click "Add Interview Question" to get started!'
                  : 'No questions match your filters.'}
              </p>
            </div>
          ) : (
            filteredQuestions.map(question => (
              <QuestionCard
                key={question.id}
                question={question}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer Stats */}
      {filteredQuestions.length > 0 && (
        <div className="text-xs text-gray-600 text-center pt-2">
          Showing {filteredQuestions.length} of {totalCount} questions
        </div>
      )}
    </div>
  )
}
