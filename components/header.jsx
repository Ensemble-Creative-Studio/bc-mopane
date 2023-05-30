import Link from "next/link";
import { getHeader } from "../sanity/sanity-util";
import Image from "next/image";

import logo from "../public/logo.svg";
import icon from "../public/icon.svg";
export default async function Header({}) {
  const headerData = await getHeader();

  return (
    <header className="text-10px flex justify-between items-center h-36 text-white uppercase px-6 fixed w-full top-0 z-30">
      <Link href={headerData[0].urlRevendeur} className="flex-1 block md:hidden">{headerData[0].revendeurMobile}</Link>
      <Link href={headerData[0].urlRevendeur} className="flex-1 hidden md:block ">{headerData[0].revendeur}</Link>
      <div className="logo">
        
        <Image
          className="flex-1"
          priority
          src={logo}
          alt="Logo Buffet Crampon"
        />
      </div>

      <div className="icon-langue flex-1 flex justify-end">
        <Image
          className=""
          width={18}
          height={18}
          src={icon}
          alt="Logo Buffet Crampon"
        />
      </div>
    </header>
  );
}
