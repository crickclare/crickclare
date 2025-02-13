import Link from "next/link"

export default function AuthorNotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Author Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">Sorry, we couldn't find any articles with this author.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        Return to Home
      </Link>
    </div>
  )
}

