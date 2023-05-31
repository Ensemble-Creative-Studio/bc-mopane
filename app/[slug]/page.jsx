"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";


const renderText = (blockArray) => {
  return blockArray.map((blockItem) => {
    if (blockItem._type === 'block') {
      const children = renderText(blockItem.children);
      if (blockItem.style === 'h2') {
        return <h2 key={blockItem._key}>{children}</h2>;
      } else {
        return <div  key={blockItem._key}>{children}</div>;
      }
    } else if (blockItem._type === 'span') {
      if (blockItem.marks.includes('strong')) {
        return <strong key={blockItem._key}>{blockItem.text}</strong>;
      } else {
        return <span key={blockItem._key}>{blockItem.text}</span>;
      }
    }
    return null;
  });
};





export default async function Page() {
  const pathname = usePathname();
  const url = pathname.split("/").pop();
  console.log(url);
  
      const query = groq`*[_type == 'pageFooter' && slug.current == $url][0]`;
      const params = { url }; // Create an object with the parameter value
      const specificationData = await client.fetch(query, params);
      console.log(specificationData);


  return (
    <>
    {specificationData.titre}
    {specificationData.editionText.map((block) => (
            <div key={block._key}>
              {renderText(block.children)}
            </div>
          ))}
    </>
  );
}