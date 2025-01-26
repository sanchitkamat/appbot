import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ArrowLeft } from "lucide-react"

interface SearchFormProps {
  onSearch: (query: string) => void
  onBack: () => void
  isLoading: boolean
  canGoBack: boolean
}

export function SearchForm({ onSearch, onBack, isLoading, canGoBack }: SearchFormProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative flex items-center">
        {canGoBack && (
          <motion.button
            type="button"
            onClick={onBack}
            className="mr-2 p-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50 transition-all duration-300"
            style={{ marginLeft: "-2px" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft size={24} />
          </motion.button>
        )}
        <motion.input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Explore space phenomena..."
          className="w-full px-6 py-4 text-lg bg-purple-900 bg-opacity-50 text-white placeholder-purple-300 border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all duration-300"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-600 hover:bg-pink-700 text-white rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search size={24} />
        </motion.button>
      </div>
      {isLoading && (
        <motion.div
          className="mt-6 text-center text-purple-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            Exploring the cosmos...
          </motion.span>
        </motion.div>
      )}
    </form>
  )
}

