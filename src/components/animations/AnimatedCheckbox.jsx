import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const checkboxVariants = {
  unchecked: { scale: 1 },
  checked: { scale: [1, 1.2, 1] }
}

const checkVariants = {
  unchecked: { pathLength: 0, opacity: 0 },
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}

export default function AnimatedCheckbox({
  checked,
  onChange,
  label,
  className = '',
  size = 'md'
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  const handleClick = () => {
    triggerHaptic()
    onChange(!checked)
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 touch-target ${className}`}
      type="button"
    >
      <motion.div
        variants={checkboxVariants}
        animate={checked ? 'checked' : 'unchecked'}
        className={`${sizeClasses[size]} rounded border-2 flex items-center justify-center transition-colors ${
          checked
            ? 'bg-emerald-600 border-emerald-600'
            : 'bg-transparent border-gray-600 hover:border-gray-500'
        }`}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Check size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} className="text-white" />
          </motion.div>
        )}
      </motion.div>
      {label && (
        <span className={`text-sm ${checked ? 'text-dark-text-primary' : 'text-dark-text-secondary'}`}>
          {label}
        </span>
      )}
    </button>
  )
}
