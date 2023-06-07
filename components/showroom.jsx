"use client"
import React, { useState, useRef, useContext } from "react";

import Image from "next/image";
import Link from "next/link";
import arrow from "../public/arrow.svg";
import { AnimationContext } from "./AnimationContext";
import { urlForImage } from "../sanity/lib/image";
export default function Showroom({ showroomData }) {
  const { language, setLanguage } = useContext(AnimationContext);
  return (
    <div className="md:h-almost-screen h-screen bg-mid-grey flex items-center px-6 md:px-36 ">
      <div className="flex flex-col md:flex-row-reverse">
        <div className="image__container flex-1">
          <Image
            className="radius object-cover h-auto w-full"
            src={urlForImage(showroomData[0].image.asset._ref)}
            alt="Details instruments"
            width={960}
            height={960}
          />
        </div>
        <div className="flex-1">
        <h3 className="text-28px text-soft-white pt-10 md:pt-0 md:text-64px">
          {showroomData[language].titre}
        </h3>
        <div >
          <div className="flex md:gap-12 md:mt-24 flex-col md:flex-row gap-6 pt-10 md:pt-0">
          <Link
                  target="_blank"
          href={showroomData[language].buttonUrl}
          className="text-center text-12px font-normal text-soft-white uppercase border p-8 md:text-14px md:py-8 md:px-12 md:hover:bg-soft-white md:hover:text-black md:transition-all md:cursor-pointer"
        >
          <p>{showroomData[language].buttonText}</p>
   
        </Link>
        <Link
                target="_blank"
          href={showroomData[language].buttonUrlRevendeur}
          className="text-center text-12px font-normal text-soft-white uppercase border p-8 md:text-14px md:py-8 md:px-12 md:hover:bg-soft-white md:hover:text-black md:transition-all md:cursor-pointer"
        >
          <p>{showroomData[language].buttonTextRevendeur}</p>
   
        </Link>
          </div>

        </div>

        </div>
    
      </div>
    </div>
  );
}
