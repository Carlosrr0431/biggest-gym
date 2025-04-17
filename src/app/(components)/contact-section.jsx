"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium tracking-wider mb-3">
            CONTÁCTANOS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            ¿Listo para <span className="text-purple-600">comenzar</span>?
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6 mb-6"></div>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para responder tus preguntas y ayudarte a comenzar tu
            viaje fitness
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Información de Contacto
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Ubicación</h4>
                  <p className="text-gray-600 mt-1">
                    Av. Principal 123, Ciudad
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Teléfono</h4>
                  <p className="text-gray-600 mt-1">+123 456 7890</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600 mt-1">info@planetfitness.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Horario</h4>
                  <p className="text-gray-600 mt-1">
                    Lunes - Domingo: 24 horas
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Síguenos
              </h3>
              <div className="flex space-x-4">
                {["Instagram", "Facebook", "Twitter", "YouTube"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="bg-purple-100 p-3 rounded-lg text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
                      aria-label={social}
                    >
                      {social[0]}
                    </a>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-50 p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Envíanos un mensaje
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Tu email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Asunto del mensaje"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Tu mensaje"
                ></textarea>
              </div>

              <Button className="w-full py-6 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                Enviar Mensaje <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
