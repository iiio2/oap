import { useNavigate } from '@tanstack/react-router'
import DashboardLayout from '../layouts/DashboardLayout'

export default function CompletePage() {
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      <div className="flex-1 flex items-start px-4 py-8">
        <div className="w-full bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center py-20 gap-4 text-center px-6">
          <img src="/complete.png" alt="Test Completed" className="w-16 h-16" />

          <h2 className="text-xl font-bold text-gray-800">Test Completed</h2>

          <p className="text-gray-500 text-sm max-w-xl">
            Congratulations! Md. Naimur Rahman, You have completed your MCQ Exam for Probationary Officer. Thank you for participating.
          </p>

          <button
            onClick={() => navigate({ to: '/dashboard' })}
            className="mt-2 border border-gray-300 text-gray-700 font-semibold text-sm px-7 py-2.5 rounded-xl hover:bg-gray-50 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}