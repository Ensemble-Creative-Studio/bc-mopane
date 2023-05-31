import React from "react";
import Image from "next/image";
import { urlForImage } from "../sanity/lib/image";
export default function Pedigre({ pedigreData }) {
  return (
    <div className="h-almost-screen bg-soft-black flex items-center ">
      <div className="w-screen">
        <h3 className="text-28px text-soft-grey pb-10 px-6">
          {pedigreData[0].titre}
        </h3>
        <div className="overflow-x-auto overflow-y-hidden">
          <div className="slider flex flex-nowrap px-6 grid-cols-6 gap-x-6 gap-6  snap-proximity">
            {pedigreData[0].item.map((item, index) => (
              <div key={item._key} className="slider__container col-span-5 ">
                <div className="image__container">
                  <Image
                    className="radius object-cover h-full w-full"
                    src={urlForImage(item.image.asset._ref)}
                    alt="Details instruments"
                    width={960}
                    height={960}
                  />
                </div>

                <p className="text-12px text-soft-grey uppercase pt-6">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
