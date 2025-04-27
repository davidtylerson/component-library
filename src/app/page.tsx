import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <h1 className="text-display-lg font-bold text-center text-brand-700 mb-6">
          Flaot UI Library
        </h1>
        <div className="flex justify-center space-x-4">
          <Link
            href="/components"
            className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors"
          >
            Explore Components
          </Link>
          <Link
            href="/docs"
            className="px-4 py-2 bg-transparent border border-brand-300 text-brand-700 rounded-md hover:bg-brand-50 transition-colors"
          >
            Documentation
          </Link>
        </div>
      </div>
    </main>
  )
}