import { Github, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="hidden md:block bg-dark-bg-secondary border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-dark-text-muted">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>for Backend Engineers</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-dark-text-muted hover:text-emerald-400 transition-colors"
            >
              <Github size={16} />
              <span>View on GitHub</span>
            </a>
          </div>

          <div className="text-sm text-dark-text-muted">
            © {currentYear} Goal Achiever. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
