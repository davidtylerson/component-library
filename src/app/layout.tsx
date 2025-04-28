import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/themes/theme-provider"
import { ThemeContextProvider } from "@/themes/theme-context"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Fintech UI Library",
  description: "A component library for fintech applications",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <ThemeContextProvider>
            {children}
          </ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}