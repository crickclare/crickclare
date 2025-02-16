'use client';
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";

export default function AboutUs() {
    const { theme } = useTheme();

    return (
        <>
            <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 ${theme === "dark" ? "dark" : ""}`}>
                <div className="max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        About Us
                    </h1>
                    <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400 mb-4">
                        Welcome to <Link href={`/`} className="font-bold">Crick Clare</Link>, your ultimate cricket hub! Whether you're a lifelong cricket enthusiast or a newcomer to the sport, Crick Clare is your one-stop destination to stay connected to the world of cricket, offering the latest news, match updates, expert analysis, and much more.
                    </p>
                    <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400 mb-4">
                        At <Link href={`/`} className="font-bold">Crick Clare</Link>, we live and breathe cricket. Our goal is to bring you up-to-the-minute news and insights, keeping you fully engaged in every aspect of the game. From the latest headlines to in-depth articles, we cover everything cricket. Whether it's Test, ODIs, T20s, or any other format and cricket leagues, <Link href={`/`} className="font-bold">Crick Clare</Link> keeps you updated.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-4">
                        What We Offer:
                    </h2>
                    <ul className="list-disc pl-6 space-y-4">
                        <li className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400">
                            <strong className="font-bold">Latest News & Updates:</strong> Never miss a moment of the action! Our real-time live updates let you follow matches happening around the world. With just a glance, stay on top of the latest cricket action, from thrilling Test series to the fast-paced T20s.
                        </li>
                        <li className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400">
                            <strong className="font-bold">Cricket News & Features:</strong> Stay updated with the latest cricket developments. Whether it’s breaking news, match previews, post-match analysis, or trending topics, <Link href={`/`} className="font-bold">Crick Clare</Link> ensures you're always in the know.
                        </li>
                        <li className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400">
                            <strong className="font-bold">Mobile-Friendly Access:</strong> With our responsive website, you can take <Link href={`/`} className="font-bold">Crick Clare</Link> with you wherever you go. Whether you're at the stadium, at home, or on the move, we ensure that you can access all the latest cricket action at your fingertips.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
