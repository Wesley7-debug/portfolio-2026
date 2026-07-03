"use client";

import React, { createContext, useContext, type ReactNode } from "react";

interface LoadingContextValue {
  loaded: boolean;
  revealing: boolean;
}

const LoadingContext = createContext<LoadingContextValue>({
  loaded: false,
  revealing: false,
});

export function LoadingStateProvider({
  loaded,
  revealing,
  children,
}: {
  loaded: boolean;
  revealing: boolean;
  children: ReactNode;
}) {
  return (
    <LoadingContext.Provider value={{ loaded, revealing }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingState() {
  return useContext(LoadingContext);
}
