'use client'

import React, { createContext, useState } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <AnimationContext.Provider value={{ isAnimating, setIsAnimating }}>
      {children}
    </AnimationContext.Provider>
  );
};
