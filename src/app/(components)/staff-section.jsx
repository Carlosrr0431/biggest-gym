"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const staffMembers = [
  {
    name: "Ferrucci Nicolas",
    role: "Entrenadora Personal",
    image:
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737921717/WhatsApp_Image_2025-01-09_at_09.52.13_pzxhfo.jpg",
    description:
      "Especialista en pérdida de peso y tonificación muscular con 10 años de experiencia.",
    expertise: [
      "Pérdida de peso",
      "Tonificación",
      "HIIT",
      "Entrenamiento funcional",
    ],
  },
  {
    name: "Perez Leandro",
    role: "Entrenadora Personal",
    image:
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737921717/WhatsApp_Image_2025-01-09_at_09.50.01_g3sxwc.jpg",
    description:
      "Experto en planes de alimentación personalizados para optimizar el rendimiento atlético.",
    expertise: [
      "Nutrición deportiva",
      "Planes personalizados",
      "Suplementación",
      "Control de peso",
    ],
  },
  {
    name: "Sandobal Iván",
    role: "Entrenadora Personal",
    image:
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737921716/WhatsApp_Image_2025-01-09_at_09.48.51_krnqdy.jpg",
    description:
      "Maestra certificada en Hatha y Vinyasa Yoga, especializada en meditación y mindfulness.",
    expertise: ["Hatha Yoga", "Vinyasa", "Meditación", "Mindfulness"],
  },
  {
    name: "Sánchez francisco",
    role: "Kinesiologo",
    image:
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737921716/WhatsApp_Image_2025-01-09_at_09.48.28_koo561.jpg",
    description:
      "Especialista en rehabilitación deportiva y prevención de lesiones.",
    expertise: [
      "Rehabilitación",
      "Terapia manual",
      "Prevención",
      "Masaje deportivo",
    ],
  },
];

export function StaffSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + newDirection + staffMembers.length) % staffMembers.length
    );
  };

  return (
    <section className="bg-gradient-to-br from-yellow-100 via-white to-yellow-50 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black-primary mb-4">
            Conoce a Nuestro{" "}
            <span className="text-yellow-primary">Equipo de Expertos</span>
          </h2>
          <p className="text-lg text-black-secondary max-w-2xl mx-auto">
            Un equipo de profesionales dedicados a ayudarte a alcanzar tus metas
            fitness
          </p>
        </motion.div>

        {/* Mobile and Tablet View */}
        <div className="lg:hidden">
          <div className="max-w-4xl mx-auto">
            {/* Navigation Arrows */}
            <div className="flex justify-end gap-2 mb-8">
              <button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full bg-yellow-100 hover:bg-yellow-200 flex items-center justify-center transition-all duration-300 group"
                aria-label="Anterior miembro del equipo"
              >
                <ChevronLeft className="w-5 h-5 text-black-primary group-hover:text-black-secondary" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full bg-yellow-100 hover:bg-yellow-200 flex items-center justify-center transition-all duration-300 group"
                aria-label="Siguiente miembro del equipo"
              >
                <ChevronRight className="w-5 h-5 text-black-primary group-hover:text-black-secondary" />
              </button>
            </div>

            {/* Staff Member Card - Improved for better description visibility */}
            <div className="relative h-auto min-h-[600px] overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute w-full"
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative h-80 w-full">
                      <Image
                        src={
                          staffMembers[currentIndex].image || "/placeholder.svg"
                        }
                        alt={staffMembers[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <motion.div
                      className="p-6 sm:p-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-2xl font-bold text-black-primary mb-2">
                        {staffMembers[currentIndex].name}
                      </h3>
                      <p className="text-yellow-600 font-medium text-lg mb-4">
                        {staffMembers[currentIndex].role}
                      </p>

                      {/* Improved description container with better spacing and readability */}
                      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-6">
                        <p className="text-black-secondary text-base sm:text-lg leading-relaxed">
                          {staffMembers[currentIndex].description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {staffMembers[currentIndex].expertise.map(
                          (skill, index) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              className="px-3 py-1 bg-yellow-100 text-black-primary rounded-full text-sm font-medium"
                            >
                              {skill}
                            </motion.span>
                          )
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {staffMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newDirection = index > currentIndex ? 1 : -1;
                    setDirection(newDirection);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-yellow-600 w-8"
                      : "bg-yellow-200"
                  }`}
                  aria-label={`Ir al miembro del equipo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View - Improved card layout for better description visibility */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {staffMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-yellow-600 font-medium mb-3">
                  {member.role}
                </p>

                {/* Improved description container */}
                <div className="bg-yellow-50 p-3 rounded-lg border-l-3 border-yellow-400 mb-4 flex-grow">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {member.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-yellow-100 text-black-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
