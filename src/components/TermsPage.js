'use client';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';
import React from 'react';

const TermsPage = () => {
    const { theme } = useTheme();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);

    return (
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 ${theme === "dark" ? "dark" : ""}`}>
            <div className="max-w-3xl mx-auto mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-12">
                    Terms & Conditions
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Last Updated:{formattedDate}
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">
                    Use of Website
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    By accessing and using <Link href='/'><strong>Crick Clare</strong></Link>, you agree to comply with these terms. You must be at least 13 years old to use our services.
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">
                    Intellectual Property Rights
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    All content on this website is owned by <Link href='/'><strong>Crick Clare</strong></Link> and protected by copyright laws.
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">
                    Disclaimer
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    We strive for accuracy but do not guarantee completeness or correctness. Use of our content is at your own risk.
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">
                    Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Email: <a href="mailto:infocrickclare@gmail.com" className="text-blue-600 dark:text-blue-400">infocrickclare@gmail.com</a>
                </p>
            </div>
        </div>
    );
};

export default TermsPage;


