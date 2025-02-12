"use client"

import React, { useEffect, useState } from 'react'
import { UsuariosAdm } from './UsuariosAdm'
import { PreciosPlanes } from './PreciosPlanes'
import { Ingresos } from './Ingresos'
import ControlIngresos from './ControlIngresos'



const DashBoardInfo = ({ tipo }) => {

    const [contenido, setContenido] = useState()

    useEffect(() => {


    }, [contenido])

    return (
        <div className='h-full w-full'>


            {/* <div><Usuarios /></div> */}





            {
                tipo == "Control de Precios" && (
                    <PreciosPlanes />
                )

            }


            {
                tipo == "Ingresos" && (
                    <Ingresos />
                )

            }

            {
                tipo == "Control De Ingresos" && (
                    <ControlIngresos />
                )

            }



            {
                tipo == "Configurar" && (
                    <UsuariosAdm />
                )

            }

            {/* <CargarImagen />


            {contenido && tipo == 'Panel Contenido' && contenido.map((elem, index) => {
                return (
                    <div

                        key={index} className="relative  flex  flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mt-4">
                        <div className="relative m-0 w-2/5 shrink-0 overflow-hidden  rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                            <Image
                                src={elem.imagenUrl}
                                alt="image"
                                className="h-full w-full object-cover"
                                width={800}
                                height={800}
                            />
                        </div>
                        <div className="p-6">
                            <h6 claclassNamess="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                                {elem.titulo}
                            </h6>


                            <h3 className="block font-sans  font-normal leading-relaxed text-gray-700 antialiased text-md mt-14">
                                <span className=' font-bold'>Fecha</span>: {elem.fecha.slice(2, 10).split('-').reverse().join('/')}
                            </h3>

                            <a class="flex mt-14" href="#">
                                <button
                                    class="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-slate-800 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    onClick={() => {
                                        setShowModal(true)
                                        setIdEvento(elem._id)
                                    }}
                                >
                                    Modificar

                                </button>
                                <button
                                    class="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-slate-800 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                >
                                    Eliminar

                                </button>

                            </a>

                        </div>
                        {
                            showModal && <ModalEvento idEvento={idEvento} showModal={showModal} setShowModal={() => setShowModal(false)} />
                        }
                    </div>



                )
            }


            )
            } */}

        </div>
    )
}

export default DashBoardInfo
