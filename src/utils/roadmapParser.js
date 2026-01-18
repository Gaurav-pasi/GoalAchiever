/**
 * Utility functions for parsing and transforming roadmap data
 */

/**
 * Load roadmap data from JSON file
 * @returns {Object} - Roadmap data
 */
export function loadRoadmapData() {
  // In a real scenario, this could fetch from an API
  // For now, we import from the static JSON file
  return import('../assets/roadmap-data.json')
    .then(module => module.default)
    .catch(error => {
      console.error('Error loading roadmap data:', error)
      return { roadmap: { days: [] } }
    })
}

/**
 * Validate roadmap data structure
 * @param {Object} data - Roadmap data to validate
 * @returns {boolean} - True if valid
 */
export function validateRoadmapData(data) {
  if (!data || !data.roadmap || !Array.isArray(data.roadmap.days)) {
    return false
  }

  // Check if all days have required fields
  return data.roadmap.days.every(day =>
    day.dayNumber &&
    day.title &&
    Array.isArray(day.topics) &&
    Array.isArray(day.deliverables) &&
    Array.isArray(day.dsaProblems)
  )
}

/**
 * Get summary of roadmap
 * @param {Object} roadmapData - Roadmap data
 * @returns {Object} - Summary statistics
 */
export function getRoadmapSummary(roadmapData) {
  if (!roadmapData || !roadmapData.roadmap) {
    return {
      totalDays: 0,
      totalTopics: 0,
      totalDSAProblems: 0,
      priorityBreakdown: {}
    }
  }

  const days = roadmapData.roadmap.days
  let totalTopics = 0
  let totalDSAProblems = 0
  const priorityBreakdown = {
    0: 0, // MUST KNOW
    1: 0, // DIFFERENTIATOR
    2: 0, // SUPPORT
    3: 0, // DSA
    4: 0,
    5: 0,
    6: 0
  }

  days.forEach(day => {
    totalTopics += day.topics.length
    totalDSAProblems += day.dsaProblems.length

    day.topics.forEach(topic => {
      priorityBreakdown[topic.priority]++
    })
  })

  return {
    totalDays: days.length,
    totalTopics,
    totalDSAProblems,
    priorityBreakdown
  }
}

/**
 * Search topics by keyword
 * @param {Object} roadmapData - Roadmap data
 * @param {string} keyword - Search keyword
 * @returns {Array} - Matching topics with day info
 */
export function searchTopics(roadmapData, keyword) {
  if (!roadmapData || !keyword) return []

  const results = []
  const lowerKeyword = keyword.toLowerCase()

  roadmapData.roadmap.days.forEach(day => {
    day.topics.forEach(topic => {
      if (topic.name.toLowerCase().includes(lowerKeyword)) {
        results.push({
          ...topic,
          dayNumber: day.dayNumber,
          dayTitle: day.title
        })
      }
    })
  })

  return results
}

/**
 * Get topics by priority across all days
 * @param {Object} roadmapData - Roadmap data
 * @param {number} priority - Priority level
 * @returns {Array} - Topics with specified priority
 */
export function getTopicsByPriorityGlobal(roadmapData, priority) {
  if (!roadmapData) return []

  const results = []

  roadmapData.roadmap.days.forEach(day => {
    day.topics.forEach(topic => {
      if (topic.priority === priority) {
        results.push({
          ...topic,
          dayNumber: day.dayNumber,
          dayTitle: day.title
        })
      }
    })
  })

  return results
}

/**
 * Get suggested next topic based on progress
 * @param {Array} days - Days with progress data
 * @returns {Object|null} - Next suggested topic
 */
export function getSuggestedNextTopic(days) {
  if (!days || days.length === 0) return null

  // Find first incomplete topic in order
  for (const day of days) {
    for (const topic of day.topics) {
      const isComplete = topic.theory.completed &&
                        topic.interviewQuestions.completed &&
                        topic.handson.completed

      if (!isComplete) {
        return {
          ...topic,
          dayNumber: day.dayNumber,
          dayTitle: day.title
        }
      }
    }
  }

  return null // All topics completed!
}

/**
 * Export progress data for backup
 * @param {Object} progress - Progress data
 * @returns {string} - JSON string
 */
export function exportProgress(progress) {
  return JSON.stringify(progress, null, 2)
}

/**
 * Import progress data from backup
 * @param {string} jsonString - JSON string
 * @returns {Object|null} - Parsed progress data or null if invalid
 */
export function importProgress(jsonString) {
  try {
    const data = JSON.parse(jsonString)
    // Validate structure
    if (data.days && Array.isArray(data.days)) {
      return data
    }
    return null
  } catch (error) {
    console.error('Error importing progress:', error)
    return null
  }
}
