import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuestionForm({ onAdd, topicName }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    question: '',
    category: 'System Design',
    tags: ''
  })

  const categories = [
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.question.trim()) return

    const newQuestion = {
      id: `iq-${Date.now()}`,
      question: formData.question.trim(),
      answer: '',
      category: formData.category,
      completed: false,
      createdAt: new Date().toISOString(),
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      topicName
    }

    onAdd(newQuestion)

    // Reset form
    setFormData({
      question: '',
      category: 'System Design',
      tags: ''
    })
    setIsOpen(false)
  }

  return (
    <div>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full btn-secondary flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Add Interview Question
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card bg-dark-bg-secondary border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-dark-text-primary">
                Add New Interview Question
              </h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Question Input */}
              <div>
                <label className="block text-xs font-medium text-dark-text-secondary mb-2">
                  Question
                </label>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g., Explain the CAP theorem and give real-world examples"
                  className="w-full px-3 py-2 bg-dark-bg-primary border border-gray-700 rounded-lg text-sm text-dark-text-primary placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                  rows={3}
                  required
                />
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-xs font-medium text-dark-text-secondary mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-bg-primary border border-gray-700 rounded-lg text-sm text-dark-text-primary focus:outline-none focus:border-emerald-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-medium text-dark-text-secondary mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., scalability, distributed-systems, consistency"
                  className="w-full px-3 py-2 bg-dark-bg-primary border border-gray-700 rounded-lg text-sm text-dark-text-primary placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2">
                <button type="submit" className="btn-primary flex-1">
                  Add Question
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
