"use client";

import { useState, useContext } from "react";
import Link from "next/link";
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
  const handleAudioButtonClick = () => {
    setIsAnimating(true);
    overlayRef.current.classList.add("removeOpacity");
    enterUpRef.current.classList.add("fade-out-up");
    enterDownRef.current.classList.add("fade-out-down");
    document.querySelector("body").style.overflow = "auto";
  };
  const handleLanguageChange = (languageIndex) => {
    setLanguage(languageIndex);
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
            {overlayData[language].text}
          </p>
          <div className="flex justify-center gap-6 flex-col-reverse md:flex-row px-6 md:px-0">
            <p
              className="audio text-center text-12px font-normal text-soft-white uppercase border p-6 md:text-14px md:py-8 md:px-12 md:hover:bg-soft-white md:hover:text-black md:transition-all md:cursor-pointer"
              onClick={handleAudioButtonClick}
            >
              {overlayData[language].buttonMute}
            </p>
            <p
              className="audio text-center text-12px font-normal hover:text-soft-white hover:bg-soft-black uppercase border p-6 md:text-14px md:py-8 md:px-12 bg-soft-white text-black md:transition-all md:cursor-pointer"
              onClick={handleAudioButtonClick}
            >
              {overlayData[language].button}
            </p>
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
                onClick={() => handleLanguageChange(1)}
                className={language === 1 ? "active" : ""}
                style={{ opacity: language === 1 ? 1 : 0.3 }}
              >
                English
              </p>
              {language === 1 && (
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
                onClick={() => handleLanguageChange(0)}
                className={language === 0 ? "active" : ""}
                style={{ opacity: language === 0 ? 1 : 0.3 }}
              >
                Français
              </p>
              {language === 0 && (
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
