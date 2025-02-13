"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleList from "@/components/ArticleList";

const INITIAL_ARTICLES_COUNT = 9;
const ARTICLES_PER_LOAD = 3;

export default function TagClient({ tag, tagArticles }) {
  const { theme } = useTheme();
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const breadcrumbItems = [{ label: tag.name }];

  useEffect(() => {
    setTimeout(() => {
      setDisplayedArticles(tagArticles.slice(0, INITIAL_ARTICLES_COUNT));
      setHasMore(tagArticles.length > INITIAL_ARTICLES_COUNT);
      setInitialLoading(false);
      setLoading(false);
    }, 1000); // Simulating initial load delay
  }, [tagArticles]);

  const loadMoreArticles = useCallback(() => {
    if (!hasMore || loading) return;

    setLoading(true);
    const currentLength = displayedArticles.length;
    const remainingArticles = tagArticles.length - currentLength;
    const articlesToLoad = Math.min(ARTICLES_PER_LOAD, remainingArticles);

    if (articlesToLoad > 0) {
      const nextArticles = tagArticles.slice(currentLength, currentLength + articlesToLoad);
      setTimeout(() => {
        setDisplayedArticles((prevArticles) => [...prevArticles, ...nextArticles]);
        setHasMore(currentLength + articlesToLoad < tagArticles.length);
        setLoading(false);
      }, 1000); // Simulating a delay for loading
    } else {
      setHasMore(false);
      setLoading(false);
    }
  }, [tagArticles, displayedArticles.length, hasMore, loading]);

  const lastArticleElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreArticles();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreArticles]
  );

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === "dark" ? "dark" : ""}`}>
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        #{tag.name}
      </h1>
      <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-300 mb-8">
        {tag.description}
      </p>
      {tagArticles.length > 0 ? (
        <>
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
        </>
      ) : (
        <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400 mb-8">
          No articles found with this tag.
        </p>
      )}
    </div>
  );
}