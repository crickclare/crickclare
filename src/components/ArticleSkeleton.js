"use client"

export default function ArticleSkeleton({ layout }) {
    if (layout === "list") {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row animate-pulse">
                <div className="relative w-full md:w-1/3 h-48 md:h-auto bg-gray-300 dark:bg-gray-700"></div>
                <div className="px-6 py-14 flex flex-col flex-grow">
                    <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
                    <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded ml-2"></div>
                        </div>
                        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        )
    }

    // Grid layout
    return (
        <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col h-[600px] animate-pulse">
            <div className="relative overflow-hidden min-h-[250px] bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex flex-col flex-grow p-6">
                <div className="flex-grow">
                    <div className="h-8 w-/4 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-8 w-/4 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-6 w-[240px] bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
                    <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded ml-2"></div>
                        </div>
                        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
                <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded mt-4"></div>
            </div>
        </div>
    )
}