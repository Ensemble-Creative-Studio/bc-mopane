"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";
import logo from "../../public/logo-black.svg";
import icon from "../../public/icon.svg";
import chevron from "../../public/chevron.svg";
const renderText = (block) => {
  return block.children.map((child) => {
    if (child.marks && child.marks.includes("41335c562c9a")) {
      return (
        <a key={child._key} href="https://bc-mopane.vercel.app/">
          {child.text}
        </a>
      );
    }
    return <span key={child._key}>{child.text}</span>;
  });
};

export default async function Page() {
  
  const pathname = usePathname();
  const url = pathname.split("/").pop();
  useEffect(() => {
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("main").style.overflow = "initial";
  }, []);
  const query = groq`*[_type == 'pageFooter' && slug.current == $url][0]`;
  const params = { url }; // Create an object with the parameter value
  const specificationData = await client.fetch(query, params);

  const querylink = groq`*[_type == 'pageFooter'] `;
  const pageData = await client.fetch(querylink);

  return (
    <>
      <header className="text-10px flex justify-between items-center h-36 text-soft-black uppercase px-6  w-full bg-white  md:text-11px md:px-12 md:h-60 sticky top-0">
        <Link href="./" className="flex-1 block ">
          <div className="flex">
            <Image
              className="w-4 h-4 object-contain"
               
              src={chevron}
              alt="Logo Buffet Crampon"
            />
            <p className="pl-2">Back</p>
          </div>
        </Link>

        <div className="logo w-28 h-28 md:h-48 md:w-48 ">
          <Image
            className="w-full h-full object-contain"
             
            src={logo}
            alt="Logo Buffet Crampon"
          />
        </div>

        <div className="icon-langue flex-1 flex justify-end md:relative md:-top-10 cursor-pointer opacity-0">
          <Image
            className="object-contain w-7 h-7 md:h-9 md:w-9 z-30"
            width={18}
            height={18}
            src={icon}
            alt="Logo Buffet Crampon"
          />
        </div>
      </header>
      <div className="md:grid grid-cols-12 md:pr-36">
        <div className="py-12 md:col-span-3 md:py-0 md:pl-12 ">
          {pageData.map((page) => (
            <div className="px-6 py-2 " key={page._id}>
              <Link
                className="text-soft-black text-12px uppercase "
                href={page.slug.current}
              >
                {page.titre}
              </Link>
            </div>
          ))}
        </div>
        <div className="md:col-span-9">
          <div className="px-6 text-16px-legale">
            {specificationData.editionText.map((block) => {
              if (block._type === "block") {
                if (block.style === "h2") {
                  return <h2 key={block._key}>{renderText(block)}</h2>;
                } else if (block.style === "h3") {
                  return (
                    <p
                      className="text-16px-legale-titre uppercase pt-24 pb-6"
                      key={block._key}
                    >
                      {renderText(block)}
                    </p>
                  );
                } else {
                  return <div key={block._key}>{renderText(block)}</div>;
                }
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
