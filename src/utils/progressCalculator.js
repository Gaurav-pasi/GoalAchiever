/**
 * Calculate overall progress percentage
 * @param {Array} days - Array of day objects with topics
 * @returns {number} - Progress percentage (0-100)
 */
export function calculateOverallProgress(days) {
  if (!days || days.length === 0) return 0

  let totalPhases = 0
  let completedPhases = 0

  days.forEach(day => {
    day.topics.forEach(topic => {
      totalPhases += 3 // Theory, Interview, Hands-on
      if (topic.theory.completed) completedPhases++
      if (topic.interviewQuestions.completed) completedPhases++
      if (topic.handson.completed) completedPhases++
    })
  })

  return totalPhases > 0 ? Math.round((completedPhases / totalPhases) * 100) : 0
}

/**
 * Calculate progress for a specific day
 * @param {Object} day - Day object with topics
 * @returns {Object} - { percentage, completed, total }
 */
export function calculateDayProgress(day) {
  if (!day || !day.topics) return { percentage: 0, completed: 0, total: 0 }

  const totalPhases = day.topics.length * 3
  const completedPhases = day.topics.reduce((acc, topic) => {
    let count = 0
    if (topic.theory.completed) count++
    if (topic.interviewQuestions.completed) count++
    if (topic.handson.completed) count++
    return acc + count
  }, 0)

  return {
    percentage: totalPhases > 0 ? Math.round((completedPhases / totalPhases) * 100) : 0,
    completed: completedPhases,
    total: totalPhases
  }
}

/**
 * Calculate progress for a specific topic
 * @param {Object} topic - Topic object
 * @returns {Object} - { percentage, completed, total }
 */
export function calculateTopicProgress(topic) {
  if (!topic) return { percentage: 0, completed: 0, total: 3 }

  let completed = 0
  if (topic.theory.completed) completed++
  if (topic.interviewQuestions.completed) completed++
  if (topic.handson.completed) completed++

  return {
    percentage: Math.round((completed / 3) * 100),
    completed,
    total: 3
  }
}

/**
 * Get topics filtered by priority
 * @param {Array} topics - Array of topic objects
 * @param {number} priority - Priority level (0-6)
 * @returns {Array} - Filtered topics
 */
export function getTopicsByPriority(topics, priority) {
  if (!topics) return []
  if (priority === null || priority === undefined) return topics
  return topics.filter(topic => topic.priority === priority)
}

/**
 * Calculate DSA problems completion for a day
 * @param {Object} day - Day object with dsaProblems
 * @returns {Object} - { percentage, completed, total }
 */
export function calculateDSAProgress(day) {
  if (!day || !day.dsaProblems || day.dsaProblems.length === 0) {
    return { percentage: 0, completed: 0, total: 0 }
  }

  const total = day.dsaProblems.length
  const completed = day.dsaProblems.filter(problem => problem.completed).length

  return {
    percentage: Math.round((completed / total) * 100),
    completed,
    total
  }
}

/**
 * Get completion status color based on percentage
 * @param {number} percentage - Completion percentage
 * @returns {string} - Tailwind color class
 */
export function getProgressColor(percentage) {
  if (percentage === 0) return 'bg-gray-600'
  if (percentage < 30) return 'bg-red-600'
  if (percentage < 60) return 'bg-yellow-600'
  if (percentage < 100) return 'bg-blue-600'
  return 'bg-emerald-600'
}

/**
 * Get priority color based on priority level
 * @param {number} priority - Priority level (0-6)
 * @returns {string} - Tailwind color class
 */
export function getPriorityColor(priority) {
  const colors = {
    0: 'text-priority-0', // Red - MUST KNOW
    1: 'text-priority-1', // Orange - DIFFERENTIATOR
    2: 'text-priority-2', // Yellow - SUPPORT
    3: 'text-priority-3', // Green - DSA
    4: 'text-priority-4', // Blue
    5: 'text-priority-5', // Purple
    6: 'text-priority-6', // Gray
  }
  return colors[priority] || 'text-gray-400'
}

/**
 * Get priority label
 * @param {number} priority - Priority level (0-6)
 * @returns {string} - Priority label
 */
export function getPriorityLabel(priority) {
  const labels = {
    0: 'MUST KNOW',
    1: 'DIFFERENTIATOR',
    2: 'SUPPORT',
    3: 'DSA',
    4: 'OPTIONAL',
    5: 'ADVANCED',
    6: 'EXTRA',
  }
  return labels[priority] || 'UNKNOWN'
}

/**
 * Check if a topic is fully completed
 * @param {Object} topic - Topic object
 * @returns {boolean} - True if all phases are completed
 */
export function isTopicComplete(topic) {
  return topic.theory.completed &&
         topic.interviewQuestions.completed &&
         topic.handson.completed
}

/**
 * Get days grouped by completion status
 * @param {Array} days - Array of day objects
 * @returns {Object} - { completed: [], inProgress: [], notStarted: [] }
 */
export function groupDaysByStatus(days) {
  const completed = []
  const inProgress = []
  const notStarted = []

  days.forEach(day => {
    const progress = calculateDayProgress(day)
    if (progress.percentage === 100) {
      completed.push(day)
    } else if (progress.percentage > 0) {
      inProgress.push(day)
    } else {
      notStarted.push(day)
    }
  })

  return { completed, inProgress, notStarted }
}
