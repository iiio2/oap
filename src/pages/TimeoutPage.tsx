import { useNavigate } from '@tanstack/react-router'
import DashboardLayout from '../layouts/DashboardLayout'
import TimeoutModal from '../components/TimeoutModal'

export default function TimeoutPage() {
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      <TimeoutModal onDashboard={() => navigate({ to: '/dashboard' })} />

      {/* Blurred exam content in background */}
      <div className="flex-1 flex flex-col items-center px-4 py-10 gap-5 pointer-events-none select-none">
        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-between">
          <span className="text-base font-semibold text-gray-700">Question (1/20)</span>
          <div className="bg-gray-100 rounded-xl px-5 py-2">
            <span className="text-base font-bold text-gray-800">20:31 left</span>
          </div>
        </div>

        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl px-6 py-6 flex flex-col gap-5">
          <p className="text-base font-semibold text-gray-800">
            Q1. Which of the following indicators is used to measure market volatility?
          </p>
          <div className="flex flex-col gap-3">
            {['Relative Strength Index (RSI)', 'Moving Average Convergence Divergence (MACD)', 'Bollinger Bands', 'Fibonacci Retracement'].map(opt => (
              <div key={opt} className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0" />
                {opt}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <button className="border border-gray-300 text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-xl">
              Skip this Question
            </button>
            <button className="bg-violet-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl">
              Save &amp; Continue
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}