"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Mountain, Stethoscope, RouteIcon as Path, Eye, Hourglass, BookOpen, Search, Menu, X } from "lucide-react"

// Update the navItems array to include width information for each item
const navItems = [
  { name: "山", englishName: "FENGSHUI", icon: Mountain, href: "/mountain", width: 100 },
  { name: "医", englishName: "MEDICINE", icon: Stethoscope, href: "/medicine", width: 100 },
  { name: "命", englishName: "DESTINY", icon: Path, href: "/destiny", width: 90 },
  { name: "相", englishName: "PHYSIOGNOMY", icon: Eye, href: "/physiognomy", width: 140 },
  { name: "卜", englishName: "DIVINATION", icon: Hourglass, href: "/divination", width: 120 },
  { name: "书", englishName: "LIBRARY", icon: BookOpen, href: "/books", width: 90 },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isHoveringHeader, setIsHoveringHeader] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Close search and menu when path changes
    setIsSearchOpen(false)
    setIsMenuOpen(false)
    setSearchQuery("")
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition < 50) {
        setIsHidden(false)
        document.body.style.paddingTop = "100px"
      } else if (!isHoveringHeader) {
        setIsHidden(true)
        document.body.style.paddingTop = "20px"
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY < 80 && window.scrollY > 50) {
        setIsHidden(false)
        document.body.style.paddingTop = "100px"
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isHoveringHeader])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
    }
  }

  const handleItemHover = (itemName: string | null) => {
    setHoveredItem(itemName)
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full transition-transform duration-300 z-50 ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
      style={{
        height: "80px",
        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.7), transparent)",
        // Removed the border-bottom
      }}
      onMouseEnter={() => setIsHoveringHeader(true)}
      onMouseLeave={() => {
        setIsHoveringHeader(false)
        if (window.scrollY > 50) {
          setIsHidden(true)
          document.body.style.paddingTop = "20px"
        }
      }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors font-serif">
            Xuan2.org
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8 list-none">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="relative block text-gray-300 hover:text-white transition-all px-2 py-2 text-center"
                    style={{ width: `${item.width}px` }}
                    onMouseEnter={() => handleItemHover(item.name)}
                    onMouseLeave={() => handleItemHover(null)}
                  >
                    <div className="flex items-center justify-center h-[40px]">
                      {hoveredItem !== item.name && (
                        <>
                          <item.icon className="h-5 w-5 mr-2" />
                          <span className="text-lg">{item.name}</span>
                        </>
                      )}
                      {hoveredItem === item.name && (
                        <div className="bg-black/30 backdrop-blur-sm text-white rounded-md py-1 px-2 w-full">
                          <span className="text-sm font-medium whitespace-nowrap">{item.englishName}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-l px-3 py-1 focus:outline-none focus:ring-1 focus:ring-gray-500 bg-white/80"
                  autoFocus
                />
                <button type="submit" className="bg-gray-200 hover:bg-gray-300 rounded-r px-3 py-1 transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </form>
            ) : (
              <button onClick={() => setIsSearchOpen(true)} className="text-gray-300 hover:text-white">
                <Search className="h-5 w-5" />
              </button>
            )}
          </nav>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
                <span className="ml-2 text-gray-500">- {item.englishName}</span>
              </Link>
            ))}
            <form onSubmit={handleSearch} className="flex items-center px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-l px-3 py-1 flex-grow focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <button type="submit" className="bg-gray-200 hover:bg-gray-300 rounded-r px-3 py-1 transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}

