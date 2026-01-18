import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CountUp({
  end,
  duration = 1000,
  className = '',
  prefix = '',
  suffix = ''
}) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const easeOutQuad = progress * (2 - progress) // Easing function

      countRef.current = Math.floor(easeOutQuad * end)
      setCount(countRef.current)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end) // Ensure final value is exact
      }
    }

    startTimeRef.current = null
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [end, duration])

  return (
    <motion.span
      key={end}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      {prefix}{count}{suffix}
    </motion.span>
  )
}

// Simpler variant using CSS counter animation
export function SimpleCountUp({ value, className = '' }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {value}
    </motion.span>
  )
}
