export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center">
      <img
        src="/logo.png"
        alt="Akij Resource"
        className="h-3.25 w-11.75 sm:h-10 sm:w-auto shrink-0"
      />
      <span className="absolute left-1/2 -translate-x-1/2 text-xl sm:text-2xl font-bold text-gray-800 tracking-wide">
        Akij Resource
      </span>
    </header>
  )
}