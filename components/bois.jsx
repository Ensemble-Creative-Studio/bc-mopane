"use client"
import React from "react";
import Image from "next/image";
import img0 from "../public/bois/img-0.png";
import img1 from "../public/bois/img-1.png";
import img2 from "../public/bois/img-2.png";

export default function Bois({ boisData }) {
  const images = [img0, img1, img2];

  return (
    <div className="h-screen bg-soft-black">
      <div className="pt-36 text-soft-white px-6 pb-16">
        <p className="text-12px pb-3 uppercase">{boisData[0].boisTitre}</p>
        <h3 className="text-24px">{boisData[0].boisPhrase}</h3>
      </div>
      <div className="px-6 flex gap-14 flex-col">
        {boisData[0].bois.map((bois, index) => (
          <div className="flex items-center gap-6 " key={index}>
            <div className="image-container w-20 h-20 ">
              <Image
                className="flex-1 h-full w-full object-cover"
                priority
                src={images[index]}
                alt="Logo Buffet Crampon"
              />
            </div>
            <div className="flex flex-col text-opacity-white">
              <p className="text-16px">{bois.type}</p>
              <h4 className="text-40px">{bois.densite}</h4>
              <h5 className="text-24px -top-1 relative">{bois.unite}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
