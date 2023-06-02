"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { urlForImage } from "../sanity/lib/image";

export default function Pedigre({ pedigreData }) {
  const sliderRef = useRef(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0);

  const handleDragStart = (e) => {
    setDragStartX(e.clientX);
    setDragStartScrollLeft(sliderRef.current.scrollLeft);
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragMove = (e) => {
    const dragDistance = e.clientX - dragStartX;
    sliderRef.current.scrollLeft = dragStartScrollLeft - dragDistance;
  };

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleDragMove);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  return (
    <div className="h-almost-screen bg-soft-black flex items-center md:h-auto md:min-h-screen md:pb-40 ">
      <div className="w-screen">
        <h3 className="text-28px text-soft-grey pb-10 px-6 md:px-36 md:text-64px max-width-desktop md:pb-60 md:pt-40">
          {pedigreData[0].titre}
        </h3>
        <div
          className="overflow-x-auto overflow-y-hidden"
          ref={sliderRef}
          onMouseDown={handleDragStart}
          onMouseLeave={handleDragEnd} // Added this to handle drag end when mouse leaves the slider
          onMouseUp={handleDragEnd} // Added this to handle drag end when mouse is released
        >
          <div className="slider flex flex-nowrap px-6 grid-cols-6 gap-x-6 gap-6 snap-proximity md:px-36 md:gap-x-12">
            {pedigreData[0].item.map((item, index) => (
              <div key={item._key} className="slider__container col-span-5 md:w-1/2">
                <div className="image__container">
                  <Image
                    className="radius object-cover h-full w-full"
                    src={urlForImage(item.image.asset._ref)}
                    alt="Details instruments"
                    width={960}
                    height={960}
                  />
                </div>
                <p className="text-12px text-soft-grey uppercase pt-6 md:text-21px md:pt-12">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
