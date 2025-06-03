"use client"

import type React from "react"
import Link from "next/link"

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border"
      style={{
        height: "var(--header-height)",
      }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center h-full max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-foreground transition-colors font-serif">
            Xuan2.org
          </Link>
        </div>
      </div>
    </header>
  )
}

