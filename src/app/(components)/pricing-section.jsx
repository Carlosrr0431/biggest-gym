"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Dumbbell } from "lucide-react";
import { Button } from "../(components)/ui/button";

const plans = [
  {
    id: "x2",
    name: "PLAN X2",
    price: "28.500",
    description: "Plan básico para comenzar tu rutina",
    features: [
      "Incluye 8 clases por mes",
      "Acceso a área de musculación",
      "Evaluación inicial",
      "App de seguimiento",
    ],
    popular: false,
    gradient: "from-blue-700 to-blue-900",
  },
  {
    id: "x3",
    name: "PLAN X3",
    price: "35.900",
    description: "El plan más elegido por nuestros miembros",
    features: [
      "Incluye 12 clases por mes",
      "Acceso a área de musculación",
      "Evaluación mensual",
      "App de seguimiento",
      "Acceso a todas las sedes",
    ],
    popular: true,
    gradient: "from-blue-600 to-blue-800",
  },
  {
    id: "libre",
    name: "PLAN LIBRE",
    price: "42.900",
    description: "Acceso total sin restricciones",
    features: [
      "Clases ilimitadas",
      "Acceso a área de musculación",
      "Evaluaciones semanales",
      "App de seguimiento premium",
      "Acceso a todas las sedes",
      "Invitados gratis 1 vez al mes",
    ],
    popular: false,
    gradient: "from-blue-500 to-blue-700",
  },
];

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setSelectedPlan(
      (prev) => (prev + newDirection + plans.length) % plans.length
    );
  };

  // Gym-themed animation for pricing cards
  const cardVariants = {
    initial: { y: 0 },
    hover: {
      y: -15,
      transition: { duration: 0.3 },
    },
  };

  // Dumbbell animation for pricing
  const dumbbellVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: {
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 0.9, 1],
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white to-blue-50 py-24 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30" />

        {/* Animated dumbbell */}
        <motion.div
          className="absolute top-1/4 right-10 text-blue-300/20 hidden lg:block"
          variants={dumbbellVariants}
          initial="initial"
          animate="animate"
        >
          <Dumbbell size={120} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Planes <span className="text-blue-600">Flexibles</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus objetivos y estilo de vida
          </p>
        </motion.div>

        {/* Plan Navigation */}
        <div className="flex justify-center mb-12 overflow-x-auto py-2 lg:hidden">
          <div className="bg-white rounded-full shadow-lg p-1 flex">
            {plans.map((plan, index) => (
              <motion.button
                key={plan.id}
                onClick={() => setSelectedPlan(index)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedPlan === index
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-blue-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {plan.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile and Tablet View */}
        <div className="lg:hidden">
          <div className="relative h-[650px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={selectedPlan}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
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
                <div
                  className={`
                  w-full max-w-md mx-auto rounded-2xl overflow-hidden
                  bg-gradient-to-br ${plans[selectedPlan].gradient}
                  shadow-xl transform-gpu
                `}
                >
                  <div className="relative p-8 text-white">
                    {plans[selectedPlan].popular && (
                      <div className="bg-yellow-400 text-blue-900 px-3 py-1 text-sm font-bold rounded-full absolute top-4 right-4">
                        Más Popular
                      </div>
                    )}
                    <h3 className="text-4xl font-bold text-white mb-2">
                      {plans[selectedPlan].name}
                    </h3>
                    <p className="text-lg opacity-90 mb-6">
                      {plans[selectedPlan].description}
                    </p>
                    <div className="mb-8">
                      <span className="text-5xl font-bold">
                        $ {plans[selectedPlan].price}
                      </span>
                      <span className="text-xl opacity-90 ml-2">/mes</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plans[selectedPlan].features.map((feature) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-3"
                        >
                          <Check className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-lg opacity-90">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Button className="w-full py-6 text-lg bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold">
                      Consultar Por Más Información
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover="hover"
              className={`
                rounded-2xl overflow-hidden
                bg-gradient-to-br ${plan.gradient}
                shadow-xl
              `}
            >
              <div className="relative p-8 text-white h-full flex flex-col">
                {plan.popular && (
                  <div className="bg-yellow-400 text-blue-900 px-3 py-1 text-sm font-bold rounded-full absolute top-4 right-4">
                    Más Popular
                  </div>
                )}
                <h3 className="text-4xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-lg opacity-90 mb-6 flex-grow">
                  {plan.description}
                </p>
                <div className="mb-8">
                  <span className="text-5xl font-bold">$ {plan.price}</span>
                  <span className="text-xl opacity-90 ml-2">/mes</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <Check className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-lg opacity-90">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button className="w-full py-6 text-lg bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold mt-auto">
                  Consultar Por Más Información
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lesiones Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl opacity-90" />
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">LESIONES</h3>
              <p className="text-xl opacity-90 max-w-md">
                Ofrecemos servicios especializados de readaptación para lesiones
                deportivas y musculares.
              </p>
            </div>
            <div className="w-full md:w-auto text-center">
              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 text-base font-semibold leading-snug break-words">
                Consultar Por Bases Y Condiciones
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
