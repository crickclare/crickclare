import HomeContent from "@/components/HomeContent";
import { APP_URL } from "@/config/themeConfig";
import { JsonLd } from "react-schemaorg";

export async function generateMetadata() {
  return {
    title: 'Latest and Breaking Cricket News | Crick Clare',
    description: 'Get Schedules of International and Domestic cricket matches along with Latest News and ICC Cricket Rankings of Players on CrickClare',
    metadataBase: new URL(APP_URL),
    alternates: {
      canonical: new URL(APP_URL),
    },
    openGraph: {
      url: `${APP_URL}`,
      title: 'Latest and Breaking Cricket News | Crick Clare',
      description: 'Get Schedules of International and Domestic cricket matches along with Latest News and ICC Cricket Rankings of Players on CrickClare',
      type: "website",
      images: `${APP_URL}/images/og/og-banner.png`,
      width: 1200,
      height: 630
    },
    twitter: {
      site: "@CrickClare",
      card: "summary_large_image",
      title: 'Latest and Breaking Cricket News | Crick Clare',
      description: 'Get Schedules of International and Domestic cricket matches along with Latest News and ICC Cricket Rankings of Players on CrickClare',
      images: `${APP_URL}/images/og/og-banner.png`,
      creator: '@CrickClare'
    },
  }
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: 'CrickClare',
    url: `${APP_URL}`,
    potentialAction: {
      "@type": "SearchAction",
      "target": '/search?text={search_term_string}',
      "query-input": "required name=search_term_string"
    }
  },
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
  }
]

export default function Home() {
  return <>
    <JsonLd item={jsonLd} />
    <HomeContent />
  </>
}

