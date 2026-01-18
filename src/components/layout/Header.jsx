import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Target } from 'lucide-react'
import { useState } from 'react'
import { useProgress } from '../../contexts/ProgressContext'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { stats } = useProgress()
  const location = useLocation()

  return (
    <>
      <header className="sticky top-0 z-40 bg-dark-bg-secondary border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Logo and Title */}
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity min-w-0 flex-1"
            >
              <Target className="w-8 h-8 text-emerald-500 flex-shrink-0" />
              <div className="hidden sm:block min-w-0">
                <h1 className="text-xl font-bold text-dark-text-primary">
                  Goal Achiever
                </h1>
                <p className="text-xs text-dark-text-secondary">
                  Backend Engineer Roadmap
                </p>
              </div>
              <div className="sm:hidden min-w-0 flex-1">
                <h1 className="text-base font-bold text-dark-text-primary truncate">
                  Goal Achiever
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'text-emerald-400'
                    : 'text-dark-text-secondary hover:text-dark-text-primary'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/roadmap"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/roadmap'
                    ? 'text-emerald-400'
                    : 'text-dark-text-secondary hover:text-dark-text-primary'
                }`}
              >
                Roadmap
              </Link>
            </nav>

            {/* Progress Badge */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-dark-text-secondary">Overall Progress</p>
                <p className="text-lg font-bold text-emerald-400">
                  {stats.overallProgress}%
                </p>
              </div>
              <div className="w-16 h-16">
                <svg className="transform -rotate-90" width="64" height="64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - stats.overallProgress / 100)}`}
                    className="text-emerald-500 transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-dark-text-primary hover:text-emerald-400 transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Progress Bar */}
          <div className="md:hidden pb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-dark-text-secondary">Progress</span>
              <span className="text-xs font-medium text-emerald-400">
                {stats.overallProgress}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-500 rounded-full"
                style={{ width: `${stats.overallProgress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
