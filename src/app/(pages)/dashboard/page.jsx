import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
    return (
        // <div className='bg-slate-900 w-full h-full'>
        //     <div className='items-center flex gap-x-2 justify-center place-content-center my-auto content-center w-full h-full'>
        //         <Link href='/dashboard/administrador'>
        //             <button

        //                 type='button'
        //                 className="bg-white text-lg hover:bg-blue-500 text-black font-semibold hover:text-black py-0.5 px-2 hover:border-transparent"
        //             >Ingresar como Usuario administrador</button></Link>

        // <Link href='/dashboard/user'>

        //     <button

        //         type='button'
        //         className="bg-white text-lg hover:bg-blue-500 text-black font-semibold hover:text-black py-0.5 px-2 hover:border-transparent"
        //     >Ingresar como super usuario</button></Link>
        //     </div>
        // </div>
        <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll  p-6 lg:overflow-visible bg-slate-800  h-full overflow-y-auto">
            <div class="flex  divide-x divide-gray-800 row items-center gap-x-2 justify-center place-content-center my-auto content-center w-full h-full">

                <Link href='/dashboard/administrador'>
                    <button
                        class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6  bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full rounded-r-none border-r-0"
                        type="button">
                        Ingresar como Super Admin
                    </button></Link>

                <Link href='/dashboard/user'>

                    <button
                        class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6  bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full rounded-r-none border-r-0 rounded-l-none"
                        type="button">
                        Ingresar como Usuario Admin
                    </button></Link>


            </div>
        </div>
    )
}

export default Dashboard