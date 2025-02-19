import { notFound } from "next/navigation"
import Script from "next/script"
import articlesData from "../../../data/articles.json"
import tagsData from "../../../data/tags.json"
import TagClient from "@/components/TagClient"
import { APP_URL } from "@/config/themeConfig"

export async function generateMetadata({ params }) {
  const { tags } = tagsData
  const { slug } = await params

  const tag = tags.find((tag) => tag.name.toLowerCase().replace(/\s+/g, "-") === slug)

  if (!tag) {
    return {
      title: "Tag Not Found",
    }
  }

  const metadata = {
    title: `${tag.name} | Crick Clare`,
    description: tag.description,
    metadataBase: new URL(APP_URL),
    alternates: {
      canonical: `/tag/${slug}`,
    },
    openGraph: {
      title: `${tag.name} | Crick Clare`,
      description: tag.description,
      url: `${APP_URL}/tag/${slug}`,
      siteName: "Crick Clare",
      images: [
        {
          url: `${APP_URL}/images/og/og-banner.png`,
          width: 1200,
          height: 630,
          alt: tag.name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site:"@CrickClare",
      title: `${tag.name} | Crick Clare`,
      description: tag.description,
      images: [`${APP_URL}/images/og/og-banner.png`],
    },
  }

  return metadata
}

export default async function TagPage({ params }) {
  const { articles } = articlesData
  const { tags } = tagsData

  const { slug } = await params

  // Find the tag based on the slug
  const tag = tags.find((tag) => tag.name.toLowerCase().replace(/\s+/g, "-") === slug)

  if (!tag) {
    notFound()
  }

  const relevantTagIds = [tag.id]

  // Filter articles based on the relevant tag IDs
  const tagArticles = articles.filter((article) => article.tagsIds.some((tagId) => relevantTagIds.includes(tagId)))

  // Sorting function for articles by date and time
  const sortArticles = (articles) => {
    return articles.sort((a, b) => {
      const dateTimeA = new Date(`${a.date} ${a.time}`).getTime()
      const dateTimeB = new Date(`${b.date} ${b.time}`).getTime()

      return dateTimeB | dateTimeA // Sort latest first
    })
  }

  const sortedArticles = sortArticles(tagArticles)

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
          name: tag.name,
          item: `${APP_URL}/tag/${slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Articles tagged with ${tag.name}`,
      description: tag.description,
      url: `${APP_URL}/tag/${slug}`,
      image:`${APP_URL}/images/og/og-banner.png`
    },
  ]

  return (
    <>
      <Script id="json-ld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <TagClient tag={tag} tagArticles={sortedArticles} />
    </>
  )
}

export async function generateStaticParams() {
  const { tags } = tagsData

  return tags.map((tag) => ({
    slug: tag.name.toLowerCase().replace(/\s+/g, "-"),
  }))
}

