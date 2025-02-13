import { ThemeProvider } from "@/contexts/ThemeContext"
import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"
import BackToTop from "@/components/BackToTop"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Blog & News Template",
  description: "A simple blog and news website template built with Next.js",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Header />
            <main className="flex-grow pt-24 md:pt-20 pb-20 md:pb-0">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}

