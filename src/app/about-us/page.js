'use client';
import { useTheme } from "@/contexts/ThemeContext";

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
                        Introducing Crick Clare by IndiaToday group, your go-to platform for all things sports! Whether you're a die-hard fan or just getting into the game, Crick Clare has everything you need to stay updated, engaged, and entertained.
                    </p>
                    <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400 mb-4">
                        At Crick Clare, we're passionate about sports. From the latest news and match updates to in-depth analysis and expert insights, we've got you covered. Our Crick Clare team will bring you the most comprehensive coverage of your favorite sports. One of the highlights of Crick Clare is our live score feature. Never miss a moment of the action with real-time updates on matches happening around the world.
                    </p>
                    <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400 mb-4">
                        Whether it's a thrilling Test match, an intense T20 showdown, a nail-biting ODI encounter, a gripping football match, a fast-paced basketball game, or any other exciting sporting event, you can follow all the excitement right here on Crick Clare. But we're more than just scores and stats. Crick Clare is also your one-stop destination for sports news and articles.
                    </p>
                    <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400 mb-4">
                        Stay informed about the latest developments in the world of sports, from match previews and match reports to post-match analysis and trending headlines. Moreover, our expert analysis and opinion pieces provide valuable insights into the strategies, tactics, and trends shaping modern sports. And for those who prefer to consume their sports content on the go, we've got you covered with our mobile-friendly website and app. You can access Crick Clare anytime, anywhere.
                    </p>
                    <p className="md:text-[16px] text-[15px] leading-normal text-gray-600 dark:text-gray-400 mb-4">
                        With comprehensive coverage, real-time updates, and expert analysis, there's no better place to satisfy your sports cravings than Crick Clare.
                    </p>
                </div>
            </div>
        </>
    );
}