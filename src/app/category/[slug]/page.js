import { notFound } from "next/navigation"
import Script from "next/script"
import articlesData from "../../../data/articles.json"
import categoriesData from "../../../data/categories.json"
import Category from "@/components/Category"
import { APP_URL } from "@/config/themeConfig"

export async function generateMetadata({ params }) {
  const { categories } = categoriesData
  const { slug } = await params

  const category = categories.find((cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === slug)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  const metadata = {
    title: `${category.name} | Crick Clare`,
    description: category.description,
    metadataBase: new URL(APP_URL),
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: `${category.name} | Crick Clare`,
      description: category.description,
      url: `${APP_URL}/category/${slug}`,
      siteName: "Crick Clare",
      images: [
        {
          url: `${APP_URL}/images/og/og-banner.png`,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site:"@CrickClare",
      title: `${category.name} | Crick Clare`,
      description: category.description,
      images: [`${APP_URL}/images/og/og-banner.png`],
    },
  }

  return metadata
}

export default async function CategoryPage({ params }) {
  const { articles } = articlesData
  const { categories } = categoriesData

  const { slug } = await params

  // Find the category based on the slug
  const category = categories.find((cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === slug)

  if (!category) {
    notFound()
  }

  // Function to get all child category IDs
  const getChildCategoryIds = (parentId) => {
    return categories.filter((cat) => cat.parentId === parentId).map((cat) => cat.id)
  }

  // Get all relevant category IDs (including children if it's a parent category)
  const relevantCategoryIds = [category.id, ...getChildCategoryIds(category.id)]

  // Filter articles based on the relevant category IDs
  const categoryArticles = articles.filter((article) =>
    article.categoryIds.some((catId) => relevantCategoryIds.includes(catId)),
  )

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

  const sortedArticles = sortArticles(categoryArticles)

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Crick Clare",
      alternateName:'Crick Clare',
      url: APP_URL,
      logo: `${APP_URL}/images/logo/light-logo.png`,
      sameAs: [
        "https://youtube.com/@crick_clare",
        "https://www.instagram.com/crick_clare"
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: APP_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: category.name,
          item: `${APP_URL}/category/${slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: category.name,
      description: category.description,
      url: `${APP_URL}/category/${slug}`,
      image:`${APP_URL}/images/og/og-banner.png`
    },
  ]

  return (
    <>
      <Script id="json-ld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <Category category={category} categoryArticles={sortedArticles} />
    </>
  )
}

export async function generateStaticParams() {
  const { categories } = categoriesData

  return categories.map((category) => ({
    slug: category.slug,
  }))
}

