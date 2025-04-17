"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "María González",
      role: "Miembro desde 2020",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "Desde que me uní a Planet Fitness, mi vida ha cambiado por completo. Los entrenadores son increíbles y las instalaciones son de primera. He logrado mis objetivos más rápido de lo que esperaba.",
    },
    {
      name: "Juan Pérez",
      role: "Miembro desde 2021",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "La flexibilidad de horarios y la variedad de clases me permiten entrenar sin importar mi agenda laboral. El ambiente es motivador y el equipo siempre está dispuesto a ayudar.",
    },
    {
      name: "Sofía Ramírez",
      role: "Miembro desde 2019",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "He probado varios gimnasios, pero ninguno como Planet Fitness. La comunidad que han creado es increíble y me siento parte de una familia. Los resultados hablan por sí solos.",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section className="py-24 bg-gradient-to-b from-purple-950 to-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-purple-800/50 text-purple-300 text-sm font-medium tracking-wider mb-3">
            TESTIMONIOS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Lo que dicen <span className="text-purple-400">nuestros miembros</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6 mb-6"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-purple-900/30 backdrop-blur-sm p-8 md:p-12 rounded-3xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    width={200}
                    height={200}
                    className="rounded-full object-cover border-4 border-purple-500"
                  />
                  <div className="absolute -top-2 -left-2 bg-purple-600 p-2 rounded-full">
                    <Quote className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xl md:text-2xl text-gray-200 italic mb-6">{testimonials[currentIndex].quote}</p>
                  <div>
                    <h3 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h3>
                    <p className="text-purple-300">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-purple-800/50 hover:bg-purple-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-yellow-400" : "bg-purple-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-purple-800/50 hover:bg-purple-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
