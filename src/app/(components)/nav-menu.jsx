// "use client"

// import * as React from "react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { Menu } from "lucide-react"
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu"
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// export function NavMenu() {
//   const [isOpen, setIsOpen] = React.useState(false)

//   return (
//     <motion.header
//       className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm"
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="container flex items-center justify-between h-16 px-4">
//         <Link href="/" className="flex items-center space-x-2">
//           <motion.img src="/logo.svg" alt="Fitness Logo" className="h-8 w-8" whileHover={{ scale: 1.1 }} />
//           <span className="font-bold text-xl">Planet Fitness</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center space-x-4">
//           <NavigationMenu>
//             <NavigationMenuList>
//               <NavigationMenuItem>
//                 <NavigationMenuTrigger>Membresias</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                   <div className="p-4 w-[200px]">
//                     <ul className="space-y-2">
//                       <li>
//                         <NavigationMenuLink asChild>
//                           <Link href="/basic" className="block p-2 hover:bg-accent rounded-md">
//                             Basic
//                           </Link>
//                         </NavigationMenuLink>
//                       </li>
//                       <li>
//                         <NavigationMenuLink asChild>
//                           <Link href="/premium" className="block p-2 hover:bg-accent rounded-md">
//                             Premium
//                           </Link>
//                         </NavigationMenuLink>
//                       </li>
//                     </ul>
//                   </div>
//                 </NavigationMenuContent>
//               </NavigationMenuItem>
//               <NavigationMenuItem>
//                 <Link href="/why" legacyBehavior passHref>
//                   <NavigationMenuLink className="px-3 py-2">Por qué PF</NavigationMenuLink>
//                 </Link>
//               </NavigationMenuItem>
//               <NavigationMenuItem>
//                 <Link href="/training" legacyBehavior passHref>
//                   <NavigationMenuLink className="px-3 py-2">Entrena con Nosotros</NavigationMenuLink>
//                 </Link>
//               </NavigationMenuItem>
//               <NavigationMenuItem>
//                 <Link href="/store" legacyBehavior passHref>
//                   <NavigationMenuLink className="px-3 py-2">Tienda PF</NavigationMenuLink>
//                 </Link>
//               </NavigationMenuItem>
//             </NavigationMenuList>
//           </NavigationMenu>
//           <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
//             Inscríbete
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         <Sheet>
//           <SheetTrigger asChild className="md:hidden">
//             <Button variant="ghost" size="icon">
//               <Menu className="h-6 w-6" />
//             </Button>
//           </SheetTrigger>
//           <SheetContent>
//             <nav className="flex flex-col space-y-4">
//               <Link href="/membresias" className="text-lg">
//                 Membresias
//               </Link>
//               <Link href="/why" className="text-lg">
//                 Por qué PF
//               </Link>
//               <Link href="/training" className="text-lg">
//                 Entrena con Nosotros
//               </Link>
//               <Link href="/store" className="text-lg">
//                 Tienda PF
//               </Link>
//               <Button className="w-full bg-purple-600 hover:bg-purple-700">Inscríbete</Button>
//             </nav>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </motion.header>
//   )
// }
