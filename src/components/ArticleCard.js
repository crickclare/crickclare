"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getCategoryColor, getCategoryIcon } from "@/utils/categoryUtils"
import categoriesData from "../data/categories.json"

export default function ArticleCard({ article, layout }) {
  if (!article || !article.slug) {
    return null
  }

  const getCategories = (categoryIds = []) => {
    const allCategories = categoriesData.categories
    const assignedCategories = new Set()

    const addCategoryAndChildren = (categoryId) => {
      const category = allCategories.find((cat) => cat.id === categoryId)
      if (category) {
        assignedCategories.add(category)
        // Add all child categories
        allCategories
          .filter((cat) => cat.parentId === category.id)
          .forEach((child) => {
            assignedCategories.add(child)
          })
      }
    }

    if (Array.isArray(categoryIds)) {
      categoryIds.forEach((id) => addCategoryAndChildren(id))
      // console.log(categoryIds.forEach((id) => console.log(id)))
    } else if (categoryIds) {
      // Handle single category ID case
      addCategoryAndChildren(categoryIds)
    }
    return Array.from(assignedCategories)
  }

  const categories = getCategories(article.categoryIds);

  const CategoryIcon = getCategoryIcon(categories[0]?.name)
  const categoryColor = getCategoryColor(categories[0]?.name)

  if (layout === "list") {
    return (
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/3 h-48 md:h-auto">
          <Link href={`/articles/${article.slug}`} className="block h-full">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title || "Article image"}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
          </Link>
        </div>
        <div className="px-6 py-14 flex flex-col flex-grow">
          {article.category && (
            <Link href={`/category/${article.category.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white mb-4"
                style={{ backgroundColor: categoryColor }}
              >
                <CategoryIcon className="w-4 h-4 mr-2" />
                {article.category.name}
              </span>
            </Link>
          )}

          <Link href={`/articles/${article.slug}`} className="block group">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3">
              {article.title}
            </h2>
          </Link>

          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{article.excerpt}</p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              {article.author && (
                <Link
                  href={`/author/${article.author.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center group"
                >
                  <Image
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(article.author.name)}&background=random`}
                    alt={article.author.name}
                    width={32}
                    height={32}
                    className="rounded-full ring-2 ring-white dark:ring-gray-800"
                  />
                  <span className="ml-2 font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.author.name}
                  </span>
                </Link>
              )}
              {article.date && (
                <>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
            <Link
              href={`/articles/${article.slug}`}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group"
            >
              Read article
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  // Grid layout (unchanged)
  return (
    <article className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-[600px]">
      <Link href={`/articles/${article.slug}`} className="relative overflow-hidden min-h-[250px]">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title || "Article image"}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </Link>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex-grow">
          <Link href={`/articles/${article.slug}`} className="block group">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-3">
              {article.title}
            </h2>
          </Link>

          {/* {article.category && (
            <div
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-white text-sm font-semibold mb-4"
              style={{ backgroundColor: categoryColor }}
            >
              <CategoryIcon size={14} />
              <span>{article.category.name}</span>
            </div>
          )} */}

          {(categories && categories.length > 0) && (
            <Link href={`/category/${categories[0]?.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white mb-4"
                style={{ backgroundColor: categoryColor }}
              >
                <CategoryIcon className="w-4 h-4 mr-2" />
                {categories[0]?.name}
              </span>
            </Link>
          )}

          <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">{article.excerpt}</p>

          <div className="flex items-center justify-between">
            {article.author && (
              <Link
                href={`/author/${article.author.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center group"
              >
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(article.author.name)}&background=random`}
                  alt={article.author.name}
                  width={32}
                  height={32}
                  className="rounded-full ring-2 ring-white dark:ring-gray-800 mr-2"
                />
                <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.author.name}
                </span>
              </Link>
            )}
            {article.date && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/articles/${article.slug}`}
          className="inline-flex items-center mt-4 text-blue-600 dark:text-blue-400 font-medium group"
        >
          Read article
          <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}