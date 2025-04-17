"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">
                <span className="text-purple-500">PLANET</span>FITNESS
              </span>
            </Link>
            <p className="text-gray-400 mt-4">
              Transformamos vidas a través del fitness, ofreciendo un ambiente motivador y equipamiento de primera
              calidad.
            </p>
            <div className="flex space-x-4 mt-6">
              {["Instagram", "Facebook", "Twitter", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-400 hover:bg-purple-600 hover:text-white transition-colors"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Enlaces Rápidos
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-600"></span>
            </h3>
            <ul className="space-y-3">
              {["Inicio", "Servicios", "Precios", "Instalaciones", "Equipo", "Contacto"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Servicios
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-600"></span>
            </h3>
            <ul className="space-y-3">
              {[
                "Entrenamiento Personal",
                "Clases Grupales",
                "Nutrición",
                "Evaluación Física",
                "Programas Especiales",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Contacto
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-600"></span>
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>Av. Principal 123, Ciudad</li>
              <li>+123 456 7890</li>
              <li>info@planetfitness.com</li>
              <li>Lunes - Domingo: 24 horas</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Planet Fitness. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-white text-sm">
              Términos y Condiciones
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-colors z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </motion.button>
    </footer>
  )
}
