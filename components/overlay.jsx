"use client";

import { useState, useContext } from "react";

import { getHeader } from "../sanity/sanity-util";
import Image from "next/image";
import { useRef } from "react";
import logo from "../public/logo.svg";
import { AnimationContext } from "./AnimationContext";
import icon from "../public/icon.svg";
import v from "../public/v.svg";
import v2 from "../public/v-2.svg";
export default function Overlay({ overlayData }) {
  const overlayRef = useRef(null);
  const enterUpRef = useRef(null);
  const enterDownRef = useRef(null);
  const { setIsAnimating } = useContext(AnimationContext);
  const [showOverlay, setShowOverlay] = useState(false);
  const { language, setLanguage } = useContext(AnimationContext);

  const { sound, setSound } = useContext(AnimationContext);

  const overlayDataObj = {};
  for (let i = 0; i < overlayData.length; i++) {
    const entry = overlayData[i];
    overlayDataObj[entry.__i18n_lang] = entry;
  }
  const handleAudioButtonClick = (soundIndex, event) => {

    setIsAnimating(true);
    overlayRef.current.classList.add("removeOpacity");
    enterUpRef.current.classList.add("fade-out-up");
    enterDownRef.current.classList.add("fade-out-down");
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("main").style.overflowX = "hidden";
    setSound(soundIndex);
console.log(soundIndex)
};

  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
    setShowOverlay(false);
  };

  return (
    <div
      ref={overlayRef}
      className="h-screen fixed top-0 left-0 w-screen flex items-center z-20 bg-soft-black overflow-hidden md:z-50 md:justify-center opacity-100"
    >
      <div className="flex flex-col justify-center">
        <div
          ref={enterUpRef}
          className="logo overlayLogo flex justify-center opacity-0 enter-upAnim"
        >
          <Image
            className=""
            priority
            height={130}
            width={130}
            src={logo}
            alt="Logo Buffet Crampon"
          />
        </div>
        <div ref={enterDownRef} className="enter opacity-0 enter-downAnim">
          <p className="text-14px-overlay text-center pb-8 pt-12 px-6 text-white md:widthoverlay md:text-16pxCustomline md:pt-24">
            {overlayDataObj[language]?.text}
          </p>
          <div 
    
          className="flex justify-center gap-6 flex-col-reverse md:flex-row px-6 md:px-0">
            <div className="relative overflow-hidden rollupHover border md:hover:bg-soft-white md:hover:text-black ">
            <p
              className="audio  text-center text-12px font-normal text-soft-white uppercase  p-6 md:text-14px md:py-8 md:px-12  md:cursor-pointer"
           
            >
              {overlayDataObj[language]?.buttonMute}
            </p>
            <p
              className="audio  text-center text-12px font-normal hidden md:block uppercase  p-6 md:text-14px md:py-8 md:px-12 text-black   md:cursor-pointer md:absolute "
    
            >
              {overlayDataObj[language]?.buttonMute}
            </p>
            </div>
        <div
           onClick={(e) => handleAudioButtonClick(1,e)} className="relative overflow-hidden rollupHover border bg-soft-white md:hover:bg-soft-black ">
        <p
              className="audio text-center text-12px font-normal   uppercase  p-6 md:text-14px md:py-8 md:px-12  text-black  md:cursor-pointer"
           
            >
              {overlayDataObj[language]?.button}
            </p>
        <p
              className="audio text-center text-12px font-normal  uppercase  p-6 md:text-14px md:py-8 md:px-12  text-soft-white  md:cursor-pointer absolute hidden md:block"
            
            >
              {overlayDataObj[language]?.button}
            </p>
        </div>
     
          </div>
        </div>
      </div>
      <div className="icon-langue hidden md:flex overlay fixed  md:right-12 flex-1  justify-end cursor-pointer">
        <Image
          className="object-contain w-7 h-7 md:h-9 md:w-9 z-30"
          width={18}
          height={18}
          src={icon}
          alt="Logo Buffet Crampon"
          onClick={() => setShowOverlay(!showOverlay)}
        />
        {showOverlay && (
          <div className="language-overlay absolute bg-black flex flex-col">
            <div className="flex">
              <p
                onClick={() => handleLanguageChange("en")}
                className={language === "en" ? "active" : ""}
                style={{ opacity: language === "en" ? 1 : 0.3 }}
              >
                English
              </p>
              {language === "en" && (
                <Image
                  className="w-4 h-4 ml-2 object-contain"
                  priority
                  src={v}
                  alt="Logo Buffet Crampon"
                />
              )}
            </div>
            <div className="flex">
              <p
                onClick={() => handleLanguageChange("fr")}
                className={language === "fr" ? "active" : ""}
                style={{ opacity: language === "fr" ? 1 : 0.3 }}
              >
                Français
              </p>
              {language === "fr" && (
                <Image
                  className="w-4 h-4 ml-2 object-contain"
                  priority
                  src={v}
                  alt="Logo Buffet Crampon"
                />
              )}
            </div>
            <div className="flex">
              <p
                onClick={() => handleLanguageChange("de")}
                className={language === "de" ? "active" : ""}
                style={{ opacity: language === "de" ? 1 : 0.3 }}
              >
                Deutsch
              </p>
              {language === "de" && (
                <Image
                  className="w-4 h-4 ml-2 object-contain"
                  priority
                  src={v}
                  alt="Logo Buffet Crampon"
                />
              )}
            </div>
            <div className="flex">
              <p
                onClick={() => handleLanguageChange("ja")}
                className={language === "ja" ? "active" : ""}
                style={{ opacity: language === "ja" ? 1 : 0.3 }}
              >
                日本
              </p>
              {language === "ja" && (
                <Image
                  className="w-4 h-4 ml-2 object-contain"
                  priority
                  src={v}
                  alt="Logo Buffet Crampon"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
