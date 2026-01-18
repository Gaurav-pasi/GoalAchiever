import { Link, useLocation } from 'react-router-dom'
import { Home, Calendar, BarChart3, RotateCcw } from 'lucide-react'
import { useProgress } from '../../contexts/ProgressContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation()
  const { resetProgress } = useProgress()

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress()
      onClose()
    }
  }

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Calendar, label: 'Roadmap', path: '/roadmap' },
    { icon: BarChart3, label: 'Statistics', path: '/stats' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-64 bg-dark-bg-card border-l border-gray-800 z-50 md:hidden shadow-2xl"
          >
            <nav className="flex flex-col h-full p-6">
              {/* Menu Items */}
              <div className="flex-1 space-y-2">
                {menuItems.map(({ icon: Icon, label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors touch-target ${
                      location.pathname === path
                        ? 'bg-emerald-600 text-white'
                        : 'text-dark-text-secondary hover:bg-dark-bg-cardHover hover:text-dark-text-primary'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{label}</span>
                  </Link>
                ))}
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-600/10 transition-colors touch-target"
              >
                <RotateCcw size={20} />
                <span className="font-medium">Reset Progress</span>
              </button>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-xs text-dark-text-muted text-center">
                  Goal Achiever v1.0
                </p>
                <p className="text-xs text-dark-text-muted text-center mt-1">
                  Backend Engineer Roadmap
                </p>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
