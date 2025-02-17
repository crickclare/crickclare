import { notFound } from "next/navigation"
import Script from "next/script"
import articlesData from "../../../data/articles.json"
import AuthorClient from "@/components/AuthorClient"
import { APP_URL } from "@/config/themeConfig"

export async function generateMetadata({ params }) {
  const { articles } = articlesData
  const { slug } = await params

  const author = articles.find((article) => article.author.name.toLowerCase().replace(/\s+/g, "-") === slug)?.author

  if (!author) {
    return {
      title: "Author Not Found",
    }
  }

  return {
    title: `${author.name} | Crick Clare`,
    description: author.bio,
    metadataBase: new URL(APP_URL),
    alternates: {
      canonical: `/author/${slug}`,
    },
    openGraph: {
      title: `${author.name} | Crick Clare`,
      description: author.bio,
      siteName: "Crick Clare",
      url: `${APP_URL}/author/${slug}`,
      images: [
        {
          url: `${APP_URL}/images/og/og-banner.png`, // You can replace this with an actual author image if available
          width: 1200,
          height: 630,
          alt: author.name,
        },
      ],
      locale: "en_US",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      site:"@CrickClare",
      title: `${author.name} | Crick Clare`,
      description: author.bio,
      images: [`${APP_URL}/images/og/og-banner.png`], // Replace with actual author image if available
    },
  }
}

export default async function AuthorPage({ params }) {
  const { articles } = articlesData

  const { slug } = await params

  const author = articles.find((article) => article.author.name.toLowerCase().replace(/\s+/g, "-") === slug)?.author

  if (!author) {
    notFound()
  }

  const authorArticles = articles.filter((article) => article.author.name.toLowerCase().replace(/\s+/g, "-") === slug)

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

  const sortedArticles = sortArticles(authorArticles)

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: author.name,
      description: author.bio,
      url: `${APP_URL}/author/${slug}`,
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
          name: author.name,
          item: `${APP_URL}/author/${slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Articles by ${author.name}`,
      description: `A collection of articles written by ${author.name}`,
      url: `${APP_URL}/author/${slug}`,
      image:`${APP_URL}/images/og/og-banner.png`,
      // author: {
      //   "@id": `${APP_URL}/author/${slug}`,
      //   "@id": `${APP_URL}/author/${slug}`,
      // },
    },
  ]

  return (
    <>
      <Script id="json-ld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <AuthorClient author={author} authorArticles={sortedArticles} />
    </>
  )
}

export async function generateStaticParams() {
  const { articles } = articlesData

  // Get unique authors
  const uniqueAuthors = [...new Set(articles.map((article) => article.author.name))]

  return uniqueAuthors.map((authorName) => ({
    slug: authorName.toLowerCase().replace(/\s+/g, "-"),
  }))
}

