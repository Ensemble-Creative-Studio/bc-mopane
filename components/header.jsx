import Link from "next/link";
import { getHeader } from "../sanity/sanity-util";
import Image from "next/image";

import logo from "../public/logo.svg";
import icon from "../public/icon.svg";
export default async function Header({}) {
  const headerData = await getHeader();

  return (
    <header className="text-10px flex justify-between items-center h-36 text-white uppercase px-6 fixed w-full top-0 z-30 md:text-11px md:px-12 md:h-60">
      <Link
        href={headerData[0].urlRevendeur}
        className="flex-1 block    md:hidden"
      >
        {headerData[0].revendeurMobile}
      </Link>
      <Link
        href={headerData[0].urlRevendeur}
        className="flex-1 hidden md:block md:relative md:-top-10"
      >
        {headerData[0].revendeur}
      </Link>
      <div className="logo w-28 h-28 md:h-48 md:w-48 ">
        <Image
          className="w-full h-full object-contain"
          priority
          src={logo}
          alt="Logo Buffet Crampon"
        />
      </div>

      <div className="icon-langue flex-1 flex justify-end md:relative  md:-top-10">
        <Image
          className="object-contain w-7 h-7 md:h-9 md:w-9"
          width={18}
          height={18}
          src={icon}
          alt="Logo Buffet Crampon"
        />
      </div>
    </header>
  );
}
