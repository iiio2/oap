import type { ReactNode } from 'react'
import Footer from '../components/Footer'

function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <img src="/logo.png" alt="Akij Resource" className="h-3.25 w-11.75 sm:h-10 sm:w-auto shrink-0" />

      <span className="absolute left-1/2 -translate-x-1/2 text-xl sm:text-2xl font-bold text-gray-800 tracking-wide">
        Dashboard
      </span>

      {/* User info */}
      <div className="flex items-center gap-2 cursor-pointer select-none">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
        <div className="hidden sm:flex flex-col leading-tight">
          <span className="text-sm font-semibold text-gray-800">Arif Hossain</span>
          <span className="text-xs text-gray-400">Ref. ID - 16101121</span>
        </div>
        <svg className="w-4 h-4 text-gray-500 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </header>
  )
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f5]">
      <DashboardHeader />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  )
}