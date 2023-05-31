"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "../public/arrow.svg";

import { urlForImage } from "../sanity/lib/image";
export default function Showroom({ showroomData }) {
  return (
    <div className="h-almost-screen bg-mid-grey flex items-center px-6 ">
      <div className="flex flex-col">
        <div className="image__container">
          <Image
            className="radius object-cover h-auto w-full"
            src={urlForImage(showroomData[0].image.asset._ref)}
            alt="Details instruments"
            width={960}
            height={960}
          />
        </div>
        <h3 className="text-28px text-soft-white pt-10">
          {showroomData[0].titre}
        </h3>
        <Link
          href={showroomData[0].buttonUrl}
          className="flex-1 md:hidden font-[450] text-16px text-soft-white pt-10 flex"
        >
          <p>{showroomData[0].buttonText}</p>
          <Image
                    className="ml-2"
                    src={arrow}
                    alt="Details instruments"
                    width={16}
                    height={16}
                  />
        </Link>
      </div>
    </div>
  );
}
