"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../(components)/ui/carousel"
import { Button } from "../(components)/ui/button"
import { ArrowRight, X } from "lucide-react"

const services = [
  {
    title: "Asesoría a Clubes",
    highlight: "deportivos",
    description:
      "Optimiza la gestión de tu club con nuestro equipo de expertos. Desarrollamos estrategias personalizadas para mejorar la experiencia de tus miembros y maximizar el rendimiento de tus instalaciones.",
    images: [
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737921590/IMG_8753_xg2j0w.jpg",
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737921590/IMG_8753_xg2j0w.jpg",
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737921590/IMG_8753_xg2j0w.jpg",
    ],
    modalContent: {
      title: "ASESORÍA CLUBES",
      description:
        "Optimizamos la gestión y el rendimiento de tu club deportivo con nuestra asesoría especializada, abarcando todos los aspectos clave para el éxito.",
      details: [
        {
          title: "Organización Jerárquica",
          description:
            "Estructuramos tu equipo de trabajo con puestos jerárquicos, desde un head coach hasta las divisiones formativas, asegurando una cadena de mando clara y eficiente.",
        },
        {
          title: "Planificación a Largo Plazo",
          description:
            "Desarrollamos planes basados en el desarrollo del atleta a largo plazo, cubriendo todas las etapas desde el aprendizaje y formación hasta la competencia de alto rendimiento.",
        },
        {
          title: "Lineamientos Específicos",
          description:
            "Creamos directrices personalizadas basadas en los ideales del club, implementando evaluaciones de proceso, formativas y de resultados para un seguimiento integral.",
        },
        {
          title: "Capacitación y Ejecución",
          description:
            "Ofrecemos capacitación exhaustiva del personal y establecemos directrices claras para la ejecución efectiva del plan estratégico.",
        },
        {
          title: "Supervisión y Balances",
          description:
            "Realizamos una supervisión constante y entregamos balances periódicos durante todo el proceso, garantizando la mejora continua y el logro de objetivos.",
        },
      ],
    },
  },
  {
    title: "Asesoría a",
    highlight: "Gimnasios",
    description:
      "Potencia tu gimnasio con soluciones innovadoras. Desde la planificación del espacio hasta programas de entrenamiento, te ayudamos a crear un ambiente fitness excepcional.",
    images: [
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737921590/ASESORI%CC%81AS_A_GIMNASIOS_coasvb.jpg",
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737921590/ASESORI%CC%81AS_A_GIMNASIOS_coasvb.jpg",
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737921590/ASESORI%CC%81AS_A_GIMNASIOS_coasvb.jpg",
    ],
    modalContent: {
      title: "ASESORÍA GIMNASIOS",
      description:
        "Elevamos el nivel de tu gimnasio con nuestra asesoría especializada y metodología probada, basada en años de experiencia y razonamiento científico.",
      details: [
        {
          title: "Organización del Equipo",
          description:
            "Estructuramos tu equipo de trabajo de manera eficiente, desde el coordinador hasta el profesor encargado de la sala de acondicionamiento físico, asegurando una gestión óptima de tu gimnasio.",
        },
        {
          title: "Metodología Bigggest",
          description:
            "Implementamos nuestra metodología Bigggest, fundamentada en el razonamiento científico y respaldada por más de quince años de experiencia en el sector del fitness y la salud.",
        },
        {
          title: "Servicio Integral",
          description:
            "Diseñamos y enseñamos un servicio completo enfocado en la salud, el fitness y el rendimiento deportivo, adaptado a las necesidades específicas de tu gimnasio y sus miembros.",
        },
        {
          title: "Capacitación Continua",
          description:
            "Ofrecemos capacitación permanente del personal y establecemos directrices claras para la ejecución efectiva del plan, asegurando un servicio de alta calidad y actualizado.",
        },
        {
          title: "Supervisión y Seguimiento",
          description:
            "Realizamos una supervisión constante y entregamos balances periódicos durante todo el proceso, garantizando la mejora continua y el logro de los objetivos establecidos para tu gimnasio.",
        },
      ],
    },
  },
  {
    title: "Servicios de",
    highlight: "Kinesiología",
    description:
      "Rehabilitación y prevención profesional. Nuestro equipo de kinesiólogos expertos ofrece tratamientos personalizados para optimizar tu recuperación y rendimiento físico.",
    images: [
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737922176/WhatsApp_Image_2025-01-09_at_09.57.11_vjb6kx.jpg",
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737922176/WhatsApp_Image_2025-01-09_at_09.57.11_vjb6kx.jpg",
      "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1737922176/WhatsApp_Image_2025-01-09_at_09.57.11_vjb6kx.jpg",
    ],
    modalContent: {
      title: "SERVICIOS DE KINESIOLOGÍA",
      description:
        "Nuestro enfoque se centra en la rehabilitación de lesiones traumatológicas y la reinserción deportiva, asegurando una recuperación completa y funcional.",
      details: [
        {
          title: "Especialista a Cargo",
          description: "Francisco Sanchez - Lic. En Kinesiología y Fisioterapia M.P. 1252",
        },
        {
          title: "Enfoque del Servicio",
          description:
            "Nos especializamos en la rehabilitación de lesiones de índole traumatológica, y en la rehabilitación y reinserción deportiva.",
        },
        {
          title: "Proceso Personalizado",
          description:
            "Nos aseguramos de indagar, evaluar y planificar todo acerca de tu lesión para enfocar tu proceso de recuperación de la mejor manera posible.",
        },
        {
          title: "Objetivo Principal",
          description:
            "Nuestro objetivo es llevarte a una REHABILITACIÓN FUNCIONAL COMPLETA, logrando tus objetivos personales de recuperación y rendimiento.",
        },
        {
          title: "Metodología",
          description:
            "Utilizamos técnicas avanzadas y un enfoque integral para garantizar no solo la recuperación de la lesión, sino también la prevención de futuras complicaciones.",
        },
      ],
    },
  },
]

