import { APP_URL } from "@/config/themeConfig"
import { JsonLd } from "react-schemaorg"

export default function ArticleJsonLd({ article }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        author: {
            "@type": "Person",
            name: article.author.name,
        },
        image: article.image,
        url: `${APP_URL}/articles/${article.slug}`,
    }

    return <JsonLd item={jsonLd} />
}