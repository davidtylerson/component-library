import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <p className="text-lg">Fintech UI Library</p>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <h1 className="text-display-md font-bold mb-6">
          Theme System
        </h1>
        <p className="mb-4 text-text-lg">
          This page demonstrates the theme switching functionality. 
          The theme system provides support for light and dark modes.
        </p>
        
        <div className="flex flex-col gap-4 mt-8 w-full max-w-md">
          <div className="p-4 bg-background border border-border rounded-lg">
            Background
          </div>
          <div className="p-4 bg-card text-card-foreground border border-border rounded-lg">
            Card
          </div>
          <div className="p-4 bg-primary text-primary-foreground rounded-lg">
            Primary
          </div>
          <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
            Secondary
          </div>
          <div className="p-4 bg-muted text-muted-foreground rounded-lg">
            Muted
          </div>
          <div className="p-4 bg-accent text-accent-foreground rounded-lg">
            Accent
          </div>
          <div className="p-4 bg-destructive text-destructive-foreground rounded-lg">
            Destructive
          </div>
        </div>
        
        <div className="flex flex-col gap-4 mt-8 w-full max-w-md">
          <h2 className="text-display-sm font-bold">Brand Colors</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-4 bg-brand-50 text-brand-900 rounded-lg text-center">Brand 50</div>
            <div className="p-4 bg-brand-100 text-brand-900 rounded-lg text-center">Brand 100</div>
            <div className="p-4 bg-brand-200 text-brand-900 rounded-lg text-center">Brand 200</div>
            <div className="p-4 bg-brand-300 text-brand-900 rounded-lg text-center">Brand 300</div>
            <div className="p-4 bg-brand-400 text-brand-900 rounded-lg text-center">Brand 400</div>
            <div className="p-4 bg-brand-500 text-white rounded-lg text-center">Brand 500</div>
            <div className="p-4 bg-brand-600 text-white rounded-lg text-center">Brand 600</div>
            <div className="p-4 bg-brand-700 text-white rounded-lg text-center">Brand 700</div>
            <div className="p-4 bg-brand-800 text-white rounded-lg text-center">Brand 800</div>
            <div className="p-4 bg-brand-900 text-white rounded-lg text-center">Brand 900</div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 mt-8 w-full max-w-md">
          <h2 className="text-display-sm font-bold">Typography</h2>
          <h1 className="text-display-2xl">Display 2XL</h1>
          <h1 className="text-display-xl">Display XL</h1>
          <h1 className="text-display-lg">Display LG</h1>
          <h1 className="text-display-md">Display MD</h1>
          <h1 className="text-display-sm">Display SM</h1>
          <h1 className="text-display-xs">Display XS</h1>
          <p className="text-text-xl">Text XL</p>
          <p className="text-text-lg">Text LG</p>
          <p className="text-text-md">Text MD</p>
          <p className="text-text-sm">Text SM</p>
          <p className="text-text-xs">Text XS</p>
        </div>
      </div>
    </main>
  )
}