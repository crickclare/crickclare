
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import articlesData from "../../../data/articles.json"
// import categoriesData from "../../../data/categories.json"
import tagsData from "../../../data/tags.json"
import RelatedArticles from "@/components/RelatedArticles"
import ArticleJsonLd from "@/components/ArticleJsonLd"
import { APP_URL } from "@/config/themeConfig"
// import Breadcrumb from "../../../components/Breadcrumb"

export async function generateMetadata({ params }, parent) {
  const { slug } = await params
  const { articles } = articlesData
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  const previousImages = (await parent).openGraph?.images || []
  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
    metadataBase: new URL(APP_URL),
    alternates: {
      canonical: `/articles/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author.name],
      images: [article.image, ...previousImages],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  }
}

export default async function ArticlePage({ params }) {
  // Ensure params are awaited
  const { slug } = await params;

  const { articles } = articlesData;
  const article = articles.find((a) => a.slug === slug);

  // const getCategories = (categoryIds = []) => {
  //   const allCategories = categoriesData.categories
  //   const assignedCategories = new Set()

  //   const addCategoryAndChildren = (categoryId) => {
  //     const category = allCategories.find((cat) => cat.id === categoryId)
  //     if (category) {
  //       assignedCategories.add(category)
  //       // Add all child categories
  //       allCategories
  //         .filter((cat) => cat.parentId === category.id)
  //         .forEach((child) => {
  //           assignedCategories.add(child)
  //         })
  //     }
  //   }

  //   if (Array.isArray(categoryIds)) {
  //     categoryIds.forEach((id) => addCategoryAndChildren(id))
  //   } else if (categoryIds) {
  //     // Handle single category ID case
  //     addCategoryAndChildren(categoryIds)
  //   }

  //   return Array.from(assignedCategories)
  // }

  // const categories = getCategories(article.categoryIds);

  const getTags = (tagsIds = []) => {
    const allTags = tagsData.tags
    const assignedTags = new Set()

    const addTagsAndChildren = (tagsId) => {
      const tag = allTags.find((cat) => cat.id === tagsId)
      if (tag) {
        assignedTags.add(tag)
        // Add all child categories
        allTags
          .filter((cat) => cat.parentId === tag.id)
          .forEach((child) => {
            assignedTags.add(child)
          })
      }
    }

    if (Array.isArray(tagsIds)) {
      tagsIds.forEach((id) => addTagsAndChildren(id))
    } else if (tagsIds) {
      // Handle single category ID case
      addTagsAndChildren(tagsIds)
    }

    return Array.from(assignedTags)
  }

  const tags = getTags(article?.tagsIds);

  if (!article) {
    notFound();
  }

  // const breadcrumbItems = [{ label: "Articles", href: "/articles" }, { label: article.title }]

  return (
    <>
      <ArticleJsonLd article={article} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{article.title}</h1>
            <div className="flex items-center flex-wrap justify-between gap-3 mb-6">
              <Link
                href={`/author/${article.author.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center"
              >
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(article.author.name)}&background=random`}
                  alt={article.author.name}
                  width={40}
                  height={40}
                  className="rounded-full md:w-10 md:h-10 w-9 h-9 mr-3"
                />
                <div>
                  <p className="md:text-md text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-1">
                    {article.author.name}
                  </p>
                  <p className="md:text-sm text-[12px] text-gray-500 dark:text-gray-400">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
              {/* {categories?.map((category, index) => (
                <Link key={index} href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span className="bg-blue-600 text-white md:text-sm text-[12px] font-semibold md:px-3 px-2 md:py-1 py-0.5 rounded-full hover:bg-blue-700 transition-colors inline-block">
                    {category.name}
                  </span>
                </Link>
              ))} */}
            </div>
          </div>
          <div className="relative  w-full mb-8 rounded-lg overflow-hidden">
            <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="!static" priority />
          </div>
          <div className="prose lg:prose-lg max-w-none mb-8 dark:prose-invert">
            <div className="custom-editor-box" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
          {
            (tags && tags.length > 0) && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Link href={`/tag/${tag.name.toLowerCase().replace(/\s+/g, "-")}`} key={index}>
                      <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        {tag.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          }
        </article>
        <RelatedArticles currentArticle={article} articles={articles} />
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const { articles } = articlesData
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

