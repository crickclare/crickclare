"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)

        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <>
            {isVisible && (
                <div
                    className="inline-block bg-blue-500 w-12 h-12 text-center rounded fixed bottom-8 right-8 transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-800 active:bg-gray-700 z-50"
                    onClick={scrollToTop}
                >
                    <ChevronUp className="inline-block w-6 h-6 text-white mt-3" />
                </div>
            )}
        </>
    )
}