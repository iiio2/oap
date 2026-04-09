type Props = {
  onDashboard: () => void
}

export default function TimeoutModal({ onDashboard }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white rounded-2xl shadow-xl px-16 py-12 flex flex-col items-center gap-4 text-center max-w-2xl w-full mx-4">
        <img src="/timeout.png" alt="Timeout" className="w-16 h-16" />
        <h2 className="text-xl font-bold text-gray-800">Timeout!</h2>
        <p className="text-gray-500 text-sm">
          Dear Md. Naimur Rahman, Your exam time has been finished. Thank you for participating.
        </p>
        <button
          onClick={onDashboard}
          className="mt-2 border border-gray-300 text-gray-700 font-semibold text-sm px-7 py-2.5 rounded-xl hover:bg-gray-50 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}