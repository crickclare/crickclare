
import AboutUsPage from "@/components/AboutUsPage";
import { APP_URL } from "@/config/themeConfig";
import { JsonLd } from "react-schemaorg";

export async function generateMetadata() {
    return {
        title: 'About Us | Crick Clare',
        description: 'Get Schedules of International and Domestic cricket matches along with Latest News and ICC Cricket Rankings of Players on CrickClare',
        metadataBase: `${APP_URL}/about-us`,
        alternates: {
            canonical: `${APP_URL}/about-us`,
        },
        openGraph: {
            url: `${APP_URL}/about-us`,
            title: 'About Us | Crick Clare',
            description: 'Get Schedules of International and Domestic cricket matches along with Latest News and ICC Cricket Rankings of Players on CrickClare',
            type: "website",
            images: `${APP_URL}/images/og/og-banner.png`,
            width: 1200,
            height: 630
        },
        twitter: {
            site: "@CrickClare",
            card: "summary_large_image",
            title: 'About Us | Crick Clare',
            description: 'Get Schedules of International and Domestic cricket matches along with Latest News and ICC Cricket Rankings of Players on CrickClare',
            images: `${APP_URL}/images/og/og-banner.png`,
            creator: '@CrickClare'
        },
    }
}

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Crick Clare",
        alternateName: 'Crick Clare',
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
                name: 'About Us',
                item: `${APP_URL}/about-us`,
            },
        ],
    },
]

export default function AboutUs() {
    return (
        <>
             <JsonLd item={jsonLd} />
            <AboutUsPage/>
        </>
    );
}
