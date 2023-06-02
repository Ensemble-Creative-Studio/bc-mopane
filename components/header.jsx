"use client"
import Link from "next/link";
import { useState, useEffect } from 'react';
import { getHeader } from "../sanity/sanity-util";
import Image from "next/image";

import logo from "../public/logo.svg";
import icon from "../public/icon.svg";
export default function Header({ headerData }) {
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      // Only hide header if viewport is wider than 768px
      if (currentScrollPos > 0 && window.innerWidth > 768) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="header__container h-36 md:h-60 fixed w-full z-30 " 
      onMouseEnter={() => setHideHeader(false)}
      onMouseLeave={() => setHideHeader(true)}
    >
      <header className="text-10px flex justify-between items-center h-36 text-white uppercase px-6  w-full top-0  md:text-11px md:px-12 md:h-60"
            style={{ 
              transform: hideHeader ? 'translateY(-100%)' : 'translateY(0)',
              transition: 'transform 0.2s ease',
            }}
         >
        <Link href={headerData[0].urlRevendeur} className="flex-1 block md:hidden">
          {headerData[0].revendeurMobile}
        </Link>
        <Link href={headerData[0].urlRevendeur} className="flex-1 hidden md:block md:relative md:-top-10">
          {headerData[0].revendeur}
        </Link>
        <div className="logo w-28 h-28 md:h-48 md:w-48 ">
          <Image className="w-full h-full object-contain" priority src={logo} alt="Logo Buffet Crampon" />
        </div>

        <div className="icon-langue flex-1 flex justify-end md:relative md:-top-10">
          <Image className="object-contain w-7 h-7 md:h-9 md:w-9" width={18} height={18} src={icon} alt="Logo Buffet Crampon" />
        </div>
      </header>
    </div>
  );
}