// "use client"

// import { useEffect } from "react"
// import Link from "next/link"
// import { motion, AnimatePresence } from "framer-motion"
// import { X, ChevronRight, Instagram, Facebook, Twitter, Youtube, Dumbbell } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useMobileMenu } from "@/hooks/use-mobile-menu"

// export function MobileMenu() {
//   const { isOpen, setIsOpen } = useMobileMenu()

//   // Close the menu when the escape key is pressed
//   useEffect(() => {
//     const handleEsc = (event) => {
//       if (event.key === "Escape") setIsOpen(false)
//     }
//     window.addEventListener("keydown", handleEsc)

//     return () => {
//       window.removeEventListener("keydown", handleEsc)
//     }
//   }, [setIsOpen])

//   // Prevent scrolling when menu is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden"
//     } else {
//       document.body.style.overflow = "unset"
//     }

//     return () => {
//       document.body.style.overflow = "unset"
//     }
//   }, [isOpen])

//   const menuItems = [
//     { name: "Inicio", href: "#" },
//     { name: "Planes", href: "#planes" },
//     { name: "Por qué PF", href: "#porque" },
//     { name: "Entrena con Nosotros", href: "#services" },
//     { name: "Instalaciones", href: "#facilities" },
//     // { name: "Equipo", href: "#team" },
//     // { name: "Contacto", href: "#contact" },
//   ]

//   // Animation variants
//   const menuVariants = {
//     closed: {
//       x: "100%",
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 40,
//         when: "afterChildren",
//         staggerChildren: 0.05,
//         staggerDirection: -1,
//       },
//     },
//     open: {
//       x: 0,
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 40,
//         when: "beforeChildren",
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   }

//   const itemVariants = {
//     closed: {
//       x: 50,
//       opacity: 0,
//       transition: { duration: 0.2 },
//     },
//     open: {
//       x: 0,
//       opacity: 1,
//       transition: { duration: 0.4 },
//     },
//   }

//   const socialVariants = {
//     closed: {
//       y: 20,
//       opacity: 0,
//       transition: { duration: 0.2 },
//     },
//     open: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.4, delay: 0.6 },
//     },
//   }

//   // Gym-themed animation
//   const dumbbellVariants = {
//     initial: { rotate: 0 },
//     animate: {
//       rotate: [0, 15, -15, 0],
//       transition: {
//         duration: 2,
//         repeat: Number.POSITIVE_INFINITY,
//         repeatType: "reverse",
//       },
//     },
//   }

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 lg:hidden"
//             onClick={() => setIsOpen(false)}
//           />

//           {/* Menu content */}
//           <motion.div
//             variants={menuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-gradient-to-b from-black-primary to-black-secondary p-6 shadow-xl z-50 lg:hidden overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close button */}
//             <div className="flex justify-end">
//               <Button
//                 onClick={() => setIsOpen(false)}
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-300 hover:text-yellow-primary hover:bg-white/5"
//               >
//                 <X className="h-6 w-6" />
//                 <span className="sr-only">Close menu</span>
//               </Button>
//             </div>

//             {/* Logo */}
//             <motion.div variants={itemVariants} className="mt-8 mb-12 flex items-center">
//               <motion.div
//                 variants={dumbbellVariants}
//                 initial="initial"
//                 animate="animate"
//                 className="mr-3 text-yellow-primary"
//               >
//                 <Dumbbell className="h-7 w-7" />
//               </motion.div>
//               <Link href="/" className="text-2xl font-bold text-white" onClick={() => setIsOpen(false)}>
//                 <span className="text-yellow-primary">PLANET</span>FITNESS
//               </Link>
//             </motion.div>

//             {/* Navigation */}
//             <nav className="flex flex-col space-y-6">
//               {menuItems.map((item, index) => (
//                 <motion.div key={item.name} variants={itemVariants} className="border-b border-white/10 pb-4">
//                   <Link
//                     href={item.href}
//                     className="text-lg font-medium text-gray-300 hover:text-yellow-primary transition-colors flex items-center justify-between group"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <div className="flex items-center">
//                       <span className="text-yellow-primary mr-3 opacity-60">0{index + 1}</span>
//                       {item.name}
//                     </div>
//                     <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
//                       <ChevronRight className="h-5 w-5 text-yellow-primary/50 group-hover:text-yellow-primary transition-colors" />
//                     </motion.div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </nav>

//             {/* CTA Button */}
//             <motion.div variants={itemVariants} className="mt-12">
//               <Button
//                 className="w-full bg-yellow-primary hover:bg-yellow-secondary text-black-primary py-6 rounded-full border-none relative overflow-hidden group"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <span className="relative z-10 font-medium">Inscríbete Ahora</span>
//                 <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
//               </Button>
//             </motion.div>

//             {/* Animated gym element */}
//             <motion.div variants={itemVariants} className="mt-8 flex justify-center">
//               <motion.div
//                 animate={{
//                   y: [0, -10, 0],
//                   scale: [1, 1.05, 1],
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: Number.POSITIVE_INFINITY,
//                   repeatType: "reverse",
//                 }}
//                 className="text-yellow-primary/20"
//               >
//                 <Dumbbell size={80} />
//               </motion.div>
//             </motion.div>

//             {/* Social Links */}
//             <motion.div variants={socialVariants} className="absolute bottom-10 left-0 right-0 px-6">
//               <div className="flex justify-center space-x-6">
//                 <a
//                   href="#"
//                   className="bg-black-secondary/80 p-3 rounded-full text-gray-400 hover:text-yellow-primary hover:bg-black-secondary transition-colors"
//                   aria-label="Instagram"
//                 >
//                   <Instagram className="h-5 w-5" />
//                 </a>
//                 <a
//                   href="#"
//                   className="bg-black-secondary/80 p-3 rounded-full text-gray-400 hover:text-yellow-primary hover:bg-black-secondary transition-colors"
//                   aria-label="Facebook"
//                 >
//                   <Facebook className="h-5 w-5" />
//                 </a>
//                 <a
//                   href="#"
//                   className="bg-black-secondary/80 p-3 rounded-full text-gray-400 hover:text-yellow-primary hover:bg-black-secondary transition-colors"
//                   aria-label="Twitter"
//                 >
//                   <Twitter className="h-5 w-5" />
//                 </a>
//                 <a
//                   href="#"
//                   className="bg-black-secondary/80 p-3 rounded-full text-gray-400 hover:text-yellow-primary hover:bg-black-secondary transition-colors"
//                   aria-label="YouTube"
//                 >
//                   <Youtube className="h-5 w-5" />
//                 </a>
//               </div>
//             </motion.div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   )
// }
