'use client'

import { useState } from "react";
import Link from "next/link";
import { getHeader } from "../sanity/sanity-util";
import Image from "next/image";
import { useRef } from "react";
import logo from "../public/logo.svg";

export default function Overlay({ overlayData }) {
  const overlayRef = useRef(null);

  const handleAudioButtonClick = () => {
    overlayRef.current.style.display = "none";
  };

  return (
    <div
      ref={overlayRef}
      className="h-screen fixed top-0 left-0 w-screen flex items-center z-20 bg-soft-black overflow-hidden md:z-50 md:justify-center"
    >
      <div className="flex flex-col justify-center">
        <div className="logo flex justify-center">
          <Image
            className=""
            priority
            height={130}
            width={130}
            src={logo}
            alt="Logo Buffet Crampon"
          />
        </div>
        <p className="text-14px-overlay text-center pb-8 pt-12 px-6 text-white md:widthoverlay md:text-16pxCustomline md:pt-24">
          {overlayData[0].text}
        </p>
        <div className="flex justify-center">
          <p
            className="audio text-12px font-normal text-soft-white uppercase border p-6 md:text-14px md:py-8 md:px-12"
            onClick={handleAudioButtonClick}
          >
            {overlayData[0].button}
          </p>
        </div>
      </div>
    </div>
  );

}
