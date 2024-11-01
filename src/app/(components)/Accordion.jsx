import { supabaseClient } from "@/supabase/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { PiCaretDoubleDownLight } from "react-icons/pi";
import { PiCaretDoubleUpLight } from "react-icons/pi";
import { TbLogout2, TbPointFilled } from "react-icons/tb";
import { BiSolidUserDetail } from "react-icons/bi";
import { ModalUser } from "./ModalUser";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaCircleCheck } from "react-icons/fa6";
import ModalPlan from "./ModalPlan";
import { actualizarNotificacion } from "../action";
import moment from "moment";
import Image from "next/image";


const Accordion = ({ usuario }) => {
  const { data: session } = useSession()
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [diasPlan, setDiasPlan] = useState(0)
  const [emailUser, setEmailUser] = useState(session?.user?.email)
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [listaPrecios, setListaPrecios] = useState();
  const [info, setInfo] = useState({})




  const router = useRouter()

  const handleSubmit = async (plan, monto) => {

    await createPreferenc(plan, monto)
  }



  const establecerFecha = (fecha1) => {

    if (fecha1 != null) {

      var fecha2 = moment(new Date().toLocaleDateString().split('/').reverse().join('/'));

      // alert(Math.abs(fecha2.diff(fecha1.split('/').reverse().join('/'), 'days')))
      return Math.abs(fecha2.diff(fecha1.split('/').reverse().join('/'), 'days'))
    } else
      // alert(1)
      return 1
  }


  const createPreferenc = async (plan, monto) => {
    try {

      const response = await axios.post(
        "/api/create_preference",

        {
          title: plan,
          quantity: 1,
          price: 10,
          name: usuario?.nombre,
          description: usuario?.email
          // price: monto,
        },

      );

      const { result } = response.data
      // router.replace(result.sandbox_init_point)
      router.replace(result.init_point)

    } catch (error) {
      console.log("El error es: " + error);
    }
  };

  useEffect(() => {
    const getSupabaseOficial = async () => {
      let data = await supabaseClient
        .from("planes")
        .select("*").order('id', { ascending: true })

      setListaPrecios(data.data)
    }


    getSupabaseOficial()


  }, [])


  const renovarHandle = () => {
    if (usuario?.tipoPlan == "Plan x2") {
      if (usuario?.dias >= 8)
        return true
      else return false
    } else if (usuario?.tipoPlan == "Plan x3") {
      if (usuario?.dias >= 12)
        return true
      else return false
    } else if (usuario?.tipoPlan == "Plan Libre") {
      if (usuario?.dias >= 31)
        return true
      else return false



    }
  }


  useEffect(() => {

    if (usuario?.tipoPlan == "Plan x2") {
      setDiasPlan(8)
    } else if (usuario?.tipoPlan == "Semi Intenso") {
      setDiasPlan(12)
    } else if (usuario?.tipoPlan == "Plan Libre") {
      setDiasPlan(16)
    }

  }, [usuario?.tipoPlan])

  useEffect(() => {

    const fechaResult = establecerFecha(usuario?.fechaIngreso)

    const actualizarEstado = async () => {
      const result2 = await supabaseClient
        .from("usuarios")
        .update({
          ingresoApp: "Sin solicitar",
        })
        .eq("id", usuario?.id);
    }

    if (fechaResult >= 1) {
      actualizarEstado()
    }



    console.log(fechaResult);

  }, [usuario?.fechaIngreso, usuario?.id])


  return (
    <div className="py-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full  text-black "
      >
        <div class="flex items-center gap-3 text-white">
          <Image width={0} height={0} src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
            alt="John Michael" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
          <div class="flex flex-col">
            <p class="block font-sans text-sm antialiased font-normal text-start leading-normal text-white">
              {usuario?.nombre}
            </p>
            {/* <p
              class="block font-sans text-[12px] antialiased font-normal text-start leading-normal text-white opacity-70 text-wrap break-words w-[120px]">
              {session?.user?.email}
            </p> */}



          </div>


        </div>

        <div className="flex">
          <div class="w-max -mt-1">



            {usuario?.dias >= diasPlan && usuario?.tipoPlan !== null ? (<div
              class="relative justify-center flex items-center px-2 mt-[10px] font-sans  text-[15px] font-semibold   rounded-md select-none whitespace-nowrap  text-[#FF0000]">
              <span class="items-center">Inactivo  </span><TbPointFilled className="mt-1 w-4 h-4 items-center text-[#FF0000]" color="#FF0000" />

            </div>) : usuario?.tipoPlan !== null && usuario?.dias < diasPlan ? (
              <div
                class="relative grid items-center px-2  font-sans text-[15px] font-semibold text-green-800  rounded-md select-none whitespace-nowrap ">
                <span className="flex gap-x-1 justify-center items-center ">Activo  <FaCircleCheck className="w-4 h-4 text-green-800" /></span>
                <span className="flex gap-x-1 justify-center text-gray-800 items-center ">Plan {usuario?.tipoPlan}  </span>

              </div>
            ) : (
              <div
                class="relative grid items-center px-2  font-sans text-[15px] font-semibold text-gray-800  rounded-md select-none whitespace-nowrap mt-[10px] ">
                <span className="flex gap-x-1 justify-center items-center ">Sin Plan  <FaCircleCheck className="w-4 h-4 text-gray-800" /></span>


              </div>
            )

            }
          </div>

        </div>
        {accordionOpen ? <PiCaretDoubleUpLight className="transform origin-center transition-all duration-400 ease-out w-7 h-7" color="#ffff" /> : <PiCaretDoubleDownLight className="transform origin-center transition-all duration-400 ease-out w-7 h-7" color="#ffff" />}
      </button>
      <div
        className={`grid mt-4 overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden flex flex-col sm:flex sm:flex-row md:justify-between items-start w-[100%] justify-center gap-y-4">

          <div className="items-center md:ml-12 ml-0">
            {/* <p class="block font-sans text-[15px] antialiased  text-start leading-normal text-gray-900 font-semibold">
              Vencimiento:<span className="text-gray-800 font-normal"> {usuario?.fechaVencimiento.split('-').reverse().join('/')}</span>
            </p> */}
            <p class="block font-sans text-[15px] antialiased  text-start leading-normal text-gray-900 font-semibold">
              Inicio:<span className="text-gray-800 font-normal"> {usuario?.created_at?.toString().slice(0, 10).split('-').reverse().join('/')}</span>
            </p>



            <button onClick={() => {
              setShowModal(true),
                setInfo({
                  tipo: "Modificar",
                  nombre: String(usuario?.nombre),
                  email: String(usuario?.email),
                  role: String(usuario?.role),
                  plan: String(usuario?.tipoPlan),
                  inicio: String(usuario?.created_at.toString().slice(0, 10).split('-').reverse().join('/')),
                  id: usuario?.id,
                  edad: usuario?.edad,
                  telefono: usuario?.telefono,
                  dni: usuario?.dni
                })
            }} className="flex text-black justify-center items-center gap-x-2 w-[150px] mt-4 border-[1px] border-white p-2 rounded-md"> <BiSolidUserDetail className="h-5 w-5" color="#000000" /> Mis datos </button>


          </div>




          {
            <div>
              {usuario?.tipoPlan !== null ?
                <button onClick={() => {
                  return setShowModal2(true)

                }} className={`text-white bg-emerald-800  font-semibold p-2 mt-1 z-50 hover:bg-white hover:text-black ${renovarHandle() ? 'block' : 'hidden'}  rounded-md`}>  Renovar Plan </button>

                // <Link

                //   rel="noopener noreferrer"
                //   target="_blank"
                //   href="https://wa.me/+543876364202?text=Necesito renovar mi plan..."
                //   className={`text-white bg-emerald-800  font-semibold p-2 mt-1 z-50 hover:bg-white hover:text-black ${renovarHandle() ? 'block' : 'hidden'}  rounded-md`}
                // >
                //   Renovar Plan
                // </Link>
                : <button onClick={() => {
                  return setShowModal2(true)

                }} className={`text-white bg-emerald-800  font-semibold p-2 mt-1 z-50 hover:bg-white hover:text-black  rounded-md`}>  Adquirir Plan </button>}
            </div>


          }

          <div class="w-max  -mt-1 px-4">

            {/* usuario?.ingresoApp ==  "Sin solicitar" */}
            {/* usuario?.ingresoApp == "Solicitar ingreso" */}

            {usuario?.dias < diasPlan && usuario?.tipoPlan !== null && usuario?.ingresoApp == "Sin solicitar" && establecerFecha(usuario?.fechaIngreso) >= 1 ? (<button onClick={() => actualizarNotificacion("Solicitar ingreso", usuario?.id)} type="button" className="button  flex md:justify-center md:items-center md:w-[250px] md:mt-4 w-[150px] relative left-[60px] md:left-0 ">Solicitar Ingreso</button>) :
              usuario?.dias < diasPlan && usuario?.tipoPlan !== null && usuario?.ingresoApp == "Solicitar Ingreso" ? (<button type="button" className="button relative flex md:justify-center md:items-center md:w-[250px] md:mt-4 w-[150px]  left-[60px] md:left-0 ">Esperando solicitud...</button>) : usuario?.dias < diasPlan && usuario?.tipoPlan !== null && usuario?.ingresoApp == "Ingreso permitido" ? (<div class="btn-conteiner flex md:justify-center md:items-center md:w-[500px] md:mt-4 w-[150px] relative left-[60px] md:left-0  ">
                <a class="btn-content" href="#">
                  <span class="btn-title text-center text-[14px] items-center">Ingresá al GYM</span>
                  <span class="icon-arrow">
                    <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path id="arrow-icon-one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                        <path id="arrow-icon-two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                        <path id="arrow-icon-three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                      </g>
                    </svg>
                  </span>
                </a>
              </div>
              ) : null
            }
          </div>

          <div role="button"
            onClick={async () => {
              await signOut({
                callbackUrl: "/",
              })
            }}
            className={`flex  text-lg w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 text-white focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 mt-[220px] mx-auto ml-8 font-semibold ${panel == 'Contenido' ? 'mt-[390px]' : ''}`}>
            <div className="grid mr-2 place-items-center ">
              <TbLogout2 className="w-5 h-5" />
            </div>
            Salir
          </div>


        </div>


      </div>

      {
        showModal && <ModalUser info={info} setShowModal={setShowModal} />
      }

      {
        showModal2 && <ModalPlan setShowModal2={setShowModal2} />
      }
    </div>
  );
};

export default Accordion;