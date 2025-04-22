"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import Header from "./(components)/header2";
import { BottomNavigation } from "./(components)/bottom-navigation";
import { HeroSection } from "./(components)/hero-section";
import { BenefitsCarousel } from "./(components)/benefits-carousel";
import { ServicesSection } from "./(components)/services-section";
import { FacilitiesSection } from "./(components)/facilities-section";
import { StaffSection } from "./(components)/staff-section";
import { PricingSection } from "./(components)/pricing-section";
import { ThemeProvider } from "./(components)/theme-provider";
import { Dumbbell, Clock, Users, Trophy } from "lucide-react";

const links = [
  { item: "Servicios", link: "servicios" },
  { item: "Por qué BG", link: "porque" },
  { item: "Planes", link: "planes" },
  { item: "Nuestro equipo", link: "nosotros" },
];

export default function Home() {
  const containerRef = useRef(null);
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const benefitsY = useTransform(smoothProgress, [0, 0.3], [100, 0]);
  const benefitsOpacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);

  const benefitVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

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
  ];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const springOptions = { damping: 25, stiffness: 300 };
    animate(cursorX, mousePosition.x, springOptions);
    animate(cursorY, mousePosition.y, springOptions);
  }, [mousePosition, cursorX, cursorY]);

  const floatingElements = [
    {
      icon: <Dumbbell className="w-full h-full" />,
      size: 40,
      delay: 0,
      position: { top: "15%", left: "10%" },
    },
    {
      icon: <Trophy className="w-full h-full" />,
      size: 30,
      delay: 1.5,
      position: { top: "60%", right: "8%" },
    },
    {
      icon: <Clock className="w-full h-full" />,
      size: 35,
      delay: 0.8,
      position: { top: "30%", right: "12%" },
    },
    {
      icon: <Users className="w-full h-full" />,
      size: 45,
      delay: 2.2,
      position: { bottom: "20%", left: "15%" },
    },
  ];

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div
        ref={containerRef}
        className="relative overflow-hidden pb-16 w-full h-screen overflow-y-auto"
      >
        <Header />

        <motion.div
          className="fixed w-8 h-8 rounded-full bg-yellow-primary/20 border border-yellow-primary/50 pointer-events-none z-50 hidden md:block"
          style={{
            left: cursorX,
            top: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="fixed text-yellow-primary/10 pointer-events-none z-10 hidden lg:block"
            style={{
              width: element.size,
              height: element.size,
              ...element.position,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.15,
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: element.delay },
              y: {
                duration: 4 + index,
                repeat: Infinity,
                repeatType: "reverse",
                delay: element.delay,
              },
              rotate: {
                duration: 6 + index,
                repeat: Infinity,
                repeatType: "reverse",
                delay: element.delay,
              },
            }}
          >
            {element.icon}
          </motion.div>
        ))}

        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black-primary via-black-primary to-black-secondary">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] mix-blend-soft-light"></div>
          <div className="absolute top-0 -left-40 w-80 h-80 bg-yellow-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          <div
            className="absolute bottom-0 -right-40 w-80 h-80 bg-yellow-primary/20 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <HeroSection />

        <motion.section
          ref={benefitsRef}
          id="porque"
          className="py-24 relative overflow-hidden min-h-screen"
          style={{
            y: benefitsY,
            opacity: benefitsOpacity,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black-primary/90 to-black-primary/70 backdrop-blur-sm"></div>

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-primary/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-primary/10 rounded-full blur-[80px]"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-center mb-16"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={benefitsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-3 py-1 rounded-full bg-yellow-primary/20 text-yellow-primary text-sm font-medium tracking-wider mb-3"
              >
                BENEFICIOS EXCLUSIVOS
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
              >
                Por qué elegir{" "}
                <span className="text-yellow-primary">Planet Fitness</span>
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                animate={benefitsInView ? { width: "6rem" } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-1 bg-yellow-primary mx-auto mt-6 mb-6"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={benefitsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-4 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Descubre por qué somos el gimnasio preferido por miles de
                personas
              </motion.p>
            </motion.div>

            <div className="lg:hidden">
              <BenefitsCarousel />
            </div>

            <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={benefitVariants}
                  initial="hidden"
                  animate={benefitsInView ? "visible" : "hidden"}
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(255, 215, 0, 0.1), 0 10px 10px -5px rgba(255, 215, 0, 0.04)",
                    transition: { duration: 0.3 },
                  }}
                  className="bg-black-secondary/60 backdrop-blur-sm p-8 rounded-2xl border border-yellow-primary/10 group"
                >
                  <motion.div
                    className="bg-yellow-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-primary/20 transition-colors duration-300"
                    whileHover={{
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <section id="servicios" className="w-full min-h-screen">
          <ServicesSection />
        </section>

        <section id="planes" className="w-full min-h-screen">
          <PricingSection />
        </section>

        <section className="w-full min-h-screen">
          <FacilitiesSection />
        </section>

        <section id="nosotros" className="w-full min-h-screen">
          <StaffSection />
        </section>

        <BottomNavigation />
      </div>
    </ThemeProvider>
  );
}
