import { Grid, List } from "lucide-react"

export default function LayoutToggle({ layout, setLayout }) {
  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
      <button
        onClick={() => setLayout("grid")}
        className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
          layout === "grid"
            ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        }`}
        aria-label="Grid View"
      >
        <Grid size={20} />
      </button>
      <button
        onClick={() => setLayout("list")}
        className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
          layout === "list"
            ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        }`}
        aria-label="List View"
      >
        <List size={20} />
      </button>
    </div>
  )
}

