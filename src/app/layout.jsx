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
    // <html lang="en">
    //   <body>{children}</body>
    // </html>
    <html lang="es">
      <body className="montserrat">
        <Providers>
          <Suspense>
            <AppWrapper>
              <main className={``}>
                {children}
              </main>
            </AppWrapper>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
