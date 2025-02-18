"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Sun, Moon, Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"
import Image from "next/image"

export const categories = [
  {
    id: 1,
    name: "Series",
    path: "/",
    subcategories: [
      { id: 1, name: "WPL 2025", path: "/tag/wpl-2025" },
      { id: 2, name: "ICC Champions Trophy 2025", path: "/tag/champion-trophy-2025" },
      { id: 3, name: "IPL 2025", path: "/tag/ipl-2025" }
    ],
  },
  {
    id: 2,
    name: "Teams",
    path: "/",
    subcategories: [
      { id: 1, name: "India", path: "/category/bcci" },
      { id: 2, name: "Australia", path: "/category/australian-cricket" },
      { id: 3, name: "England", path: "/category/englend-cricket" },
      { id: 4, name: "Afghanistan", path: "/category/afghanistan-cricket" },
      { id: 5, name: "New Zealand", path: "/category/new-zealand-cricket" }
    ],
  },
  {
    id: 3,
    name: "News",
    path: "/",
    subcategories: [
      { id: 1, name: "Latest News", path: "/" },
    ],
  }
]


export default function Header() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm("")
      setIsSearchOpen(false)
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setIsSearchOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <div className="relative w-full" style={{ maxWidth: "150px" }}>
              <Image src={theme === 'light' ? "/images/logo/light-logo.png" : "/images/logo/dark-logo.png"} alt="CrickClare" layout="responsive" width={150} height={50} />
            </div>
          </Link>

          {/* Desktop Categories */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative group"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  href={category.path}
                  className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>{category.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>
                {hoveredCategory === category.id && (
                  <div className="rounded-md absolute top-full left-0 w-60 bg-white dark:bg-gray-900 shadow-lg rounded-b-lg border border-gray-200 dark:border-gray-800 py-2">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        href={subcategory.path}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link
              href="/contact-us"
              className="hidden md:inline-block px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
            >
              Contact Us
            </Link>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg"
          >
            <form onSubmit={handleSearch} className="container mx-auto px-4 py-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  autoFocus
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="block py-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <details className="group">
                      <summary className="flex justify-between items-center py-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                        {category.name}
                        <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="pl-4 mt-2 space-y-2">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory.id}>
                            <Link
                              href={subcategory.path}
                              className="block py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subcategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="block py-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

