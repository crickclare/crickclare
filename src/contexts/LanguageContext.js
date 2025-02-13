"use client"

import { createContext, useState, useContext } from "react"

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en")

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "es" : "en"))
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}

