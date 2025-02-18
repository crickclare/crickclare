'use client';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';

export default function Footer() {

  const { theme } = useTheme();

  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const footerCategories = [
    {
      name: 'Series',
      slug: 'series',
      subCategories: [
        { name: 'WPL 2025', slug: '/tag/wpl-2025' },
        { name: 'ICC Champions Trophy 2025', slug: '/tag/champion-trophy-2025' },
        { name: 'IPL 2025', slug: '/tag/ipl-2025' }
      ]
    },
    {
      name: 'Teams',
      slug: 'teams',
      subCategories: [
        { name: 'India', slug: '/category/bcci' },
        { name: 'Australia', slug: '/category/australian-cricket' },
        { name: 'England', slug: '/category/englend-cricket' },
        { name: 'Afghanistan', slug: '/category/afghanistan-cricket' },
        { name: "New Zealand", slug: "/category/new-zealand-cricket" }
      ]
    },
    {
      name: 'News',
      slug: 'news',
      subCategories: [
        { name: 'Latest News', slug: '/' },
      ]
    },
    {
      name: 'Quick Links',
      slug: 'quick-links',
      subCategories: [
        { name: 'Home', slug: '/' },
        { name: 'About Us', slug: '/about-us' },
        { name: 'Contact Us', slug: '/contact-us' }
      ]
    }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container">
        <hr className='border-0 border-gray-600 2xl:mb-[60px] xl:mb-14 lg:mb-12 sm:mb-10 mb-9'></hr>

        <div className="sm:grid justify-between sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[295px_1fr_1fr_1fr_1fr] xl:gap-[70px] lg:gap-10 gap-8">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-1 xl:mr-5 lg:mr-3 sm:mb-0 mb-7">
            <Link href={`/`}>
              <div className="flex items-center lg:max-w-[185px] md:max-w-[165px] max-w-[150px] lg:mb-10 md:mb-8 sm:mb-7 mb-[22px]">
                <Image src={theme === 'light' ? "/images/logo/light-logo.png" : "/images/logo/dark-logo.png"} alt="CrickClare" className="w-full h-auto" width={184} height={128} />
              </div>
            </Link>
            <p className="md:mb-6 sm:mb-5 mb-4 text-gray-600 dark:text-gray-400">
              Get the latest cricket news, match updates, player stats and much more in one place. Stay updated with everything cricket!
            </p>
          </div>

          {footerCategories.map((column, index) => (
            <div key={index} className='sm:border-0 border-t sm:py-0 py-[18px] border-gray-600 sm:block hidden'>
              <div className='flex items-center justify-between gap-2 md:mb-4 sm:mb-3 mb-2.5'>
                <h3 className="xl:text-20 lg:text-lg font-bold leading-tight text-black-200">{column?.name}</h3>
                <div className='w-4 h-4 flex items-center justify-center shrink-0 sm:hidden'>
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d="M11.25 0.89713L6 6.04419L0.75 0.89713" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <ul className="space-y-2">
                {column?.subCategories.map((subcategory, index) => (
                  <li key={index}>
                    <Link href={subcategory.slug} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 md:text-md text-sm font-normal">{subcategory?.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {footerCategories.map((column, index) => (
            <div
              key={index}
              className="sm:border-0 border-t sm:py-0 py-[18px] cursor-pointer border-gray-600 block sm:hidden"
              onClick={() => toggleSection(index)}
            >
              <div className="flex items-center justify-between gap-2 md:mb-4 sm:mb-3">
                <h3 className="xl:text-20 lg:text-lg font-bold leading-tight text-black-200">
                  {column?.name}
                </h3>
                <div
                  className={`group w-4 h-4 flex items-center justify-center shrink-0 sm:hidden ${(openIndex === index) ? 'active' : null}`}
                >
                  <svg className='group-[.active]:rotate-180' width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d="M11.25 0.89713L6 6.04419L0.75 0.89713" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {openIndex === index && (
                <ul className="space-y-2 mt-2.5">
                  {column?.subCategories.map((subcategory, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={subcategory.slug}
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 md:text-md text-sm font-normal"
                      >
                        {subcategory?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

        </div>

        <hr className='border-t border-gray-600 xl:mt-10 xl:mb-[35px] lg:mt-9 lg:mb-6 sm:mt-7 mb-5'></hr>

        <div className="flex flex-col lg:flex-row justify-between lg:items-center sm:gap-1 gap-2">
          <p className="text-gray-600 dark:text-gray-400 lg:text-lg md:text-md sm:text-sm text-sm leading-relaxed font-normal">© 2024 - <Link href="/" className='text-gray-600 dark:text-gray-400 font-bold'>Crick Clare</Link>. All rights reserved.</p>
          <div className="flex items-center md:flex-nowrap flex-wrap lg:justify-center xl:gap-x-[25px] lg:gap-x-4 gap-x-3 gap-y-3">
            <Link href="#" className="text-black-200 lg:text-lg md:text-md sm:text-sm text-sm leading-relaxed font-normal hover:text-green-750">Privacy policy</Link>
            <div className="w-[1px] h-5 bg-gray-600 border-0 block"></div>
            <Link href="#" className="text-black-200 lg:text-lg md:text-md sm:text-sm text-sm leading-relaxed font-normal hover:text-green-750">Terms & conditions</Link>
            <div className="w-[1px] h-5 bg-gray-600 border-0 block"></div>
            <ul className='flex items-center flex-wrap gap-x-4 gap-y-3'>
              <li>
                <Link href="#" className="text-20 text-gray-600 hover:text-blue-600 dark:hover:text-blue-400"><i className="fa-brands fa-facebook-f"></i></Link>
              </li>
              <li>
                <Link href="#" className="text-20 text-gray-600 hover:text-blue-600 dark:hover:text-blue-400"><i className="fa-brands fa-twitter"></i></Link>
              </li>
              <li>
                <Link href="https://youtube.com/@crick_clare?si=8Ukzb04zwCZ5B_v3" className="text-20 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"><i className="fa-brands fa-youtube"></i></Link>
              </li>
              <li>
                <Link href="#" className="text-20 text-gray-600 hover:text-blue-600 dark:hover:text-blue-400"><i className="fa-brands fa-medium"></i></Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/crick_clare" className="text-20 text-gray-600 hover:text-blue-600 dark:hover:text-blue-400"><i className="fa-brands fa-instagram"></i></Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <p className='lg:mt-[30px] sm:mt-4 mt-5 text-gray-600 dark:text-gray-400 md:text-md sm:text-sm text-sm !leading-relaxed md:pb-10 pb-[25px] font-normal tracking-[-0.20000000298023224px]'>Terms for Free Delivery (First Order): This promotion is valid only for the first order placed through NearMe. To qualify, the order must meet the minimum basket size specified in the promotional terms. The offer will expire on the date displayed in the user’s account settings or promotional materials associated with the promotion. Additional terms and restrictions may apply. For complete details, please <Link href={'#'} className='text-green-750 hover:text-black-100 underline'>visit the provided link</Link>.</p> */}
      </div>
    </footer>
  )
}