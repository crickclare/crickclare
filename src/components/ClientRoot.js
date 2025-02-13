"use client"

import { ThemeProvider } from "@/contexts/ThemeContext"


export default function ClientRoot({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>
}

