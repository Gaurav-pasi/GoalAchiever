import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import roadmapData from '../assets/roadmap-60-days.json'

const ProgressContext = createContext()

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

export function ProgressProvider({ children }) {
  // Initialize progress from localStorage or create default structure
  const [progress, setProgress] = useLocalStorage('goalAchiever_progress_v2', {
    lastUpdated: new Date().toISOString(),
    currentDay: 1,
    days: roadmapData.roadmap.days.map(day => ({
      ...day,
      topics: day.topics.map(topic => ({
        ...topic,
        theory: { ...topic.theory },
        interviewQuestions: Array.isArray(topic.interviewQuestions) ? [...topic.interviewQuestions] : [],
        handson: { ...topic.handson }
      })),
      dsaProblems: day.dsaProblems.map(problem => ({ ...problem }))
    }))
  })

  // Calculate overall statistics
  const calculateStats = () => {
    let totalTopics = 0
    let theoryCompleted = 0
    let interviewsCompleted = 0
    let interviewQuestionsAnswered = 0
    let totalInterviewQuestions = 0
    let handsonCompleted = 0
    let totalDSAProblems = 0
    let dsaCompleted = 0

    progress.days.forEach(day => {
      day.topics.forEach(topic => {
        totalTopics++
        if (topic.theory.completed) theoryCompleted++
        if (topic.handson.completed) handsonCompleted++

        // Count interview questions
        if (Array.isArray(topic.interviewQuestions)) {
          const allCompleted = topic.interviewQuestions.length > 0 &&
                               topic.interviewQuestions.every(q => q.completed)
          if (allCompleted) interviewsCompleted++

          totalInterviewQuestions += topic.interviewQuestions.length
          interviewQuestionsAnswered += topic.interviewQuestions.filter(q => q.completed).length
        }
      })

      // Count DSA problems
      if (day.dsaProblems) {
        totalDSAProblems += day.dsaProblems.length
        dsaCompleted += day.dsaProblems.filter(p => p.completed).length
      }
    })

    const topicsCompleted = progress.days.reduce((acc, day) => {
      return acc + day.topics.filter(topic => topic.theory.completed).length
    }, 0)

    return {
      totalTopics,
      topicsCompleted,
      theoryCompleted,
      interviewsCompleted,
      interviewQuestionsAnswered,
      totalInterviewQuestions,
      handsonCompleted,
      totalDSAProblems,
      dsaCompleted,
      overallProgress: totalTopics > 0 ? Math.round((topicsCompleted / totalTopics) * 100) : 0
    }
  }

  // Update a topic's progress
  const updateTopic = (dayNumber, topicId, updates) => {
    setProgress(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      days: prev.days.map(day => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            topics: day.topics.map(topic => {
              if (topic.id === topicId) {
                return {
                  ...topic,
                  ...updates
                }
              }
              return topic
            })
          }
        }
        return day
      })
    }))
  }

  // Toggle theory completion
  const toggleTheory = (dayNumber, topicId) => {
    setProgress(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      days: prev.days.map(day => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            topics: day.topics.map(topic => {
              if (topic.id === topicId) {
                return {
                  ...topic,
                  theory: {
                    ...topic.theory,
                    completed: !topic.theory.completed
                  }
                }
              }
              return topic
            })
          }
        }
        return day
      })
    }))
  }

  // ADD INTERVIEW QUESTION - New implementation for array-based questions
  const addInterviewQuestion = (dayNumber, topicId, question) => {
    setProgress(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      days: prev.days.map(day => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            topics: day.topics.map(topic => {
              if (topic.id === topicId) {
                // Ensure interviewQuestions is an array
                const questions = Array.isArray(topic.interviewQuestions)
                  ? topic.interviewQuestions
                  : []
                return {
                  ...topic,
                  interviewQuestions: [...questions, question]
                }
              }
              return topic
            })
          }
        }
        return day
      })
    }))
  }

  // TOGGLE INTERVIEW QUESTION - Toggle completion status
  const toggleInterviewQuestion = (dayNumber, topicId, questionId) => {
    setProgress(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      days: prev.days.map(day => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            topics: day.topics.map(topic => {
              if (topic.id === topicId && Array.isArray(topic.interviewQuestions)) {
                return {
                  ...topic,
                  interviewQuestions: topic.interviewQuestions.map(q =>
                    q.id === questionId ? { ...q, completed: !q.completed } : q
                  )
                }
              }
              return topic
            })
          }
        }
        return day
      })
    }))
  }

  // EDIT INTERVIEW QUESTION - Update question data
  const editInterviewQuestion = (dayNumber, topicId, questionId, updates) => {
    setProgress(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      days: prev.days.map(day => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            topics: day.topics.map(topic => {
              if (topic.id === topicId && Array.isArray(topic.interviewQuestions)) {
                return {
                  ...topic,
                  interviewQuestions: topic.interviewQuestions.map(q =>
                    q.id === questionId ? { ...q, ...updates } : q
                  )
                }
              }
              return topic
            })
          }
        }
        return day
      })
    }))
  }

  // DELETE INTERVIEW QUESTION
  const deleteInterviewQuestion = (dayNumber, topicId, questionId) => {
    setProgress(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      days: prev.days.map(day => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            topics: day.topics.map(topic => {
              if (topic.id === topicId && Array.isArray(topic.interviewQuestions)) {
                return {
                  ...topic,
                  interviewQuestions: topic.interviewQuestions.filter(q => q.id !== questionId)
                }
              }
              return topic
            })
          }
        }
        return day
      })
    }))
  }

  // GET INTERVIEW QUESTIONS for a topic
  const getInterviewQuestions = (dayNumber, topicId) => {
    const day = getDay(dayNumber)
    if (!day) return []
    const topic = day.topics.find(t => t.id === topicId)
    if (!topic) return []
    return Array.isArray(topic.interviewQuestions) ? topic.interviewQuestions : []
  }

  // Toggle hands-on completion
  const toggleHandson = (dayNumber, topicId) => {
    setProgress(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      days: prev.days.map(day => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            topics: day.topics.map(topic => {
              if (topic.id === topicId) {
                return {
                  ...topic,
                  handson: {
                    ...topic.handson,
                    completed: !topic.handson.completed
                  }
                }
              }
              return topic
            })
          }
        }
        return day
      })
    }))
  }

  // Toggle DSA problem completion
  const toggleDSAProblem = (dayNumber, problemId) => {
    setProgress(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      days: prev.days.map(day => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            dsaProblems: day.dsaProblems.map(problem => {
              if (problem.id === problemId) {
                return {
                  ...problem,
                  completed: !problem.completed
                }
              }
              return problem
            })
          }
        }
        return day
      })
    }))
  }

  // Set current day
  const setCurrentDay = (dayNumber) => {
    setProgress(prev => ({
      ...prev,
      currentDay: dayNumber,
      lastUpdated: new Date().toISOString()
    }))
  }

  // Get day by number
  const getDay = (dayNumber) => {
    return progress.days.find(day => day.dayNumber === dayNumber)
  }

  // Get progress for a specific day
  const getDayProgress = (dayNumber) => {
    const day = getDay(dayNumber)
    if (!day) return { percentage: 0, completed: 0, total: 0 }

    const totalPhases = day.topics.length * 3 // 3 phases per topic
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

  // Reset all progress
  const resetProgress = () => {
    setProgress({
      lastUpdated: new Date().toISOString(),
      currentDay: 1,
      days: roadmapData.roadmap.days.map(day => ({
        ...day,
        topics: day.topics.map(topic => ({
          ...topic,
          theory: { completed: false, notes: '', resourceLinks: [] },
          interviewQuestions: {
            completed: false,
            questionsAnswered: 0,
            totalQuestions: topic.interviewQuestions.totalQuestions,
            notes: ''
          },
          handson: { completed: false, projectName: '', githubLink: '', notes: '' }
        })),
        dsaProblems: day.dsaProblems.map(problem => ({ ...problem, completed: false }))
      }))
    })
  }

  const value = {
    progress,
    setProgress,
    stats: calculateStats(),
    updateTopic,
    toggleTheory,
    toggleHandson,
    toggleDSAProblem,
    setCurrentDay,
    getDay,
    getDayProgress,
    resetProgress,
    // New interview questions methods
    addInterviewQuestion,
    toggleInterviewQuestion,
    editInterviewQuestion,
    deleteInterviewQuestion,
    getInterviewQuestions
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}
