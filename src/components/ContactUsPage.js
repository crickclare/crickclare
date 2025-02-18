'use client';
import React from 'react'
import { useTheme } from '@/contexts/ThemeContext';

const ContactUsPage = () => {
    const { theme } = useTheme();
    return (
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 ${theme === "dark" ? "dark" : ""}`}>
            <div className="max-w-3xl mx-auto mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Contact Us
                </h1>

                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">
                    Contact Information:
                </h2>
                <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Address:</strong><br />
                    Crick Clare Pvt. Ltd.<br />
                    C-91, Sumeru City Mall,<br />
                    Sudama Chowk, Padsala Banglows,<br />
                    Mota Varachha, Surat, Gujarat, India<br />
                    Pin – 394101.
                </p>
                <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Phone:</strong> +91 9978767803
                </p>
                <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Email:</strong> <a href="mailto:infocrickclare@gmail.com" className="font-bold text-blue-600 dark:text-blue-400">infocrickclare@gmail.com</a>
                </p>

                {/* <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">
                    Disclaimer:
                </h2>
                <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400 mb-4">
                    The information provided on Crick Clare is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no warranties about the completeness, reliability, or accuracy of this information. Any action you take based on the information on this website is strictly at your own risk. Crick Clare will not be liable for any losses and/or damages in connection with the use of our website.
                </p> */}
            </div>
        </div>
    )
}

export default ContactUsPage