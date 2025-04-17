// "use client"
// import Link from "next/link";
// import { useParams, usePathname } from "next/navigation";



// import Home from "../public/inicio icono.svg";
// import Cursos from "../public/cursos online.svg";
// import Planes from "../public/planes presenciales icono.svg";
// import Conocenos from "../public/conocenos icono.svg";
// import Eventos from "../public/eventos.svg";
// import Tienda from "../public/tienda.svg";
// import Ubicacion from "../public/ubicacion.svg";

// import Image from "next/image";

// // nav data
// export const navData = [
//   { name: "Inicio", path: "/", icon: Home },
//   { name: "Conocenos", path: "/about", icon: Conocenos },
//   { name: "Planes", path: "/planes", icon: Planes },
//   { name: "Cursos", path: "/cursos", icon: Cursos },

//   // { name: "Mi Semilla", path: "/semilla", icon: Semilla },
//   // { name: "Radio", path: "/radio", icon: Radio },
//   // { name: "La Iglesia", path: "/iglesia", icon: Iglesia },
//   // {
//   //   name: "eventos",
//   //   path: "/eventos",
//   //   icon: Eventos,
//   // },
//   // {
//   //   name: "Tienda",
//   //   path: "/tienda",
//   //   icon: Tienda,
//   // },

//   {
//     name: "ubicacion",
//     path: "/ubicacion",
//     icon: Ubicacion,
//   },
// ];

// const Nav = () => {
//   const pathname = usePathname();


//   return (
//     <nav className={`${pathname == '/dashboard' || pathname == '/login' || pathname == '/dashboard/administrador' || pathname == '/dashboard/user' ? 'hidden' : 'flex'} montserrat  flex-col  items-center xl:justify-center gap-y-4  fixed h-max bottom-0 mt-auto xl:right-[2%]  z-50 w-full top-0 xl:w-12 xl:max-w-md xl:h-[60%] xl:bottom-[150px]`}>
//       <div

//         className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-5 px-4 md:px-40 xl:px-0 h-[80px] backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full xl:h-max py-4 bg-yellow-400 opacity-80 bg-blend-multiply"
//       >
//         {navData.map((link, index) => {
//           return (
//             <Link
//               className={`${link.path === pathname && "text-accent"
//                 } relative items-center flex group hover:text-accent transition-all duration-300`}
//               key={index}
//               href={link.path}
//             >
//               <div className="absolute pr-10 right-0 hidden xl:group-hover:flex">
//                 <div className=" relative flex bg-black/30  p-2 text-white items-center  rounded-[15px] ">
//                   <div className="text-[13px] text-end  font-regular w-auto text-nowrap leading-none   uppercase">
//                     {link.name}
//                   </div>
//                 </div>
//               </div>

//               <div className="" >
//                 <Image src={link.icon} width={0} height={0} alt="" className={`${link.name == 'Mi Semilla' ? '-mb-2' : ''} max-w-[25px] max-h-[25px] transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]`} />
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </nav>
//   );
// };

// export default Nav;
