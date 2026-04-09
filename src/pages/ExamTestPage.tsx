import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import DashboardLayout from '../layouts/DashboardLayout'
import RichTextEditor from '../components/RichTextEditor'
import TimeoutModal from '../components/TimeoutModal'

type Question = {
  id: number
  text: string
  type: 'radio' | 'checkbox' | 'text'
  options?: string[]
}

const examData: Record<string, { totalSeconds: number; questions: Question[] }> = {
  '1': {
    totalSeconds: 20 * 60 + 31,
    questions: [
      {
        id: 1,
        text: 'Which of the following indicators is used to measure market volatility?',
        type: 'radio',
        options: [
          'Relative Strength Index (RSI)',
          'Moving Average Convergence Divergence (MACD)',
          'Bollinger Bands',
          'Fibonacci Retracement',
        ],
      },
    ],
  },
  '2': {
    totalSeconds: 20 * 60 + 31,
    questions: [
      {
        id: 1,
        text: 'Which of the following indicators is used to measure market volatility?',
        type: 'checkbox',
        options: [
          'Relative Strength Index (RSI)',
          'Moving Average Convergence Divergence (MACD)',
          'Bollinger Bands',
          'Fibonacci Retracement',
        ],
      },
    ],
  },
  '3': {
    totalSeconds: 20 * 60 + 31,
    questions: [
      {
        id: 1,
        text: 'Which of the following indicators is used to measure market volatility?',
        type: 'text',
      },
    ],
  },
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')} left`
}


export default function ExamTestPage() {
  const { id } = useParams({ strict: false }) as { id: string }
  const exam = examData[id] ?? examData['1']
  const navigate = useNavigate()

  const [current, setCurrent] = useState(0)
  const [radioSelected, setRadioSelected] = useState<Record<number, string>>({})
  const [checkboxSelected, setCheckboxSelected] = useState<Record<number, string[]>>({})
  const [timeLeft, setTimeLeft] = useState(exam.totalSeconds)
  const [timedOut, setTimedOut] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          setTimedOut(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const question = exam.questions[current]
  const total = exam.questions.length

  const toggleCheckbox = (qId: number, option: string) => {
    setCheckboxSelected(prev => {
      const curr = prev[qId] ?? []
      return {
        ...prev,
        [qId]: curr.includes(option) ? curr.filter(o => o !== option) : [...curr, option],
      }
    })
  }

  const handleSave = () => { if (current < total - 1) setCurrent(c => c + 1) }
  const handleSkip = () => { if (current < total - 1) setCurrent(c => c + 1) }

  return (
    <DashboardLayout>
      {timedOut && <TimeoutModal onDashboard={() => navigate({ to: '/dashboard' })} />}

      <div className="flex-1 flex flex-col items-center px-4 py-10 gap-5">
        {/* Progress + Timer */}
        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-between">
          <span className="text-base font-semibold text-gray-700">
            Question ({current + 1}/{total})
          </span>
          <div className="bg-gray-100 rounded-xl px-5 py-2">
            <span className="text-base font-bold text-gray-800">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Question card */}
        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl px-6 py-6 flex flex-col gap-5">
          <p className="text-base font-semibold text-gray-800">
            Q{current + 1}. {question.text}
          </p>

          {/* Radio options */}
          {question.type === 'radio' && (
            <div className="flex flex-col gap-3">
              {question.options!.map(option => {
                const isSelected = radioSelected[question.id] === option
                return (
                  <button
                    key={option}
                    onClick={() => setRadioSelected(s => ({ ...s, [question.id]: option }))}
                    className={`flex items-center gap-3 border rounded-xl px-4 py-3.5 text-sm text-gray-700 text-left transition
                      ${isSelected ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50/40'}`}
                  >
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition
                      ${isSelected ? 'border-violet-600' : 'border-gray-300'}`}>
                      {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-violet-600" />}
                    </span>
                    {option}
                  </button>
                )
              })}
            </div>
          )}

          {/* Checkbox options */}
          {question.type === 'checkbox' && (
            <div className="flex flex-col gap-3">
              {question.options!.map(option => {
                const isSelected = (checkboxSelected[question.id] ?? []).includes(option)
                return (
                  <button
                    key={option}
                    onClick={() => toggleCheckbox(question.id, option)}
                    className={`flex items-center gap-3 border rounded-xl px-4 py-3.5 text-sm text-gray-700 text-left transition
                      ${isSelected ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50/40'}`}
                  >
                    <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition
                      ${isSelected ? 'border-violet-600 bg-violet-600' : 'border-gray-300 bg-white'}`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    {option}
                  </button>
                )
              })}
            </div>
          )}

          {/* Rich text editor */}
          {question.type === 'text' && <RichTextEditor />}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleSkip}
              className="border border-gray-300 text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition"
            >
              Skip this Question
            </button>
            <button
              onClick={handleSave}
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition"
            >
              Save &amp; Continue
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}