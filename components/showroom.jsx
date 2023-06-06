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
    <div className="h-almost-screen bg-mid-grey flex items-center px-6 md:px-36 ">
      <div className="flex flex-col md:flex-row-reverse">
        <div className="image__container">
          <Image
            className="radius object-cover h-auto w-full"
            src={urlForImage(showroomData[0].image.asset._ref)}
            alt="Details instruments"
            width={960}
            height={960}
          />
        </div>
        <div>
        <h3 className="text-28px text-soft-white pt-10 md:text-64px">
          {showroomData[language].titre}
        </h3>
        <Link
          href={showroomData[language].buttonUrl}
          className="flex-1  font-[450] text-16px text-soft-white pt-10 flex md:text-21px items-center"
        >
          <p>{showroomData[language].buttonText}</p>
          <Image
                    className="ml-2 md:relative md:top-1"
                    src={arrow}
                    alt="Details instruments"
                    width={16}
                    height={16}
                  />
        </Link>
        </div>
    
      </div>
    </div>
  );
}
