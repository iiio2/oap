import { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'

const exams = [
  { id: 1, title: 'Psychometric Test for Management Trainee Officer', duration: 30, questions: 20, negativeMarking: -0.25 },
  { id: 2, title: 'Psychometric Test for Management Trainee Officer', duration: 30, questions: 20, negativeMarking: -0.25 },
  { id: 3, title: 'Psychometric Test for Management Trainee Officer', duration: 30, questions: 20, negativeMarking: -0.25 },
  { id: 4, title: 'Psychometric Test for Management Trainee Officer', duration: 30, questions: 20, negativeMarking: -0.25 },
]

function ClockIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 3" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M4 6h16M4 10h4M4 14h4M4 18h16" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  )
}

function XCircleIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M9 9l6 6M15 9l-6 6" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function ExamCard({ title, duration, questions, negativeMarking }: typeof exams[0]) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
      <h3 className="font-bold text-gray-800 text-base leading-snug">{title}</h3>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <ClockIcon />
          <span>Duration: <span className="font-medium text-gray-700">{duration} min</span></span>
        </span>
        <span className="flex items-center gap-1.5">
          <FileIcon />
          <span>Question: <span className="font-medium text-gray-700">{questions}</span></span>
        </span>
        <span className="flex items-center gap-1.5">
          <XCircleIcon />
          <span>Negative Marking: <span className="font-medium text-gray-700">{negativeMarking}/wrong</span></span>
        </span>
      </div>
      <div>
        <button className="border border-violet-600 text-violet-600 hover:bg-violet-50 font-semibold text-sm px-6 py-1.5 rounded-full transition">
          Start
        </button>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 8

  const filtered = exams.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="px-6 py-8 flex flex-col gap-6">
        {/* Title + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800 shrink-0">Online Tests</h2>
          <div className="sm:ml-auto w-full sm:w-96">
            <div className="flex items-center border border-gray-200 bg-white rounded-lg px-4 py-2.5 gap-2 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 transition">
              <input
                type="text"
                placeholder="Search by exam title"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
              <SearchIcon />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map(exam => (
            <ExamCard key={exam.id} {...exam} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-40 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="font-medium">{page}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-100 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Online Test Per Page</span>
            <div className="flex items-center gap-1 font-semibold text-gray-700">
              <span>{perPage}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M5 15l7-7 7 7" /></svg>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}