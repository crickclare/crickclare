"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import articlesData from "../../../data/articles.json"
import categoriesData from "../../../data/categories.json"
import tagsData from "../../../data/tags.json"
import ArticleList from "@/components/ArticleList"

// Function to get all category names for an article
const getCategoryNames = (categoryIds) => {
    return categoryIds
        .map((id) => {
            const category = categoriesData.categories.find((cat) => cat.id === id);
            return category ? category.name : "";
        })
        .filter(Boolean); // Remove any empty strings from the result
};

// Function to get all tag names for an article
const getTagNames = (tagIds) => {
    return tagIds
        .map((id) => {
            const tag = tagsData.tags.find((tag) => tag.id === id); // Corrected 'cat' to 'tag'
            return tag ? tag.name : "";
        })
        .filter(Boolean); // Remove any empty strings from the result
};

// Function to filter articles based on the query
const filterArticles = (query, articles) => {
    return articles.filter((article) => {
        const lowerCaseQuery = query.toLowerCase();
        const categoryNames = getCategoryNames(article.categoryIds);
        const tagNames = getTagNames(article.tagsIds);

        return (
            article.title.toLowerCase().includes(lowerCaseQuery) ||
            article.excerpt.toLowerCase().includes(lowerCaseQuery) ||
            article.slug.toLowerCase().includes(lowerCaseQuery) ||
            categoryNames.some((name) => name.toLowerCase().includes(lowerCaseQuery)) ||
            article.author.name.toLowerCase().includes(lowerCaseQuery) ||
            tagNames.some((name) => name.toLowerCase().includes(lowerCaseQuery))
            // article.tags.some((tag) => tag.name.toLowerCase().includes(lowerCaseQuery))
        );
    });
};

export default function SearchPage() {
    const { query } = useParams()
    const decodedQuery = query ? decodeURIComponent(query) : ""
    const [filteredArticles, setFilteredArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (decodedQuery) {
            setLoading(true)
            const result = filterArticles(decodedQuery, articlesData?.articles)
            const sortArticles = (articles) => {
                return articles.sort((a, b) => {
                    const dateTimeA = new Date(`${a.date} ${a.time}`).getTime()
                    const dateTimeB = new Date(`${b.date} ${b.time}`).getTime()
                    return dateTimeB - dateTimeA
                })
            }
            const sortedArticles = sortArticles(result)
            setFilteredArticles(sortedArticles)
            setLoading(false)
        }
    }, [decodedQuery])

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl mb-6">Search Results for "{decodedQuery}"</h1>
            <div className="mb-16">
                <ArticleList articles={filteredArticles} layout={"grid"} isLoading={loading} />
            </div>
        </div>
    )
}