"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { Button } from "../../components/ui/button";
import Logo from "../public/logo biggest.svg";
import Image from "next/image";
import Link from "next/link";

const links = [
  { item: "Servicios", id: "servicios" },
  { item: "Por qué BG", id: "porque" },
  { item: "Planes", id: "planes" },
  { item: "Nuestro equipo", id: "nosotros" },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const hasMounted = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isNearTop = currentScrollPos < 10;

      setIsVisible(isScrollingUp || isNearTop);
      setPrevScrollPos(currentScrollPos);
    };

    if (!hasMounted.current) {
      setPrevScrollPos(window.scrollY);
      hasMounted.current = true;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const dumbbellVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const backgroundClass =
    prevScrollPos > 50
      ? "bg-black-primary/80 backdrop-blur-md py-2 border-b border-yellow-primary/10"
      : "bg-transparent py-4";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${backgroundClass}`}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <motion.div
                variants={dumbbellVariants}
                initial="initial"
                animate="animate"
                className="mr-2 text-yellow-primary"
              >
                <Dumbbell className="h-6 w-6" />
              </motion.div>
              <Image
                src={Logo}
                width={180}
                height={100}
                alt="Logo BG"
                priority={true}
                className=""
              />
            </motion.div>
          </Link>

          {/* Navegación */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((item, index) => (
              <button
                key={index}
                onClick={() => handleScroll(item.id)}
                className="text-white hover:text-yellow-primary text-base font-medium transition-colors duration-200 relative group"
              >
                <span className="relative">
                  {item.item}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-[1px] bg-yellow-primary"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </button>
            ))}
          </nav>

          {/* Botón de acción */}
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden"
            >
              <Link href={"/user"}>
                <Button className="bg-yellow-primary hover:bg-yellow-secondary text-black-primary px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-primary/25 relative overflow-hidden group">
                  <span className="relative z-10">Ingresar</span>
                  <motion.span
                    className="absolute inset-0 bg-white"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
