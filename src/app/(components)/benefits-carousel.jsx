"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Dumbbell, Clock, Users, Trophy } from "lucide-react"
import { Button } from "../../components/ui/button"

const benefits = [
  {
    icon: <Dumbbell className="w-8 h-8 text-yellow-primary" />,
    title: "Equipamiento de Última Generación",
    description:
      "Accede a máquinas y equipos modernos diseñados para maximizar tus resultados y hacer tu entrenamiento más efectivo.",
  },
  {
    icon: <Clock className="w-8 h-8 text-yellow-primary" />,
    title: "Abierto 24/7",
    description:
      "Entrena cuando quieras con nuestro horario flexible que se adapta a tu estilo de vida y rutina diaria.",
  },
  {
    icon: <Users className="w-8 h-8 text-yellow-primary" />,
    title: "Clases Grupales Incluidas",
    description:
      "Participa en nuestras clases grupales dirigidas por instructores expertos, incluidas en tu membresía sin costo adicional.",
  },
  {
    icon: <Trophy className="w-8 h-8 text-yellow-primary" />,
    title: "Entrenadores Profesionales",
    description:
      "Recibe orientación personalizada de nuestros entrenadores certificados para alcanzar tus objetivos más rápido.",
  },
]

export function BenefitsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const carouselRef = useRef(null)
  const isInView = useInView(carouselRef, { once: false, amount: 0.3 })

  // Responsive items to show
  const getItemsToShow = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 640 ? 1 : 2
    }
    return 2
  }

  const [itemsToShow, setItemsToShow] = useState(2)
  const maxIndex = benefits.length - itemsToShow

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow())
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((current) => (current < maxIndex ? current + 1 : 0))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((current) => (current > 0 ? current - 1 : maxIndex))
  }

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, autoplay, maxIndex])

  // Pause autoplay on hover
  const pauseAutoplay = () => setAutoplay(false)
  const resumeAutoplay = () => setAutoplay(true)

  // Variants for card animations
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  }

  // Gym-themed animation for icons
  const iconVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: [-5, 5, -5, 5, 0],
      scale: [1, 1.1, 0.9, 1.1, 1],
      transition: { duration: 0.6 },
    },
  }

  return (
    <div ref={carouselRef} className="relative" onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}>
      {/* Navigation Arrows with enhanced styling */}
      <div className="flex justify-end gap-2 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="h-10 w-10 rounded-full border-yellow-primary/30 hover:border-yellow-primary hover:bg-yellow-primary/10 text-yellow-primary transition-all duration-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="h-10 w-10 rounded-full border-yellow-primary/30 hover:border-yellow-primary hover:bg-yellow-primary/10 text-yellow-primary transition-all duration-300"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Cards Container with improved animations */}
      <div className="overflow-hidden">
        <div className="flex gap-4 sm:gap-8">
          {benefits.slice(currentIndex, currentIndex + itemsToShow).map((benefit, index) => (
            <motion.div
              key={`${currentIndex}-${index}`}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate={isInView ? "center" : "enter"}
              exit="exit"
              className={`${itemsToShow === 1 ? "w-full" : "min-w-[calc(50%-1rem)]"} bg-black-secondary/60 backdrop-blur-sm p-6 rounded-2xl border border-yellow-primary/10 hover:border-yellow-primary/30 transition-all duration-300 shadow-lg hover:shadow-yellow-primary/5`}
            >
              <motion.div
                className="bg-yellow-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? "w-8 h-2 bg-yellow-primary rounded-full"
                : "w-2 h-2 bg-yellow-primary/30 rounded-full hover:bg-yellow-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
