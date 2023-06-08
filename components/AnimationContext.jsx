'use client'

import React, { createContext, useState } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [language, setLanguage] = useState('fr'); // 0 for French, 1 for English
  const [sound, setSound] = useState(0) // 0 for mute 1 for sound

  return (
    <AnimationContext.Provider value={{ isAnimating, setIsAnimating, language, setLanguage,sound, setSound }}>
      {children}
    </AnimationContext.Provider>
  );
};
