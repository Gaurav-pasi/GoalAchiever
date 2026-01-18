import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Trash2, CheckCircle } from 'lucide-react'

export default function SwipeableCard({ children, onDelete, onComplete }) {
  const x = useMotionValue(0)

  const background = useTransform(
    x,
    [-200, 0, 200],
    ['#ef4444', 'transparent', '#10b981']
  )

  const opacity = useTransform(x, [-200, -50, 0, 50, 200], [1, 0, 0, 0, 1])

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -150 && onDelete) {
      onDelete()
    } else if (info.offset.x > 150 && onComplete) {
      onComplete()
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Background indicators */}
      <motion.div
        className="absolute inset-0 flex items-center justify-between px-6"
        style={{ opacity }}
      >
        <div className="flex items-center gap-2 text-white">
          <Trash2 size={24} />
          <span className="font-medium">Delete</span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <span className="font-medium">Complete</span>
          <CheckCircle size={24} />
        </div>
      </motion.div>

      {/* Card content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        dragElastic={0.2}
        style={{ x, background }}
        onDragEnd={handleDragEnd}
        className="relative z-10 cursor-grab active:cursor-grabbing"
      >
        {children}
      </motion.div>
    </div>
  )
}
