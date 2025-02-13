"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"
import ArticleList from "@/components/ArticleList"

const INITIAL_ARTICLES_COUNT = 9
const ARTICLES_PER_LOAD = 3

export default function AuthorClient({ author, authorArticles }) {
  const { theme } = useTheme()
  const [displayedArticles, setDisplayedArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()

  useEffect(() => {
    setTimeout(() => {
      setDisplayedArticles(authorArticles.slice(0, INITIAL_ARTICLES_COUNT))
      setHasMore(authorArticles.length > INITIAL_ARTICLES_COUNT)
      setInitialLoading(false)
      setLoading(false)
    }, 1000) // Simulating initial load delay
  }, [authorArticles])

  const loadMoreArticles = useCallback(() => {
    if (!hasMore || loading) return

    setLoading(true)
    const currentLength = displayedArticles.length
    const remainingArticles = authorArticles.length - currentLength
    const articlesToLoad = Math.min(ARTICLES_PER_LOAD, remainingArticles)

    if (articlesToLoad > 0) {
      const nextArticles = authorArticles.slice(currentLength, currentLength + articlesToLoad)
      setTimeout(() => {
        setDisplayedArticles((prevArticles) => [...prevArticles, ...nextArticles])
        setHasMore(currentLength + articlesToLoad < authorArticles.length)
        setLoading(false)
      }, 1000) // Simulating a delay for loading
    } else {
      setHasMore(false)
      setLoading(false)
    }
  }, [authorArticles, displayedArticles.length, hasMore, loading])

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
    [loading, hasMore, loadMoreArticles]
  )

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === "dark" ? "dark" : ""}`}>
      <div className="mb-12 text-center">
        <Image
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&size=200`}
          alt={author.name}
          width={200}
          height={200}
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {author.name}
        </h1>
        <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {author.bio}
        </p>
      </div>
      <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100">Articles by {author.name}</h2>
      <ArticleList
        articles={displayedArticles}
        layout="grid"
        lastArticleRef={lastArticleElementRef}
        isLoading={initialLoading}
      />
      {loading && !initialLoading && (
        <div className="flex justify-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">Loading more articles...</p>
        </div>
      )}
    </div>
  )
}
