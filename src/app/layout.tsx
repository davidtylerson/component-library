import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/themes/theme-provider"
import { ThemeContextProvider } from "@/themes/theme-context"
import { Header } from "@/components/ui/header"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Float UI Library",
  description: "A component library for fintech applications",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-ds-bg-primary`}>
        <ThemeProvider>
          <ThemeContextProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
          </ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}