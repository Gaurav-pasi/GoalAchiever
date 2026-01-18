import { NavLink } from 'react-router-dom'
import { Home, Calendar, Map, BarChart3 } from 'lucide-react'
import { useProgress } from '../../contexts/ProgressContext'

export default function BottomNav() {
  const { progress } = useProgress()

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
      exact: true
    },
    {
      icon: Calendar,
      label: 'Today',
      path: `/day/${progress.currentDay}`,
    },
    {
      icon: Map,
      label: 'Roadmap',
      path: '/roadmap',
    },
    {
      icon: BarChart3,
      label: 'Stats',
      path: '/stats',
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-bg-secondary border-t border-gray-800 md:hidden z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ icon: Icon, label, path, exact }) => (
          <NavLink
            key={path}
            to={path}
            end={exact}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 touch-target ${
                isActive
                  ? 'text-emerald-400 scale-105'
                  : 'text-dark-text-secondary hover:text-dark-text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} className={isActive ? 'animate-scale-in' : ''} />
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