export function ServicesSection() {
  const [openModal, setOpenModal] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const modalVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <section className="bg-gray-50 py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black-primary mb-4">
            Servicios <span className="text-yellow-primary">Especializados</span>
          </h2>
          <p className="text-lg text-black-secondary max-w-2xl mx-auto">
            Descubre nuestra gama completa de servicios profesionales diseñados para elevar la calidad y el rendimiento
            de tu establecimiento deportivo
          </p>
        </motion.div>

        <div className="grid gap-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8 lg:gap-12`}
            >
              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <motion.h3
                  className="text-3xl sm:text-4xl font-bold text-black-primary"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {service.title} <span className="text-yellow-primary">{service.highlight}</span>
                </motion.h3>
                <motion.p
                  className="text-lg text-black-secondary"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {service.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {service.modalContent && (
                    <Button
                      className="group bg-yellow-primary hover:bg-yellow-secondary text-black-primary"
                      onClick={() => setOpenModal(service.title)}
                    >
                      Saber más
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </motion.div>
              </div>

              {/* Carousel */}
              <div className="w-full lg:w-1/2">
                <Carousel className="w-full">
                  <CarouselContent>
                    {service.images.map((image, imageIndex) => (
                      <CarouselItem key={imageIndex}>
                        <div className="relative aspect-video overflow-hidden rounded-xl">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${service.title} imagen ${imageIndex + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              onClick={() => setOpenModal(null)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl overflow-hidden max-h-[85vh] h-auto"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
            >
              <div className="relative flex flex-col h-[85vh]">
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-primary pr-8">
                    {services.find((s) => s.title === openModal)?.modalContent?.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenModal(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    {services.find((s) => s.title === openModal)?.modalContent?.description}
                  </p>
                  <div className="space-y-4 sm:space-y-6">
                    {services
                      .find((s) => s.title === openModal)
                      ?.modalContent?.details.map((detail, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-purple-50 rounded-lg p-3 sm:p-4 shadow-sm"
                        >
                          <h4 className="text-base sm:text-lg font-semibold text-yellow-800 mb-2">{detail.title}</h4>
                          <p className="text-sm sm:text-base text-black-secondary">{detail.description}</p>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
