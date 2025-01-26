"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const NUM_STARS = 200

export function SciFiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.078125 + 0.03125,
      twinkleSpeed: Math.random() * 0.05 + 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
    }))

    function drawNebula(ctx: CanvasRenderingContext2D, width: number, height: number) {
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2)
      gradient.addColorStop(0, "rgba(75, 0, 130, 0)")
      gradient.addColorStop(0.3, "rgba(75, 0, 130, 0.1)")
      gradient.addColorStop(0.6, "rgba(138, 43, 226, 0.1)")
      gradient.addColorStop(0.8, "rgba(216, 191, 216, 0.1)")
      gradient.addColorStop(1, "rgba(75, 0, 130, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawNebula(ctx, canvas.width, canvas.height)

      stars.forEach((star) => {
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * (1 + twinkle * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + twinkle * 0.5})`
        ctx.shadowColor = "white"
        ctx.shadowBlur = 10 * twinkle
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        star.twinklePhase += star.twinkleSpeed
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-900 via-indigo-900 to-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <motion.div
        className="absolute inset-0 bg-[url('/nebula.png')] bg-cover bg-center opacity-30"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-50" />
    </div>
  )
}

