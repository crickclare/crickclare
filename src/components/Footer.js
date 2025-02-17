'use client';

import Link from "next/link"
import { Twitter, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"

export default function Footer() {

  const { theme } = useTheme();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <Image
                  src={theme === 'light' ? "/images/logo/light-logo.png" : "/images/logo/dark-logo.png"}
                  alt="CrickClare"
                  layout="intrinsic"
                  width={200}
                  height={50}
                />
              </div>
            </Link>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Get the latest cricket news, match updates, player stats and much more in one place. Stay updated with everything cricket!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://youtube.com/@crick_clare?si=8Ukzb04zwCZ5B_v3" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Youtube size={24} />
              </Link>
              <Link href="https://www.instagram.com/crick_clare/" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Twitter size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} <Link className="font-bold" href={`/`}>Crick Clare</Link>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

