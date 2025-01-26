import { motion } from "framer-motion"
import { Search, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { searchYouTubeVideos } from "@/lib/youtube"

interface ResultsDisplayProps {
  results: string[]
  onSearchAgain: () => void
}

export function ResultsDisplay({ results = [], onSearchAgain }: ResultsDisplayProps) {
  const [videoResults, setVideoResults] = useState<Array<{ id: string; title: string }>>([])

  useEffect(() => {
    const fetchVideos = async () => {
      const allVideos = await Promise.all(results.map((result) => searchYouTubeVideos(result.split(".")[0])))
      setVideoResults(allVideos)
    }
    fetchVideos()
  }, [results])

  if (results.length === 0) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const arrowVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const highlightText = (text: string) => {
    const importantWords = [
      "galaxy",
      "universe",
      "star",
      "planet",
      "nebula",
      "black hole",
      "supernova",
      "asteroid",
      "comet",
      "moon",
      "solar system",
      "space",
      "light-year",
      "gravity",
      "telescope",
      "satellite",
      "orbit",
      "quasar",
      "pulsar",
      "nova",
      "meteor",
      "dwarf planet",
      "exoplanet",
      "constellation",
    ]
    const numberRegex = /\b\d+(\.\d+)?\b/g

    return text.split(" ").map((word, index) => {
      const cleanWord = word.replace(/[*]/g, "")
      if (importantWords.some((important) => cleanWord.toLowerCase().includes(important))) {
        return (
          <motion.span
            key={index}
            className="bg-blue-200 bg-opacity-20 text-blue-100 font-semibold px-1 rounded"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
          >
            {cleanWord}{" "}
          </motion.span>
        )
      } else if (cleanWord.match(numberRegex)) {
        return (
          <motion.span
            key={index}
            className="bg-yellow-200 bg-opacity-20 text-yellow-100 font-semibold px-1 rounded"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
          >
            {cleanWord}{" "}
          </motion.span>
        )
      }
      return <span key={index}>{cleanWord} </span>
    })
  }

  return (
    <motion.div
      className="flex flex-col items-center space-y-6 mt-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 gap-12 w-full max-w-6xl">
        {results.map((result, index) => (
          <motion.div key={index} className="flex flex-col items-center space-y-4" variants={itemVariants}>
            <div className="flex items-start space-x-4 w-full">
              <div className="flex-shrink-0 w-8">
                <motion.span
                  className="text-3xl font-bold text-pink-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 10, delay: index * 0.1 }}
                >
                  {index + 1}
                </motion.span>
              </div>
              <div className="flex-grow flex space-x-4">
                <motion.div
                  className="flex-1 bg-purple-800 bg-opacity-80 p-6 rounded-2xl shadow-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    className="border-2 border-pink-500 rounded-xl p-4 h-full"
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(236, 72, 153, 0)",
                        "0 0 20px rgba(236, 72, 153, 0.5)",
                        "0 0 0 rgba(236, 72, 153, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <p className="text-white text-lg leading-relaxed font-medium tracking-wide">
                      {highlightText(result)}
                    </p>
                  </motion.div>
                </motion.div>
                {videoResults[index] && videoResults[index][0] && (
                  <motion.div
                    className="flex-1 bg-purple-800 bg-opacity-80 p-4 rounded-2xl shadow-lg backdrop-blur-sm"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.p
                      className="text-xl font-semibold mb-4 text-center"
                      animate={{
                        textShadow: [
                          "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #5271ff, 0 0 82px #5271ff",
                          "0 0 4px #fff, 0 0 7px #fff, 0 0 13px #fff, 0 0 26px #5271ff, 0 0 51px #5271ff",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      Here is a related YouTube video:
                    </motion.p>
                    <iframe
                      width="100%"
                      height="250"
                      src={`https://www.youtube.com/embed/${videoResults[index][0].id}`}
                      title={videoResults[index][0].title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <p className="mt-2 text-sm text-white">{videoResults[index][0].title}</p>
                  </motion.div>
                )}
              </div>
            </div>
            <motion.div
              className="w-full flex justify-center"
              variants={arrowVariants}
              initial="initial"
              animate="animate"
            >
              <ChevronDown size={32} className="text-pink-500" />
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.div className="w-full max-w-2xl mt-12 text-center" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-purple-300 mb-4">Want to know more?</h2>
        <p className="text-white text-lg mb-6">
          Continue your cosmic journey by exploring related topics or asking follow-up questions!
        </p>
        <motion.button
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSearchAgain}
        >
          <Search className="mr-2" size={20} />
          <span>Search Again</span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

