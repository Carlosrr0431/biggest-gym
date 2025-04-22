import { supabaseClient } from "../../supabase/client";
import React, { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { ModalUsuarioAdm } from "./ModalUsuarioAdm";
import Link from "next/link";
import { actualizarNotificacion, registrarIngreso } from "../action";
import { ModalRenovar } from "./ModalRenovar";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "sonner";
import moment from "moment-timezone";
import { TiUserDelete } from "react-icons/ti";
import { useSession } from "next-auth/react";
import { ModalConfirmar } from "./ModalConfirmar";
import Image from "next/image";
import { Usuario } from "./Usuario";

export const Usuarios = () => {
  const [estado, setEstado] = useState("Todos");
  const [usuarios, setUsuarios] = useState();
  const [usuariosFilter, setUsuariosFilter] = useState();
  const [usuario, setUsuario] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [idEvento, setIdEvento] = useState();
  const [tipo, setTipo] = useState();
  const [info, setInfo] = useState({});
  const [hora, setHora] = useState(new Date().getHours());
  const { data: session } = useSession();
  const [autorizado, setAutorizado] = useState(false);
  const [listaEspera, setListaEspera] = useState(0);

  useEffect(() => {
    const tamaño = usuariosFilter?.filter((e) => {
      if (e.ingresoApp === "Solicitar Ingreso") {
        return true;
      }
      return false;
    }).length;

    setListaEspera(tamaño || 0);
  }, [usuariosFilter]);

  useEffect(() => {
    const getSupabaseOficial = async () => {
      const { data } = await supabaseClient
        .from("usuarios")
        .select("*")
        .match({ email: session?.user?.email })
        .single();

      setUsuario(data);
    };

    if (session?.user?.email) {
      getSupabaseOficial();
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (usuario?.role === "admin") {
      setAutorizado(true);
    }
  }, [usuario?.role]);

  useEffect(() => {
    const getSupabaseOficial = async () => {
      const { data } = await supabaseClient
        .from("usuarios")
        .select("*")
        .order("id", { ascending: true });

      setUsuarios(data);
      setUsuariosFilter(data);
    };

    getSupabaseOficial();

    const channelUsuarios = supabaseClient
      .channel("usuarios")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "usuarios" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setUsuariosFilter((antContenido) => [
              payload.new,
              ...(antContenido || []),
            ]);
          } else if (payload.eventType === "UPDATE") {
            setUsuariosFilter((antContenido) =>
              antContenido?.map((elem) => {
                if (elem.id === payload.new.id) {
                  return payload.new;
                }
                return elem;
              })
            );
          } else if (payload.eventType === "DELETE") {
            setUsuariosFilter((antContenido) =>
              antContenido?.filter((elem) => elem.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channelUsuarios);
    };
  }, []);

  const getUsuarios = async () => {
    const { data } = await supabaseClient
      .from("usuarios")
      .select("*")
      .order("id", { ascending: true });

    setUsuarios(data);
  };

  const establecerFecha = (fecha1) => {
    if (fecha1) {
      let fecha2 = moment().tz("America/Argentina/Salta");
      return Math.abs(
        fecha2.diff(fecha1.split("/").reverse().join("/"), "days")
      );
    }
    return 1;
  };

  const inputHandler = (e) => {
    getUsuarios();
    const searchUser = usuarios?.filter((el) => {
      const regexp = /[0-9]/gi;
      const regexp2 = /[a-zA-Z]/gi;
      const matches = e.target.value.match(regexp);
      const matches2 = e.target.value.match(regexp2);

      if (e.target.value === "") {
        return el;
      } else {
        if (matches == null || matches2 != null) {
          return el.nombre.toLowerCase().includes(e.target.value.toLowerCase());
        }
        return String(el.dni).includes(e.target.value);
      }
    });

    setUsuariosFilter(searchUser);
  };

  return (
    <div className="flex flex-col w-full h-full text-gray-100 bg-gray-900 shadow-2xl rounded-xl">
      <div className="bg-gray-800 p-6 rounded-t-xl">
        <div className="flex items-center justify-between gap-6 mx-4 mb-4">
          <h5 className="text-2xl font-bold text-white tracking-tight">
            Lista de Miembros
          </h5>
          <div className="flex gap-3">
            <button
              className="rounded-lg bg-gray-700 text-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 transition duration-200"
              type="button"
              onClick={() => window.location.reload()}
            >
              Refrescar
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setInfo({
                  tipo: "Agregar",
                  nombre: "",
                  email: "",
                  plan: "Elige el Plan",
                });
              }}
              className="flex items-center gap-2 rounded-lg bg-blue-600 text-gray-100 px-4 py-2 text-sm font-medium hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-200"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
              </svg>
              Agregar Miembro
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mx-4">
          <div className="w-full md:w-max">
            <nav>
              <ul className="flex flex-row gap-2 p-1 bg-gray-700 rounded-lg">
                {["Todos", "Activos", "Inactivos"].map((tab) => (
                  <li
                    key={tab}
                    onClick={() => setEstado(tab)}
                    className={`flex-1 text-center py-2 px-4 rounded-md cursor-pointer text-sm font-medium transition duration-200 ${
                      estado === tab
                        ? "bg-blue-600 text-gray-100"
                        : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                    }`}
                  >
                    {tab}
                  </li>
                ))}
                <li
                  onClick={() => setEstado("Lista")}
                  className={`flex items-center gap-2 py-2 px-4 rounded-md cursor-pointer text-sm font-medium transition duration-200 ${
                    estado === "Lista"
                      ? "bg-blue-600 text-gray-100"
                      : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                  }`}
                >
                  Lista de Ingreso
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      listaEspera > 0 ? "bg-blue-500" : "bg-gray-500"
                    }`}
                  >
                    {listaEspera}
                  </span>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-full md:w-80">
            <div className="relative">
              <input
                className="w-full rounded-lg bg-gray-700 text-gray-100 px-4 py-2 text-sm border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 placeholder-gray-400"
                onChange={inputHandler}
                placeholder="Buscar por nombre o DNI"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 px-4 py-6 bg-gray-900">
        <div className="max-h-[1200px] overflow-y-auto">
          <table className="w-full text-left table-auto bg-gray-900">
            <thead>
              <tr className="bg-gray-700 sticky top-0">
                <th className="p-4 border-b border-gray-600">
                  <p className="text-sm font-medium text-gray-200">Miembro</p>
                </th>
                <th className="p-4 border-b border-gray-600">
                  <p className="text-sm font-medium text-gray-200">
                    {estado === "Lista" ? "" : "Plan"}
                  </p>
                </th>
                <th className="p-4 border-b border-gray-600">
                  <p className="text-sm font-medium text-gray-200">
                    {estado === "Lista" ? "" : "Estado"}
                  </p>
                </th>
                <th className="p-4 border-b border-gray-600">
                  <p className="text-sm font-medium text-gray-200">
                    {estado === "Lista" ? "" : "Fecha de Pago"}
                  </p>
                </th>
                <th className="p-4 border-b border-gray-600 w-12"></th>
                <th className="p-4 border-b border-gray-600 w-12"></th>
                <th className="p-4 border-b border-gray-600 w-36"></th>
                <th className="p-4 border-b border-gray-600 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {usuariosFilter && estado === "Activos"
                ? usuariosFilter
                    ?.filter((e) => {
                      if (e.tipoPlan === "Plan x2") {
                        return e.dias < 8;
                      } else if (e.tipoPlan === "Plan x3") {
                        return e.dias < 12;
                      } else if (e.tipoPlan === "Plan Libre") {
                        return e.dias < 16;
                      }
                      return false;
                    })
                    .map((elem, index) => (
                      <Usuario
                        key={index}
                        elem={elem}
                        setShowModal3={setShowModal3}
                        setTipo={setTipo}
                        setIdEvento={setIdEvento}
                        setShowModal2={setShowModal2}
                        setInfo={setInfo}
                        autorizado={autorizado}
                        setShowModal={setShowModal}
                      />
                    ))
                : estado === "Inactivos"
                ? usuariosFilter
                    ?.filter((e) => {
                      if (e.tipoPlan === "Plan x2") {
                        return e.dias >= 8;
                      } else if (e.tipoPlan === "Plan x3") {
                        return e.dias >= 12;
                      } else if (e.tipoPlan === "Plan Libre") {
                        return e.dias >= 16;
                      }
                      return false;
                    })
                    .map((elem, index) => (
                      <Usuario
                        key={index}
                        elem={elem}
                        setShowModal3={setShowModal3}
                        setTipo={setTipo}
                        setIdEvento={setIdEvento}
                        setShowModal2={setShowModal2}
                        setInfo={setInfo}
                        autorizado={autorizado}
                        setShowModal={setShowModal}
                      />
                    ))
                : estado === "Lista"
                ? usuariosFilter
                    ?.filter((e) => e.ingresoApp === "Solicitar Ingreso")
                    .map((elem, index) => (
                      <tr
                        key={index}
                        className="bg-gray-800 hover:bg-gray-700 transition duration-200"
                      >
                        <td className="p-4 border-b border-gray-600">
                          <div className="flex items-center gap-3">
                            <Image
                              width={36}
                              height={36}
                              src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                              alt="John Michael"
                              className="rounded-full object-cover"
                            />
                            <div className="flex flex-col">
                              <p className="text-sm font-medium text-gray-100">
                                {elem.nombre}
                              </p>
                              <p className="text-sm text-gray-400">
                                {elem.dni}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-gray-600 ">
                          <button
                            onClick={async () => {
                              await actualizarNotificacion(
                                "Confirmar Ingreso",
                                elem.id,
                                elem.dias + 1
                              );
                              toast.custom(
                                (t) => (
                                  <div className="bg-gray-800 p-4 rounded-lg text-gray-100 relative shadow-xl border border-gray-700">
                                    <button
                                      className=""
                                      onClick={() => toast.dismiss(t)}
                                    >
                                      <AiOutlineClose className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                                    </button>
                                    <span className="text-green-500">
                                      {elem.nombre}
                                    </span>{" "}
                                    Ya puede ingresar al Gym
                                  </div>
                                ),
                                {
                                  position: "top-center",
                                  duration: 5000,
                                }
                              );
                            }}
                            className="px-4 py-2 bg-green-600 text-gray-100 rounded-lg text-sm font-medium hover:bg-green-500 transition duration-200"
                            type="button"
                          >
                            Permitir Ingreso
                          </button>
                        </td>
                        <td className="p-4 border-b border-gray-600">
                          <button
                            onClick={async () => {
                              await actualizarNotificacion(
                                "Rechazar Ingreso",
                                elem.id,
                                elem.dias + 1
                              );
                              toast.custom(
                                (t) => (
                                  <div className="bg-gray-800 p-4 rounded-lg text-gray-100 relative shadow-xl border border-gray-700">
                                    <button
                                      className=""
                                      onClick={() => toast.dismiss(t)}
                                    >
                                      <AiOutlineClose className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                                    </button>
                                    <span className="text-red-500">
                                      {elem.nombre}
                                    </span>{" "}
                                    Se canceló el ingreso al gym
                                  </div>
                                ),
                                {
                                  position: "top-center",
                                  duration: 5000,
                                }
                              );
                            }}
                            className="px-4 py-2 bg-red-600 text-gray-100 rounded-lg text-sm font-medium hover:bg-red-500 transition duration-200"
                            type="button"
                          >
                            Rechazar Ingreso
                          </button>
                        </td>
                        <td className="p-4 border-b border-gray-600 hidden">
                          <p className="text-sm text-gray-100">23/04/18</p>
                        </td>
                        <td className="p-4 border-b border-gray-600 hidden w-12">
                          <button
                            onClick={() => {
                              setShowModal(true);
                              setInfo({
                                tipo: "Modificar",
                                nombre: String(elem.nombre),
                                email: String(elem.email),
                                id: elem.id,
                                dni: elem.dni,
                                telefono: elem.telefono,
                                edad: elem.edad,
                                plan: String(elem.tipoPlan),
                                dias: elem.dias,
                              });
                            }}
                            className="p-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 transition duration-200"
                            type="button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                            </svg>
                          </button>
                        </td>
                        <td className="p-4 border-b border-gray-600 hidden w-12">
                          <Link
                            rel="noopener noreferrer"
                            target="_blank"
                            href={`https://wa.me/+54${elem.telefono}`}
                            className="p-2 bg-green-600 text-gray-100 rounded-lg hover:bg-green-500 transition duration-200"
                          >
                            <IoLogoWhatsapp className="w-5 h-5" />
                          </Link>
                        </td>
                        <td className="p-4 border-b border-gray-600 hidden w-36">
                          {elem.tipoPlan === "Plan x2" &&
                          elem.dias < 8 &&
                          establecerFecha(elem.fechaIngreso) >= 1 ? (
                            <button
                              onClick={async () => {
                                await registrarIngreso(elem.dias + 1, elem.id);
                                toast.custom(
                                  (t) => (
                                    <div className="bg-gray-800 p-4 rounded-lg text-gray-100 relative shadow-xl border border-gray-700">
                                      <button
                                        className=""
                                        onClick={() => toast.dismiss(t)}
                                      >
                                        <AiOutlineClose className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                                      </button>
                                      <span className="text-green-500">
                                        {elem.nombre}
                                      </span>{" "}
                                      Ya puede ingresar al Gym
                                    </div>
                                  ),
                                  {
                                    position: "top-center",
                                    duration: 5000,
                                  }
                                );
                              }}
                              className="px-4 py-2 bg-blue-600 text-gray-100 rounded-lg text-sm font-medium hover:bg-blue-500 transition duration-200"
                              type="button"
                            >
                              Registrar Ingreso
                            </button>
                          ) : elem.tipoPlan === "Plan x2" &&
                            elem.dias < 8 &&
                            establecerFecha(elem.fechaIngreso) === 0 ? (
                            <button
                              onClick={() =>
                                toast.custom(
                                  (t) => (
                                    <div className="bg-gray-800 p-4 rounded-lg text-gray-100 relative shadow-xl border border-gray-700">
                                      <button
                                        className=""
                                        onClick={() => toast.dismiss(t)}
                                      >
                                        <AiOutlineClose className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                                      </button>
                                      <span className="text-green-500">
                                        {elem.nombre}
                                      </span>{" "}
                                      Ya ingresó al GYM
                                    </div>
                                  ),
                                  {
                                    position: "top-center",
                                    duration: 5000,
                                  }
                                )
                              }
                              className="px-4 py-2 bg-green-600 text-gray-100 rounded-lg text-sm font-medium flex items-center gap-2"
                              type="button"
                            >
                              Ya ingresó
                              <span className="text-gray-200">
                                {elem.horaIngreso}
                              </span>
                            </button>
                          ) : elem.dias >= 8 && elem.tipoPlan === "Plan x2" ? (
                            <button
                              onClick={() => {
                                setShowModal2(true);
                                setInfo({
                                  nombre: String(elem.nombre),
                                  id: elem.id,
                                  dni: elem.dni,
                                  plan: String(elem.tipoPlan),
                                });
                              }}
                              className="px-4 py-2 bg-yellow-600 text-gray-100 rounded-lg text-sm font-medium hover:bg-yellow-500 transition duration-200"
                              type="button"
                            >
                              Renovar Plan
                            </button>
                          ) : null}

                          {elem.tipoPlan === "Plan x3" &&
                          elem.dias < 12 &&
                          establecerFecha(elem.fechaIngreso) >= 1 ? (
                            <button
                              onClick={async () => {
                                await registrarIngreso(elem.dias + 1, elem.id);
                                toast.custom(
                                  (t) => (
                                    <div className="bg-gray-800 p-4 rounded-lg text-gray-100 relative shadow-xl border border-gray-700">
                                      <button
                                        className=""
                                        onClick={() => toast.dismiss(t)}
                                      >
                                        <AiOutlineClose className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                                      </button>
                                      <span className="text-green-500">
                                        {elem.nombre}
                                      </span>{" "}
                                      Ya puede ingresar al Gym
                                    </div>
                                  ),
                                  {
                                    position: "top-center",
                                    duration: 5000,
                                  }
                                );
                              }}
                              className="px-4 py-2 bg-blue-600 text-gray-100 rounded-lg text-sm font-medium hover:bg-blue-500 transition duration-200"
                              type="button"
                            >
                              Registrar Ingreso
                            </button>
                          ) : establecerFecha(elem.fechaIngreso) === 0 &&
                            elem.tipoPlan === "Plan x3" &&
                            elem.dias < 12 ? (
                            <button
                              onClick={() =>
                                toast.custom(
                                  (t) => (
                                    <div className="bg-gray-800 p-4 rounded-lg text-gray-100 relative shadow-xl border border-gray-700">
                                      <button
                                        className=""
                                        onClick={() => toast.dismiss(t)}
                                      >
                                        <AiOutlineClose className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                                      </button>
                                      <span className="text-green-500">
                                        {elem.nombre}
                                      </span>{" "}
                                      Ya ingresó al GYM
                                    </div>
                                  ),
                                  {
                                    position: "top-center",
                                    duration: 5000,
                                  }
                                )
                              }
                              className="px-4 py-2 bg-green-600 text-gray-100 rounded-lg text-sm font-medium flex items-center gap-2"
                              type="button"
                            >
                              Ya ingresó
                              <span className="text-gray-200">
                                {elem.horaIngreso}
                              </span>
                            </button>
                          ) : elem.dias >= 12 && elem.tipoPlan === "Plan x3" ? (
                            <button
                              onClick={() => {
                                setShowModal2(true);
                                setInfo({
                                  nombre: String(elem.nombre),
                                  id: elem.id,
                                  dni: elem.dni,
                                  plan: String(elem.tipoPlan),
                                });
                              }}
                              className="px-4 py-2 bg-yellow-600 text-gray-100 rounded-lg text-sm font-medium hover:bg-yellow-500 transition duration-200"
                              type="button"
                            >
                              Renovar Plan
                            </button>
                          ) : null}

                          {elem.tipoPlan === "Super Intenso" &&
                          elem.dias < 16 &&
                          establecerFecha(elem.fechaIngreso) >= 1 ? (
                            <button
                              onClick={async () => {
                                await registrarIngreso(elem.dias + 1, elem.id);
                                toast.custom(
                                  (t) => (
                                    <div className="bg-gray-800 p-4 rounded-lg text-gray-100 relative shadow-xl border border-gray-700">
                                      <button
                                        className=""
                                        onClick={() => toast.dismiss(t)}
                                      >
                                        <AiOutlineClose className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                                      </button>
                                      <span className="text-green-500">
                                        {elem.nombre}
                                      </span>{" "}
                                      Ya puede ingresar al Gym
                                    </div>
                                  ),
                                  {
                                    position: "top-center",
                                    duration: 5000,
                                  }
                                );
                              }}
                              className="px-4 py-2 bg-blue-600 text-gray-100 rounded-lg text-sm font-medium hover:bg-blue-500 transition duration-200"
                              type="button"
                            >
                              Registrar Ingreso
                            </button>
                          ) : establecerFecha(elem.fechaIngreso) === 0 &&
                            elem.tipoPlan === "Super Intenso" &&
                            elem.dias < 16 ? (
                            <button
                              onClick={() =>
                                toast.custom(
                                  (t) => (
                                    <div className="bg-gray-800 p-4 rounded-lg text-gray-100 relative shadow-xl border border-gray-700">
                                      <button
                                        className=""
                                        onClick={() => toast.dismiss(t)}
                                      >
                                        <AiOutlineClose className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                                      </button>
                                      <span className="text-green-500">
                                        {elem.nombre}
                                      </span>{" "}
                                      Ya ingresó al GYM
                                    </div>
                                  ),
                                  {
                                    position: "top-center",
                                    duration: 5000,
                                  }
                                )
                              }
                              className="px-4 py-2 bg-green-600 text-gray-100 rounded-lg text-sm font-medium flex items-center gap-2"
                              type="button"
                            >
                              Ya ingresó
                              <span className="text-gray-200">
                                {elem.horaIngreso}
                              </span>
                            </button>
                          ) : elem.dias >= 16 &&
                            elem.tipoPlan === "Super Intenso" ? (
                            <button
                              onClick={() => {
                                setShowModal2(true);
                                setInfo({
                                  nombre: String(elem.nombre),
                                  id: elem.id,
                                  dni: elem.dni,
                                  plan: String(elem.tipoPlan),
                                });
                              }}
                              className="px-4 py-2 bg-yellow-600 text-gray-100 rounded-lg text-sm font-medium hover:bg-yellow-500 transition duration-200"
                              type="button"
                            >
                              Renovar Plan
                            </button>
                          ) : null}
                        </td>
                        <td className="p-4 border-b border-gray-600 hidden w-12"></td>
                      </tr>
                    ))
                : usuariosFilter?.map((elem, index) => (
                    <Usuario
                      key={index}
                      elem={elem}
                      setShowModal3={setShowModal3}
                      setTipo={setTipo}
                      setIdEvento={setIdEvento}
                      setShowModal2={setShowModal2}
                      setInfo={setInfo}
                      autorizado={autorizado}
                      setShowModal={setShowModal}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && <ModalUsuarioAdm info={info} setShowModal={setShowModal} />}
      {showModal2 && <ModalRenovar info={info} setShowModal2={setShowModal2} />}
      {showModal3 && (
        <ModalConfirmar
          tipo={tipo}
          setShowModal3={setShowModal3}
          idEvento={idEvento}
        />
      )}
    </div>
  );
};
