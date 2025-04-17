"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Button } from "../(components)/ui/button";
import { Dumbbell } from "lucide-react";
import videoSource from "../public/portadaEscritorio.mp4";
import Link from "next/link";

const phrase = "Movernos, movernos sanamente";

export function HeroSection() {
  const containerRef = useRef(null);
  const dumbbellX = useMotionValue(0);
  const dumbbellY = useMotionValue(0);
  const smoothX = useSpring(dumbbellX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(dumbbellY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / 25;
      const y = (clientY - innerHeight / 2) / 25;
      dumbbellX.set(x);
      dumbbellY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [dumbbellX, dumbbellY]);

  const renderAnimatedWords = (text) => {
    const words = text.split(" ");
    return words.map((word, i) => (
      <motion.span
        key={i}
        className="inline-block whitespace-nowrap mr-2"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: i * 0.2,
          duration: 0.8,
          ease: [0.33, 1, 0.68, 1], // easeOutCubic
        }}
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-8"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1] brightness-[50%]"
      >
        <source src={videoSource} type="video/mp4" />
      </video>

      {/* Gradient Background Overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black-primary via-black-primary to-black-secondary opacity-80">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] mix-blend-soft-light"></div>
        <div className="absolute top-0 -left-40 w-80 h-80 bg-yellow-primary/30 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-0 -right-40 w-80 h-80 bg-yellow-primary/30 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[90%] sm:max-w-[600px] text-center space-y-8 py-24">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 font-bold tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl break-words">
          {renderAnimatedWords(phrase)}
        </h1>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Link
            href={
              "https://wa.me/+543876364202?text=Hola!!! Te escribo desde la Landing Page, y quiero saber más información sobre suscribirme a un plan."
            }
          >
            <Button className="relative bg-yellow-400 text-black font-bold px-8 py-4 rounded-full text-base sm:text-lg hover:bg-yellow-300 transition-all shadow-lg">
              <span className="z-10 relative">Sumate</span>
              <motion.span
                className="absolute inset-0 rounded-full bg-white opacity-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1.3 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Floating dumbbell */}
      <motion.div
        className="absolute hidden lg:block text-yellow-400/30"
        style={{ x: smoothX, y: smoothY, right: "10%", top: "30%" }}
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Dumbbell size={120} strokeWidth={1} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
