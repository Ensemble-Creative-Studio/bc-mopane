'use client'
import { useRef } from "react";
import "./globals.css";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { AnimationProvider } from "../components/AnimationContext";
export const metadata = {
  title: "Buffet Crampon - Mopane",
  description: "Buffet Crampon ",
};

export default function RootLayout({ children }) {
  const containerRef = useRef(null);
  return (
    <html>
      <head></head>

      <body className="overflow-hidden">
      <AnimationProvider>
        {/* <LocomotiveScrollProvider
          options={{
            smooth: true,
            // ... all available Locomotive Scroll instance options
          }}
          watch={
            [
              //..all the dependencies you want to watch to update the scroll.
              //  Basicaly, you would want to watch page/location changes
              //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
            ]
          }
          containerRef={containerRef}
        > */}
          <main
            data-scroll-container
            ref={containerRef}
            className="overflow-x-hidden"
          >
            {children}
          </main>
        {/* </LocomotiveScrollProvider> */}
        </AnimationProvider> 
      </body>
    </html>
  );
}
