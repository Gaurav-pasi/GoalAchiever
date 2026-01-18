import { useSwipeable } from 'react-swipeable'
import { useNavigate } from 'react-router-dom'

export default function SwipeableDay({ currentDay, totalDays = 60, children }) {
  const navigate = useNavigate()

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentDay < totalDays) {
        navigate(`/day/${currentDay + 1}`)
      }
    },
    onSwipedRight: () => {
      if (currentDay > 1) {
        navigate(`/day/${currentDay - 1}`)
      }
    },
    trackMouse: false, // Disable on desktop for better UX
    preventScrollOnSwipe: false, // Allow vertical scrolling
    delta: 50 // Minimum swipe distance
  })

  return (
    <div {...handlers} className="min-h-screen">
      {children}
    </div>
  )
}
