import "./globals.css";


import AOS from 'aos';
import 'aos/dist/aos.css';

import Link from "next/link";
import Nav from "./(components)/Nav";
import Header from "./(components)/Header";
import { AppWrapper } from "./(context)/AppWrapper";
import Image from "next/image";
import Whatsapp from "./public/boton de whatsapp.svg";
import Providers from "./(providers)/Providers";
import { Toaster } from "sonner";
import WhatsApp from "./(components)/WhatsApp";
import Biblia from "./(components)/Biblia";
import BibliaNVI from "./(components)/BibliaNVI";


export const metadata = {
  title: "Iglesia CRS",
  description: "Iglesia Cristiana del Dios VIVO",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <body className="montserrat overflow-y-hidden">
        <Providers>
          <AppWrapper>
            <Nav />
            <Header />

            <main
              className={`page  text-white bg-cover bg-no-repeat font-sora overflow-y-hidden overflow-x-hidden `}
            >


              {children}
              <Toaster position="bottom-center" richColors />

              <div className="fixed xl:right-0 xl:bottom-0 xl:z-50 md:mb-8 md:mr-6">


                <WhatsApp />


              </div>


            </main>
          </AppWrapper>
        </Providers>
      </body>
    </html>
  );
}