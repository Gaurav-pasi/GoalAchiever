import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { useProgress } from '../contexts/ProgressContext'
import PageTransition from '../components/animations/PageTransition'
import SwipeableDay from '../components/navigation/SwipeableDay'
import DaySelector from '../components/navigation/DaySelector'
import DayStats from '../components/stats/DayStats'
import TopicCard from '../components/checklist/TopicCard'
import PriorityFilter from '../components/navigation/PriorityFilter'
import StaggerContainer, { StaggerItem } from '../components/animations/StaggerContainer'
import AnimatedCheckbox from '../components/animations/AnimatedCheckbox'
import Sidebar from '../components/layout/Sidebar'
import QuestionList from '../components/InterviewQuestions/QuestionList'
import { getTopicsByPriority } from '../utils/progressCalculator'

export default function DayView() {
  const { dayNumber } = useParams()
  const currentDayNumber = parseInt(dayNumber)
  const {
    getDay,
    toggleDSAProblem,
    addInterviewQuestion,
    toggleInterviewQuestion,
    editInterviewQuestion,
    deleteInterviewQuestion,
    getInterviewQuestions
  } = useProgress()
  const [selectedPriority, setSelectedPriority] = useState(null)

  const day = getDay(currentDayNumber)

  if (!day) {
    return (
      <PageTransition className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark-text-primary">Day not found</h1>
          <p className="text-dark-text-secondary mt-2">Please select a valid day (1-30)</p>
        </div>
      </PageTransition>
    )
  }

  const filteredTopics = getTopicsByPriority(day.topics, selectedPriority)

  return (
    <>
      {/* Desktop Sidebar */}
      <Sidebar />

      <SwipeableDay currentDay={currentDayNumber} totalDays={60}>
        <PageTransition className="lg:ml-64 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Day Header */}
          <div className="mb-6">
            <DaySelector currentDay={currentDayNumber} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Topics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Day Title */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-dark-text-primary mb-2">
                  {day.title}
                </h1>
                <p className="text-dark-text-secondary">
                  {day.description}
                </p>
              </div>

              {/* Priority Filter */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark-text-primary">
                  Topics ({filteredTopics.length})
                </h2>
                <PriorityFilter
                  selectedPriority={selectedPriority}
                  onChange={setSelectedPriority}
                />
              </div>

              {/* Topics List */}
              <StaggerContainer className="space-y-6">
                {filteredTopics.map((topic) => (
                  <StaggerItem key={topic.id}>
                    <div className="space-y-4">
                      {/* Topic Card */}
                      <TopicCard topic={topic} dayNumber={currentDayNumber} />

                      {/* Interview Questions for this topic */}
                      <div className="ml-4 pl-4 border-l-2 border-gray-800">
                        <QuestionList
                          questions={getInterviewQuestions(currentDayNumber, topic.id)}
                          onAdd={(question) => addInterviewQuestion(currentDayNumber, topic.id, question)}
                          onToggle={(questionId) => toggleInterviewQuestion(currentDayNumber, topic.id, questionId)}
                          onEdit={(questionId, updates) => editInterviewQuestion(currentDayNumber, topic.id, questionId, updates)}
                          onDelete={(questionId) => deleteInterviewQuestion(currentDayNumber, topic.id, questionId)}
                          topicName={topic.name}
                        />
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {filteredTopics.length === 0 && (
                <div className="card text-center py-12">
                  <p className="text-dark-text-secondary">
                    No topics found for this priority level
                  </p>
                  <button
                    onClick={() => setSelectedPriority(null)}
                    className="btn-primary mt-4"
                  >
                    Show All Topics
                  </button>
                </div>
              )}

              {/* DSA Problems Section */}
              {day.dsaProblems && day.dsaProblems.length > 0 && (
                <div className="card">
                  <h3 className="text-xl font-semibold text-dark-text-primary mb-4">
                    DSA Problems ({day.dsaProblems.length})
                  </h3>
                  <div className="space-y-3">
                    {day.dsaProblems.map((problem) => (
                      <div
                        key={problem.id}
                        className="flex items-center gap-3 p-3 bg-dark-bg-secondary/50 rounded-lg border border-gray-800"
                      >
                        <AnimatedCheckbox
                          checked={problem.completed}
                          onChange={() => toggleDSAProblem(currentDayNumber, problem.id)}
                          size="md"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`text-sm font-medium ${problem.completed ? 'text-dark-text-primary' : 'text-dark-text-secondary'}`}>
                              {problem.name}
                            </h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              problem.difficulty === 'Easy'
                                ? 'bg-green-600/20 text-green-400'
                                : problem.difficulty === 'Medium'
                                ? 'bg-yellow-600/20 text-yellow-400'
                                : 'bg-red-600/20 text-red-400'
                            }`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          {problem.link && (
                            <a
                              href={problem.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                            >
                              View Problem
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Stats */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                <DayStats day={day} />
              </div>
            </div>
          </div>
        </PageTransition>
      </SwipeableDay>
    </>
  )
}
