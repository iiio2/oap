export default function Footer() {
  return (
    <footer className="bg-[#130B2C] text-white px-8 py-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Powered by */}
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <span>Powered by</span>
        <img src="/logo.png" alt="Akij Resource" className="h-8 brightness-0 invert" />
      </div>

      {/* Contact info */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
        <span className="text-sm font-medium text-gray-400 sm:hidden">Helpline</span>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <img src="/call.png" alt="call" className="h-5 w-5 brightness-0 invert" />
            <span>+88 01920202505</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <img src="/mail.png" alt="mail" className="h-5 w-5 brightness-0 invert" />
            <span>support@akij.work</span>
          </div>
        </div>
      </div>
    </footer>
  )
}