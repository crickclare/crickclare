'use client';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';
import React from 'react';

const PrivacyPage = () => {
    const { theme } = useTheme();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);
    return (
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 ${theme === "dark" ? "dark" : ""}`}>
            <div className="max-w-3xl mx-auto mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Privacy Policy
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Last Updated: {formattedDate}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Welcome to <Link href='/'><strong>Crick Clare</strong></Link>. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information.
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">
                    Information We Collect
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    We collect personal and non-personal information such as your name, email, IP address, and browsing behavior through cookies and analytics tools.
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">
                    How We Use Your Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    We use your data to provide you with the latest cricket news, improve user experience, and send relevant updates. You can opt out anytime.
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">
                    Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Email: <a href="mailto:infocrickclare@gmail.com" className="text-blue-600 dark:text-blue-400">infocrickclare@gmail.com</a>
                </p>
            </div>
        </div>
    )
}

export default PrivacyPage