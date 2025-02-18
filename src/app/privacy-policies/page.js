import PrivacyPage from '@/components/PrivacyPage';
import { APP_URL } from '@/config/themeConfig';
import React from 'react';
import { JsonLd } from 'react-schemaorg';

export async function generateMetadata() {
    return {
        title: 'Privacy Policy | Crick Clare',
        description: 'Get Schedules of International and Domestic cricket matches along with Latest News and ICC Cricket Rankings of Players on CrickClare',
        metadataBase: `${APP_URL}/privacy-policies`,
        alternates: {
            canonical: `${APP_URL}/privacy-policies`,
        },
        openGraph: {
            url: `${APP_URL}/privacy-policies`,
            title: 'Privacy Policy | Crick Clare',
            description: 'Get Schedules of International and Domestic cricket matches along with Latest News and ICC Cricket Rankings of Players on CrickClare',
            type: "website",
            images: `${APP_URL}/images/og/og-banner.png`,
            width: 1200,
            height: 630
        },
        twitter: {
            site: "@CrickClare",
            card: "summary_large_image",
            title: 'Privacy Policy | Crick Clare',
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
            "https://youtube.com/@crick_clare?si=IpnbnfehR9xyySLa",
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
                name: 'Privacy Policy',
                item: `${APP_URL}/privacy-policies`,
            },
        ],
    },
]

const Privacy = () => {
    return (
        <>
            <JsonLd item={jsonLd} />
            <PrivacyPage />
        </>
    );
};

export default Privacy;