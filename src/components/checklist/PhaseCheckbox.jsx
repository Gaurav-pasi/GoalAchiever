import AnimatedCheckbox from '../animations/AnimatedCheckbox'
import { Book, MessageSquare, Code, Plus, Minus } from 'lucide-react'

const phaseIcons = {
  theory: Book,
  interview: MessageSquare,
  handson: Code
}

export default function PhaseCheckbox({
  type,
  checked,
  onChange,
  counter,
  onCounterChange,
  maxCounter,
  label
}) {
  const Icon = phaseIcons[type]

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-dark-bg-secondary/50 border border-gray-800 hover:border-gray-700 transition-colors">
      <AnimatedCheckbox
        checked={checked}
        onChange={onChange}
        size="md"
      />

      <Icon size={18} className={checked ? 'text-emerald-400' : 'text-dark-text-muted'} />

      <div className="flex-1">
        <p className={`text-sm font-medium ${checked ? 'text-dark-text-primary' : 'text-dark-text-secondary'}`}>
          {label}
        </p>

        {/* Counter for interview questions */}
        {type === 'interview' && counter !== undefined && (
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCounterChange(Math.max(0, counter - 1))
              }}
              disabled={counter === 0}
              className="touch-target p-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease count"
            >
              <Minus size={14} />
            </button>

            <span className="text-xs font-mono text-dark-text-secondary min-w-[60px] text-center">
              {counter} / {maxCounter}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation()
                onCounterChange(Math.min(maxCounter, counter + 1))
              }}
              disabled={counter === maxCounter}
              className="touch-target p-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase count"
            >
              <Plus size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
