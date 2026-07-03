"use client";

import { useState, useCallback } from "react";
import "./globals.css";
import Header from "./components/Header";
import { LenisProvider } from "./components/LenisProvider";
import { CursorProvider } from "./components/CursorProvider";
import CursorTrail from "./components/ui/CursorTrail";
import Loader from "./components/Loader";
import { LoadingStateProvider } from "./components/LoadingContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [revealing, setRevealing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleRevealStart = useCallback(() => {
    setRevealing(true);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setRevealing(true);
    setLoaded(true);
  }, []);

  return (
    <html
      lang="en"
      className={`h-full antialiased overflow-x-hidden ${
        loaded ? "" : "overflow-hidden"
      }`}
    >
      <body
        className={`min-h-full flex flex-col bg-[#0a0a0a] overflow-x-hidden ${
          loaded ? "" : "overflow-hidden"
        }`}
      >
        <CursorProvider>
          <LenisProvider>
            {/* Loader overlay */}
            <Loader
              onRevealStart={handleRevealStart}
              onComplete={handleLoadComplete}
            />

            {/* Page content — hidden until loaded */}
            <LoadingStateProvider loaded={loaded} revealing={revealing}>
              <Header loaded={loaded} />
              <CursorTrail />
              {children}
            </LoadingStateProvider>
          </LenisProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
