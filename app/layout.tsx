import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans, Noto_Serif } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// Load Noto Sans font
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
})

// Load Noto Serif font
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif",
})

export const metadata: Metadata = {
  title: "Xuan2.org - 玄之又玄，众妙之门",
  description: "Explore the depths of Taoism",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className={`min-h-screen flex flex-col ${notoSans.className}`}>
        <Header />
        <main className="container mx-auto px-4 py-8 pt-[100px] transition-[padding-top] duration-300 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

