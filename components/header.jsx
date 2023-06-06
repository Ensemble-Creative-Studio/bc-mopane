"use client";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { getHeader } from "../sanity/sanity-util";
import Image from "next/image";
import { AnimationContext } from "./AnimationContext";
import logo from "../public/logo.svg";
import icon from "../public/icon.svg";
import v from "../public/v.svg";
import v2 from "../public/v-2.svg";
export default function Header({ headerData }) {
  const [hideHeader, setHideHeader] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const { language, setLanguage } = useContext(AnimationContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > 200 && window.innerWidth > 768) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (languageIndex) => {
    setLanguage(languageIndex);
    setShowOverlay(false);
  };

  const languageText = {
    0: {
      revendeurMobile: headerData[0].revendeurMobile,
      urlRevendeur: headerData[0].urlRevendeur,
    },
    1: {
      revendeurMobile: headerData[1].revendeurMobile,
      urlRevendeur: headerData[1].urlRevendeur,
    },
  };

  const { revendeurMobile, urlRevendeur } = languageText[language];

  return (
    <div
      className="header__container h-36 md:h-60 fixed w-full z-30 "
      onMouseEnter={() => setHideHeader(false)}
      onMouseLeave={() => setHideHeader(true)}
    >
      <header
        className="text-10px flex justify-between items-center h-36 text-white uppercase px-6  w-full top-0  md:text-11px md:px-12 md:h-60"
        style={{
          transform: hideHeader ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.2s ease",
        }}
      >
        <Link href={urlRevendeur} className="flex-1 block md:hidden">
          {revendeurMobile}
        </Link>
        <Link
          href={urlRevendeur}
          className="flex-1 hidden md:block md:relative md:-top-10"
        >
          {revendeurMobile}
        </Link>
        <div className="logo w-28 h-28 md:h-48 md:w-48 ">
          <Image
            className="w-full h-full object-contain"
            priority
            src={logo}
            alt="Logo Buffet Crampon"
          />
        </div>

        <div className="icon-langue flex-1 flex justify-end md:relative md:-top-10 cursor-pointer">
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
      </header>
    </div>
  );
}
