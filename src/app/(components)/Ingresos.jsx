import { supabaseClient } from '../../supabase/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export const Ingresos = () => {
    const [ingresos, setIngresos] = useState();

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("pagos")
                .select("*").order('id', { ascending: true })

            setIngresos(data.data)
        }


        getSupabaseOficial()
    }, [])


    return (
        <div className='w-full h-full container '>

            <div class="p-6 px-0 overflow-scroll h-auto">
                <table class="w-full mt-4 text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Datos del usuario
                                </p>
                            </th>
                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Tipo
                                </p>
                            </th>

                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Fecha de pago
                                </p>
                            </th>
                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Monto
                                </p>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {ingresos && ingresos.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <Image width={0} height={0} src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                                                alt="John Michael" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                                            <div class="flex flex-col">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {user.nombre}
                                                </p>
                                                <p
                                                    class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex flex-col">
                                            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {user.tipoPlan}
                                            </p>

                                        </div>
                                    </td>

                                    <td class="p-4 border-b border-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {user.fechaPago}
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {user.monto}
                                        </p>
                                    </td>



                                </tr>

                            )

                        })}




                    </tbody>
                </table>
            </div>
            {/* {
                    ingresos && ingresos.map((elem, index) => {
                        return (
                            <div key={elem.id} class="bg-white max-w-[400px] shadow overflow-hidden sm:rounded-lg mb-4">
                                <div class="px-4 py-5 sm:px-6">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        Tipo de operación
                                    </h3>
                                    <p class="mt-1 max-w-2xl text-sm font-semibold text-gray-500">
                                        {elem.tipoPlan}
                                    </p>
                                </div>
                                <div class="border-t border-gray-200">
                                    <dl>
                                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">
                                                Nombre
                                            </dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {elem.nombre}
                                            </dd>
                                        </div>
                                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">
                                                Email
                                            </dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {elem.email}
                                            </dd>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">
                                                Fecha
                                            </dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {elem.fechaPago}
                                            </dd>
                                        </div>
                                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">
                                                Monto
                                            </dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {elem.monto}
                                            </dd>
                                        </div>

                                    </dl>
                                </div>
                            </div>
                        )
                    })
                } */}


        </div>
    )
}


