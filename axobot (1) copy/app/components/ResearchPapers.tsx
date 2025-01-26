import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface ResearchPaper {
  title: string
  url: string
}

interface ResearchPapersProps {
  papers: ResearchPaper[]
}

export function ResearchPapers({ papers }: ResearchPapersProps) {
  if (papers.length === 0) {
    return null
  }

  return (
    <motion.div
      className="w-full max-w-2xl mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-purple-300 mb-6 text-center">Related Research Papers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {papers.map((paper, index) => (
          <motion.div
            key={index}
            className="bg-blue-600 rounded-lg p-4 shadow-lg flex items-start"
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ExternalLink size={18} className="mr-3 mt-1 flex-shrink-0 text-white" />
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors text-sm font-medium"
            >
              {paper.title}
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

