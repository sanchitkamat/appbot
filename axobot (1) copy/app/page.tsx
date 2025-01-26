"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchForm } from "./components/SearchForm"
import { ResultsDisplay } from "./components/ResultsDisplay"
import { ResearchPapers } from "./components/ResearchPapers"
import { SciFiBackground } from "./components/SciFiBackground"

export default function Home() {
  const [results, setResults] = useState<string[]>([])
  const [papers, setPapers] = useState<{ title: string; url: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchFormRef = useRef<HTMLDivElement>(null)

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, previousResults: results }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
        throw new Error("No results found")
      }

      setResults(data.results)
      setPapers(data.papers || [])
      setHasSearched(true)
    } catch (error) {
      console.error("Error fetching results:", error)
      setError(error instanceof Error ? error.message : String(error))
      setResults([])
      setPapers([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    setResults([])
    setPapers([])
    setHasSearched(false)
    setError(null)
  }

  const handleSearchAgain = () => {
    searchFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 relative overflow-hidden">
      <SciFiBackground />
      <div className="z-10 w-full max-w-6xl pt-12 pb-24 px-4">
        <motion.h1
          className="text-7xl font-bold text-center mb-12 relative"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="text-white inline-block"
            animate={{
              textShadow: [
                "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #4169E1, 0 0 70px #4169E1, 0 0 80px #4169E1, 0 0 100px #4169E1, 0 0 150px #4169E1",
                "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #4169E1, 0 0 35px #4169E1, 0 0 40px #4169E1, 0 0 50px #4169E1, 0 0 75px #4169E1",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            Axobot
          </motion.span>
        </motion.h1>
        <motion.div
          ref={searchFormRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <SearchForm onSearch={handleSearch} onBack={handleBack} isLoading={isLoading} canGoBack={hasSearched} />
        </motion.div>
        {error && (
          <motion.div
            className="mt-4 p-4 bg-red-500 text-white rounded-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Error: {error}
          </motion.div>
        )}
        <AnimatePresence>
          {!hasSearched && !error && (
            <motion.div
              className="mt-16 text-center space-y-8"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-6xl font-semibold mb-8"
                animate={{
                  textShadow: [
                    "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #5271ff, 0 0 82px #5271ff, 0 0 92px #5271ff, 0 0 102px #5271ff, 0 0 151px #5271ff",
                    "0 0 4px #fff, 0 0 7px #fff, 0 0 13px #fff, 0 0 26px #5271ff, 0 0 51px #5271ff, 0 0 57px #5271ff, 0 0 64px #5271ff, 0 0 94px #5271ff",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                Embark on a Cosmic Journey
              </motion.p>
              <motion.p
                className="text-3xl text-blue-200 leading-relaxed"
                animate={{
                  textShadow: [
                    "0 0 4px #fff, 0 0 7px #fff, 0 0 13px #fff, 0 0 26px #5271ff, 0 0 51px #5271ff",
                    "0 0 2px #fff, 0 0 4px #fff, 0 0 8px #fff, 0 0 16px #5271ff, 0 0 32px #5271ff",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                From celestial phenomena to cosmic mysteries,
                <br />
                explore the universe with Axobot.
                <br />
                Your gateway to the wonders of space awaits!
              </motion.p>
              <motion.p
                className="text-2xl text-pink-300 mt-8"
                animate={{
                  textShadow: [
                    "0 0 4px #ff69b4, 0 0 7px #ff69b4, 0 0 13px #ff69b4",
                    "0 0 2px #ff69b4, 0 0 4px #ff69b4, 0 0 8px #ff69b4",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                Use the Axobot search bar to explore anything in the cosmos!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {hasSearched && !error && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <ResultsDisplay results={results} onSearchAgain={handleSearchAgain} />
              <ResearchPapers papers={papers} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <footer className="absolute bottom-4 left-4 text-white text-sm">
        © {new Date().getFullYear()} Axobot. All rights reserved. Made by Sanchit Kamat.
      </footer>
    </main>
  )
}

