"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import articlesData from "../data/articles.json"
import { useTheme } from "@/contexts/ThemeContext"
import ArticleList from "./ArticleList"

const INITIAL_ARTICLES_COUNT = 9
const ARTICLES_PER_LOAD = 3

// Updated sorting function with simplified time handling
const sortArticles = (articles) => {
  return articles.sort((a, b) => {
    // Combine date and time into a single datetime string for comparison
    const dateTimeA = new Date(`${a.date} ${a.time}`).getTime()
    const dateTimeB = new Date(`${b.date} ${b.time}`).getTime()

    // Sort by datetime, latest first
    return dateTimeB - dateTimeA
  })
}

export default function HomeContent() {
  const { theme } = useTheme()
  const [articles, setArticles] = useState([])
  const [displayedArticles, setDisplayedArticles] = useState([])
  const [layout, setLayout] = useState("grid")
  const [loading, setLoading] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()

  useEffect(() => {
    const allArticles = articlesData.articles
    const sortedArticles = sortArticles(allArticles) // Sort articles by date and time
    setArticles(sortedArticles)
    setTimeout(() => {
      setDisplayedArticles(sortedArticles.slice(0, INITIAL_ARTICLES_COUNT))
      setHasMore(sortedArticles.length > INITIAL_ARTICLES_COUNT)
      setInitialLoading(false)
      setLoading(false)
    }, 1000) // Simulating initial load delay
  }, [])

  const loadMoreArticles = useCallback(() => {
    if (!hasMore || loading) return

    setLoading(true)
    const currentLength = displayedArticles.length
    const remainingArticles = articles.length - currentLength
    const articlesToLoad = Math.min(ARTICLES_PER_LOAD, remainingArticles)

    if (articlesToLoad > 0) {
      const nextArticles = articles.slice(currentLength, currentLength + articlesToLoad)
      setTimeout(() => {
        setDisplayedArticles((prevArticles) => [...prevArticles, ...nextArticles])
        setHasMore(currentLength + articlesToLoad < articles.length)
        setLoading(false)
      }, 500) // Simulating a delay for loading
    } else {
      setHasMore(false)
      setLoading(false)
    }
  }, [articles, displayedArticles.length, hasMore, loading])

  const lastArticleElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreArticles()
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore, loadMoreArticles],
  )

  return (
    <div className={`container mx-auto px-4 py-12 ${theme === "dark" ? "dark" : ""}`}>
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Explore Our Articles</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Discover insights, tutorials, and updates from our expert contributors across various topics
        </p>
      </div>

      <div className="mb-16">
        <ArticleList
          articles={displayedArticles}
          layout={layout}
          lastArticleRef={lastArticleElementRef}
          isLoading={initialLoading}
        />
      </div>

      {loading && !initialLoading && (
        <div className="flex justify-center">
          <p className="text-gray-600 dark:text-gray-400">Loading more articles...</p>
        </div>
      )}
    </div>
  )
}