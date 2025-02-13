import ArticleCard from "./ArticleCard"
import categoriesData from "../data/categories.json"

export default function RelatedArticles({ currentArticle, articles }) {
  // Helper function to get all related category IDs (including parent and child categories)
  const getRelatedCategoryIds = (categoryIds) => {
    if (!categoryIds || categoryIds.length === 0) return []

    const relatedIds = new Set()

    categoryIds.forEach((catId) => {
      // Add the current category
      relatedIds.add(catId)

      // Find the category
      const category = categoriesData.categories.find((c) => c.id === catId)

      if (category) {
        // If it has a parent, add the parent
        if (category.parentId) {
          relatedIds.add(category.parentId)
        }

        // Add any child categories
        categoriesData.categories.filter((c) => c.parentId === category.id).forEach((child) => relatedIds.add(child.id))
      }
    })

    return Array.from(relatedIds)
  }

  const sortArticles = (articles) => {
    return articles.sort((a, b) => {
      // Combine date and time into a single datetime string for comparison
      const dateTimeA = new Date(`${a.date} ${a.time}`).getTime()
      const dateTimeB = new Date(`${b.date} ${b.time}`).getTime()

      // Sort by datetime, latest first
      return dateTimeB - dateTimeA
    })
  }

  // Filter related articles based on shared tags or categories
  const relatedArticles = articles
    .filter((article) => {
      if (article.id === currentArticle.id) return false;

      // Get all related category IDs for both articles
      const currentArticleCategories = getRelatedCategoryIds(currentArticle.categoryIds);
      const articleCategories = getRelatedCategoryIds(article.categoryIds);

      // Check if articles share any categories (including parent-child relationships)
      const sharedCategories =
        currentArticleCategories.length > 0 &&
        articleCategories.length > 0 &&
        articleCategories.some((catId) => currentArticleCategories.includes(catId));

      // Get tags for both articles
      const currentArticleTags = currentArticle.tagsIds || [];
      // console.log(currentArticleTags,'currentArticleTags')
      const articleTags = article.tagsIds || [];
      // console.log(articleTags,'articleTags')

      // Check if articles share any tags
      const sharedTags =
        currentArticleTags.length > 0 &&
        articleTags.length > 0 &&
        articleTags.some((tag) => currentArticleTags.some((currentTag) => currentTag.id === tag.id));

      // Return articles that share categories or tags
      return sharedCategories || sharedTags;
    })
    .slice(0, 3); // Limit to 3 related articles


  const sortedArticles = sortArticles(relatedArticles) // Sort articles by date and time

  if (sortedArticles.length === 0) return null

  return (
    <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Related Articles</h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sortedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

