"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Bath, Dumbbell, Building, Users, Coffee } from "lucide-react"
import { cn } from "../lib/util"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../(components)/ui/tooltip"

const facilities = [
  {
    id: "banos",
    icon: <Bath className="w-6 h-6" />,
    label: "Baños y Vestidores",
    title: "Instalaciones Limpias y Modernas",
    description: "Espacios impecables con duchas privadas, lockers seguros y amenidades premium para tu comodidad.",
    image:
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737921993/WhatsApp_Image_2025-01-09_at_09.56.44_tfo6c2.jpg",
  },
  {
    id: "dispenser",
    icon: <Dumbbell className="w-6 h-6" />,
    label: "Área de Máquinas",
    title: "Equipamiento de Última Generación",
    description: "Más de 100 equipos de cardio y fuerza, distribuidos estratégicamente para tu entrenamiento óptimo.",
    image:
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737921995/WhatsApp_Image_2025-01-09_at_09.56.27_wn1nsh.jpg",
  },
  {
    id: "recepcion",
    icon: <Building className="w-6 h-6" />,
    label: "Recepción",
    title: "Bienvenida Profesional",
    description: "Personal capacitado las 24 horas para atenderte y resolver todas tus dudas.",
    image:
      "https://images.unsplash.com/photo-1600077063877-22118d6290eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "clases",
    icon: <Users className="w-6 h-6" />,
    label: "Salón de Clases",
    title: "Espacios para Clases Grupales",
    description: "Amplias salas equipadas para yoga, spinning, zumba y más actividades grupales.",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "cafeteria",
    icon: <Coffee className="w-6 h-6" />,
    label: "Cafetería",
    title: "Zona de Nutrición",
    description: "Disfruta de bebidas saludables y snacks nutritivos en nuestra área de cafetería.",
    image: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
]

export function FacilitiesSection() {
  const [selectedTab, setSelectedTab] = useState(facilities[0].id)

  return (
    <section className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black-primary mb-4">
            Un lugar para sentirse <span className="text-yellow-primary">bienvenido</span>
          </h2>
          <p className="text-lg text-black-secondary max-w-2xl mx-auto">
            Descubre nuestras modernas instalaciones diseñadas para brindarte la mejor experiencia fitness
          </p>
        </motion.div>

        <div className="flex flex-row gap-4 lg:gap-12 items-start">
          {/* Navigation Sidebar */}
          <div className="flex flex-col gap-4">
            <TooltipProvider>
              {facilities.map((facility) => (
                <Tooltip key={facility.id}>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={() => setSelectedTab(facility.id)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-full lg:rounded-xl transition-all duration-300",
                        "hover:bg-yellow-100 hover:shadow-md",
                        selectedTab === facility.id
                          ? "bg-yellow-primary text-black-primary shadow-lg shadow-yellow-300"
                          : "bg-white text-gray-700 shadow-sm",
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {facility.icon}
                      <span className="hidden lg:inline font-medium">{facility.label}</span>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-black-primary/80 backdrop-blur-md border border-yellow-500/20 text-white hover:text-yellow-300 hover:bg-yellow-500/20 py-2 px-4 lg:hidden"
                  >
                    <p>{facility.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {facilities.map(
                (facility) =>
                  facility.id === selectedTab && (
                    <motion.div
                      key={facility.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="grid lg:grid-cols-2 gap-8 items-start bg-white rounded-2xl p-6 shadow-xl"
                    >
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-black-primary">{facility.title}</h3>
                        <p className="text-black-secondary leading-relaxed">{facility.description}</p>
                      </div>
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={facility.image || "/placeholder.svg"}
                          alt={facility.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
