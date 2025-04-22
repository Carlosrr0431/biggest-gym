"use client";
import Accordion from "../../(components)/Accordion";
import SwipperUser from "../../(components)/SwipperUser";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import pesas from "../../public/pesa.png";
import tasas from "../../public/taza.png";
import Image from "next/image";
import { supabaseClient } from "../../../supabase/client";

const User = () => {
  const { data: session } = useSession();
  const [usuario, setUsuario] = useState();
  const [diasPlan, setDiasPlan] = useState();
  const [cantDias, setCantDias] = useState(0);

  const divRef = useRef();
  const divRef2 = useRef();

  useEffect(() => {
    const getSupabaseOficial = async () => {
      const data = await supabaseClient
        .from("usuarios")
        .select("*")
        .match({ email: session?.user?.email })
        .single();
      setUsuario(data.data);
    };

    if (session?.user?.email) getSupabaseOficial();

    const channelUsuarios = supabaseClient
      .channel("usuarios")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "usuarios" },
        (payload) => {
          if (
            payload.eventType === "UPDATE" &&
            session?.user?.email === payload.new.email
          ) {
            setUsuario(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios));
    };
  }, [session?.user?.email]);

  useEffect(() => {
    if (!usuario) return;

    const planDias = {
      "Plan x2": 8,
      "Plan x3": 12,
      "Plan Libre": 31,
    };

    const totalDias = planDias[usuario.tipoPlan] || 0;
    setCantDias(totalDias);

    const progreso = (usuario.dias / totalDias) * 100;
    divRef.current.style.width = `${progreso}%`;
  }, [usuario]);

  useEffect(() => {
    if (!usuario) return;

    const porcentaje = (usuario.puntos / 2500) * 100;
    divRef2.current.style.width = `${porcentaje}%`;
  }, [usuario?.puntos]);

  return (
    <div className="w-full h-screen overflow-y-scroll bg-slate-900 px-4 py-6">
      {/* Accordion */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl xl:w-[50%] w-[95%] mx-auto shadow-lg">
        <Accordion
          title="Do you prefer Android or iOS"
          answer="I like to use iOS products"
          usuario={usuario}
        />
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-6 mt-12">
        {/* Días cumplidos */}
        <div className="w-full max-w-[350px] bg-black/50 p-5 rounded-xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <Image className="w-14 h-14" src={pesas} alt="pesas" />
            <h2 className="text-white/70 text-lg font-semibold">
              Días cumplidos
            </h2>
          </div>

          <h2 className="text-yellow-500 text-3xl text-center mt-4 font-bold">
            {usuario?.dias}
          </h2>

          <h2
            className={`text-center mt-2 text-sm font-medium ${
              usuario?.dias >= cantDias
                ? "text-red-400"
                : usuario?.tipoPlan
                ? "text-green-400"
                : "text-gray-400"
            }`}
          >
            {usuario?.tipoPlan
              ? usuario?.dias >= cantDias
                ? "Necesitas renovar tu plan"
                : "¡Estás al día!"
              : "No cuentas con un plan..."}
          </h2>

          <div className="mt-6 w-full bg-gray-700 rounded-full h-2.5">
            <div
              ref={divRef}
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
            ></div>
          </div>

          <div className="flex justify-between mt-2 text-gray-400 text-sm font-semibold">
            <span>0</span>
            <span>{cantDias}</span>
          </div>
        </div>

        {/* Puntos */}
        <div className="w-full max-w-[350px] bg-black/50 p-5 rounded-xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <Image className="w-14 h-14" src={tasas} alt="tasas" />
            <h2 className="text-white/70 text-lg font-semibold">
              Puntos obtenidos
            </h2>
          </div>

          <h2 className="text-yellow-500 text-3xl text-center mt-4 font-bold">
            {usuario?.puntos}
          </h2>

          <h2
            className={`text-center mt-2 text-sm font-medium ${
              usuario?.tipoPlan ? "text-green-400" : "text-gray-400"
            }`}
          >
            {usuario?.tipoPlan ? "¡Sigue así!" : "No cuentas con un plan..."}
          </h2>

          <div className="relative mt-6 w-full">
            <div className="bg-gray-300 h-2 rounded-md"></div>
            <div
              ref={divRef2}
              className="bg-green-500 h-2 rounded-md absolute top-0 left-0 transition-all duration-500"
            ></div>
          </div>

          <div className="flex justify-between mt-2 text-gray-400 text-sm font-semibold">
            <span>0pts</span>
            <span>2500pts</span>
          </div>
        </div>
      </div>

      {/* Swiper */}
      <div className="w-full mt-10 mb-20">
        <SwipperUser />
      </div>
    </div>
  );
};

export default User;
