import type { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f5]">
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  )
}