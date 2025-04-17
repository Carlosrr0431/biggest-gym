"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Dumbbell, Award, ShoppingBag } from "lucide-react";

const navItems = [
  { name: "Inicio", icon: <Home className="w-6 h-6" />, id: "" },
  { name: "Planes", icon: <Award className="w-6 h-6" />, id: "planes" },
  {
    name: "Servicios",
    icon: <Dumbbell className="w-6 h-6" />,
    id: "servicios",
  },
  {
    name: "Nosotros",
    icon: <ShoppingBag className="w-6 h-6" />,
    id: "nosotros",
  },
];

export function BottomNavigation() {
  const [activeTab, setActiveTab] = useState("Inicio");

  const handleScroll = (id, name) => {
    setActiveTab(name);
    const section = id ? document.getElementById(id) : document.body;
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // le da tiempo a que el header se oculte si está animado
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Gradient shadow for better visibility */}
      <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <nav className="bg-black-primary/90 backdrop-blur-md border-t border-yellow-primary/20 px-2 py-2">
        <ul className="flex justify-around items-center">
          {navItems.map((item) => (
            <li key={item.name} className="relative">
              <button
                onClick={() => handleScroll(item.id, item.name)}
                className="flex flex-col items-center px-2 py-1"
              >
                <div
                  className={`relative p-1 rounded-full ${
                    activeTab === item.name
                      ? "text-yellow-primary"
                      : "text-gray-400"
                  }`}
                >
                  {activeTab === item.name && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-yellow-primary/10 rounded-full"
                      initial={false}
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <div className="relative z-10">{item.icon}</div>
                </div>
                <span
                  className={`text-xs mt-1 font-medium ${
                    activeTab === item.name
                      ? "text-yellow-primary"
                      : "text-gray-400"
                  }`}
                >
                  {item.name}
                </span>

                {activeTab === item.name && (
                  <motion.div
                    className="absolute -bottom-1 w-1 h-1 bg-yellow-primary rounded-full"
                    layoutId="activeDot"
                    initial={false}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
