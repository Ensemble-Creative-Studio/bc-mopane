'use client'

import { useState, useContext } from "react";
import Link from "next/link";
import { getHeader } from "../sanity/sanity-util";
import Image from "next/image";
import { useRef } from "react";
import logo from "../public/logo.svg";
import { AnimationContext } from "./AnimationContext";
export default function Overlay({ overlayData }) {
  const overlayRef = useRef(null);
  const enterUpRef= useRef(null);
  const enterDownRef= useRef(null);
  const { setIsAnimating } = useContext(AnimationContext);

  const handleAudioButtonClick = () => {
    setIsAnimating(true);
    overlayRef.current.classList.add('removeOpacity')
    enterUpRef.current.classList.add ('fade-out-up')
    enterDownRef.current.classList.add ('fade-out-down')
    document.querySelector('body').style.overflow = 'auto';
  };

  return (
    <div
      ref={overlayRef}
      className="h-screen fixed top-0 left-0 w-screen flex items-center z-20 bg-soft-black overflow-hidden md:z-50 md:justify-center opacity-100"
    >
      <div className="flex flex-col justify-center">
        <div ref={enterUpRef} className="logo overlayLogo flex justify-center opacity-0 enter-upAnim">
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
          {overlayData[0].text}
        </p>
        <div className="flex justify-center">
          <p
            className="audio text-12px font-normal text-soft-white uppercase border p-6 md:text-14px md:py-8 md:px-12 md:hover:bg-soft-white md:hover:text-black md:transition-all md:cursor-pointer"
            onClick={handleAudioButtonClick}
          >
            {overlayData[0].button}
          </p>
        </div>
        </div>

      </div>
    </div>
  );

}
