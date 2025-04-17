import "./globals.css";
import Nav from "./(components)/Nav";
import Header from "./(components)/Header";
import { AppWrapper } from "./(context)/AppWrapper";
import Providers from "./(providers)/Providers";
import { Toaster } from "sonner";
import WhatsApp from "./(components)/WhatsApp";
import { Suspense } from "react";

export const metadata = {
  title: "Biggest GYM",
  description: "Gimnasio enfocado en aumentar tu potencial",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
    // <html lang="es">
    //   <body className="montserrat overflow-y-hidden">
    //     <Providers>
    //       <Suspense>
    //         <AppWrapper>
    //           <Nav />
    //           <Header />

    //           <main
    //             className={`page  text-white bg-cover bg-no-repeat font-sora overflow-y-scroll w-full h-full overflow-x-hidden `}
    //           >

    //             {children}
    //             <Toaster position="bottom-center" richColors />

    //             <div className="fixed xl:right-0 xl:bottom-0 xl:z-50 md:mb-8 md:mr-6">

    //               <WhatsApp />

    //             </div>

    //           </main>
    //         </AppWrapper>
    //       </Suspense>
    //     </Providers>
    //   </body>
    // </html>
  );
}
