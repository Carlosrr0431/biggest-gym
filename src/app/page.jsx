"use client"

import Image from "next/image";
import Degradado from './public/capas.svg'
import Socials from "./(components)/Socials";
import { useEffect, useRef, useState } from "react";
import { Beneficios } from "./(components)/Beneficios";
import { Sponsor } from "./(components)/Sponsor";
import TestimonialSlider from "./(components)/TestimonialSlider";
import Link from "next/link";
import SwiperGym from "./(components)/SwiperGym";
import Logo from './public/logo biggest.svg'
import Video from './public/portadaEscritorio.mp4'
import VideoCelular from './public/portadaCelular.mp4'
import { useAppContext } from "./(context)/AppWrapper";

const Home = () => {

  const [showModal, setShowModal] = useState(false);
  const container = useRef()
  const { setCambioHeader } = useAppContext()
  const [scroll, setScroll] = useState(0)



  const handleScroll = () => {

    setScroll(container.current.scrollTop);
    if (scroll >= 100 && scroll <= 150) {
      setCambioHeader(true)
    } else if (scroll <= 50) {
      setCambioHeader(false)
    }
  }

  return (

    <main main className="h-full  w-full relative overflow-y-auto overflow-x-hidden  " onScroll={handleScroll} ref={container} >

      <section className="w-full h-full  " >
        <div className="w-full h-full   ">
          <div className={` text-center montserrat flex   flex-col justify-center xl:mx-auto w-full items-center  xl:text-center h-full container `}>
            <h1

              className=" h2 text-[32px] xl:text-[45px] xl:w-[1200px] font-medium mx-auto items-center text-center fontMatroska"
            >
              <span className="texto-borde">movernos</span>, movernos SANAMENTE <br />
            </h1>

            <Link href={'/planes'}>
              <button class=" text-black  hover:bg-black/90  font-semibold hover:text-white py-0.5 px-4 bg-fondo1 hover:border-transparent ">
                VER PLANES
              </button></Link>
          </div>
        </div>


        <div className="xl:bg-right xl:bg-no-repeat w-full h-full  translate-z-50  absolute inset-0   -z-20    ">
          <video src={Video} autoPlay muted loop className="hidden sm:object-cover sm:h-[100%] sm:w-[100%] sm:flex" />
          <video src={VideoCelular} autoPlay muted loop className="visible object-cover h-[100%] w-[100%] sm:hidden" />
          <Image src={Degradado}
            width={0}

            height={0}
            alt=""
            className="w-full  h-full absolute z-20 inset-0 object-cover mix-blend-multiply" />
        </div>






      </section>

      <section className="h-[100%] w-[100%] bg-slate-800 ">

        <SwiperGym />
      </section>

      <section className="h-[100%] w-[100%] bg-slate-800 ">

        <Beneficios />
      </section>


      <section className="h-full w-[100%] bg-slate-800 ">

        <h1 className='bg-rgb(178, 190, 181) text-center flex justify-center text-[40px] mx-auto top-20 relative intro2'>Nuestros Testimonios</h1>

      </section>

      <footer class="w-full bg-gray-900 h-[700px] sm:h-[320px]">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div class="py-16 flex justify-between items-center flex-col gap-8 lg:flex-row">
            <div class="flex justify-center ">
              <Image
                src={Logo}
                width={180}
                height={100}
                alt=""
                priority={true}
                // lg:mx-0 lg:start-1 lg:translate-y-14 lg:items-start lg:-translate-x-[80px]
                className={``}
              />
            </div>
            <ul class="text-lg text-center sm:flex items-cente justify-center gap-14 lg:gap-10 xl:gap-14 transition-all duration-500">

              <li class="sm:my-0 my-2" ><a href="#" class="text-white hover:text-gray-400">Planes</a></li>
              <li ><a href="#" class="text-white hover:text-gray-400">Cursos</a></li>
              <li class="sm:my-0 my-2"><a href="#" class="text-white hover:text-gray-400">Ubicacion</a></li>
              <li ><a href="#" class="text-white hover:text-gray-400">Soporte</a></li>
            </ul>
            <div class="flex  space-x-4 sm:justify-center  ">
              <Socials />
            </div>
          </div>

          <div class="py-7 border-t border-gray-700">
            <div class="flex items-center justify-center">
              <span class="text-gray-400 ">©<a href="https://pagedone.io/">Faro IT</a> 2024, Todos los derechos reservados.</span>
            </div>
          </div>
        </div>
      </footer>
    </main >
  );
};

export default Home;