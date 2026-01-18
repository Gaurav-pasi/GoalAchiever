import { useState } from 'react'
import { Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPriorityLabel, getPriorityColor } from '../../utils/progressCalculator'

const priorities = [
  { value: null, label: 'All Topics' },
  { value: 0, label: getPriorityLabel(0) },
  { value: 1, label: getPriorityLabel(1) },
  { value: 2, label: getPriorityLabel(2) },
  { value: 3, label: getPriorityLabel(3) },
]

export default function PriorityFilter({ selectedPriority, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (priority) => {
    onChange(priority)
    setIsOpen(false)
  }

  const currentLabel = selectedPriority === null
    ? 'All Topics'
    : getPriorityLabel(selectedPriority)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-dark-bg-card border border-gray-800 rounded-lg hover:bg-dark-bg-cardHover transition-colors touch-target"
      >
        <Filter size={18} />
        <span className="text-sm font-medium">{currentLabel}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-48 bg-dark-bg-card border border-gray-800 rounded-lg shadow-2xl overflow-hidden z-20"
            >
              {priorities.map(({ value, label }) => {
                const isSelected = value === selectedPriority
                const colorClass = value !== null ? getPriorityColor(value) : ''

                return (
                  <button
                    key={value ?? 'all'}
                    onClick={() => handleSelect(value)}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-dark-bg-cardHover transition-colors ${
                      isSelected ? 'bg-emerald-600/10 text-emerald-400' : 'text-dark-text-secondary'
                    }`}
                  >
                    <span className={value !== null ? colorClass : ''}>
                      {label}
                    </span>
                    {isSelected && (
                      <span className="ml-2 text-emerald-400">✓</span>
                    )}
                  </button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
