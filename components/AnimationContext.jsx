'use client'

import React, { createContext, useState } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [language, setLanguage] = useState(0); // 0 for French, 1 for English

  return (
    <AnimationContext.Provider value={{ isAnimating, setIsAnimating, language, setLanguage }}>
      {children}
    </AnimationContext.Provider>
  );
};
