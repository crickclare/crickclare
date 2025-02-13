"use client"

import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"
import ArticleSkeleton from "./ArticleSkeleton"

export default function ArticleList({ articles, layout, lastArticleRef, isLoading }) {
  const [showSkeleton, setShowSkeleton] = useState(isLoading)

  useEffect(() => {
    setShowSkeleton(isLoading)
  }, [isLoading])

  if (showSkeleton) {
    return (
      <div
        className={`
          ${layout === "grid" ? "grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid gap-6 grid-cols-1"}
        `}
      >
        {[...Array(9)].map((_, index) => (
          <ArticleSkeleton key={index} layout={layout} />
        ))}
      </div>
    )
  }

  if (!Array.isArray(articles) || articles.length === 0) {
    return (
      <div className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400 text-center">
        No articles found.
      </div>
    )
  }

  return (
    <div
      className={`
        ${layout === "grid" ? "grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid gap-6 grid-cols-1"}
      `}
    >
      {articles.map((article, index) => (
        <div key={article.id} ref={index === articles.length - 1 ? lastArticleRef : null}>
          <ArticleCard article={article} layout={layout} />
        </div>
      ))}
    </div>
  )
}

