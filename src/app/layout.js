import { ThemeProvider } from "@/contexts/ThemeContext"
import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"
import BackToTop from "@/components/BackToTop"
import '@fortawesome/fontawesome-free/css/all.css';
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Latest and Breaking Cricket News | Crick Clare",
  description: "Get Schedules of International and Domestic cricket matches along with Latest News and ICC Cricket Rankings of Players on CrickClare",
  verification: {
    google: 'l1QUfQY6iO_z2GQnPmRrK3i3U2MKhyAssi4hezQZ3Wk',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JSD7HZC2E3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JSD7HZC2E3');
          `}
        </Script>
        <meta name="google-site-verification" content="l1QUfQY6iO_z2GQnPmRrK3i3U2MKhyAssi4hezQZ3Wk" />
      </head>
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

