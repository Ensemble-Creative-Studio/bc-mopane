"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import divine from "../public/instruments/DIVINE.png";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import legende from "../public/instruments/LEGENDE.png";
import r13 from "../public/instruments/R13.png";
import { getEdition } from "../sanity/sanity-util"
export default function Edition() {
  const [editionData, setEditionData] = useState(null);
    const editionContainerRef = useRef(null);
    const [mounted, setMounted] = useState(false);
=======
=======
>>>>>>> parent of 752811c (change name of video)
=======
>>>>>>> parent of 752811c (change name of video)
import legende from "../public/instruments/legende.png";
import r13 from "../public/instruments/r13.png";

export default function Edition({ editionData }) {
  const editionContainerRef = useRef(null);
>>>>>>> parent of 752811c (change name of video)
  const contentRefs = useRef([]);
  const animatedOpacityRefs = useRef([]);
  const defaultOpacityRefs = useRef([]);
  const instrument1Ref = useRef(null);
  const instrument2Ref = useRef(null);
  const instrument3Ref = useRef(null);

  useEffect(() => {
    async function fetchEditionData() {
      const data = await getEdition();
      setEditionData(data);
      setMounted(true);
    }
    fetchEditionData();
  }, []);

  const renderText = (textArray, index) => {
    return (
      <div ref={(ref) => (contentRefs.current[index] = ref)} key={index}>
        {textArray.map((textItem, i) => {
          if (textItem._type === "span") {
            if (textItem.marks.includes("strong")) {
              return (
                <span
                  ref={(ref) => animatedOpacityRefs.current.push(ref)}
                  className="animatedOpacity font"
                  key={textItem._key}
                >
                  {textItem.text}
                </span>
              );
            }
            return (
              <span
                ref={(ref) => defaultOpacityRefs.current.push(ref)}
                key={textItem._key}
              >
                {textItem.text}
              </span>
            );
          }
          return null;
        })}
      </div>
    );
  };
  useLayoutEffect(() => {
    if (mounted && editionData) {
      
    gsap.registerPlugin(ScrollTrigger);

    const editionContainer = editionContainerRef.current;

    // Setting initial opacity
    // gsap.set(animatedOpacityRefs.current, {opacity: 1});
    // gsap.set(defaultOpacityRefs.current, {opacity: 1});

    // Creating the scroll trigger for pinning
    const pinTrigger = ScrollTrigger.create({
      trigger: editionContainer,
      start: "top top",
      pin: true,
      end: "bottom+=1800px",
      pinSpacing: true,
    });

    gsap.to(animatedOpacityRefs.current, {
      scrollTrigger: {
        trigger: editionContainer,
        scrub: false,
        start: "top top",
        end: "bottom+=1800px", // Use the same "end" as the pinning ScrollTrigger        markers: true,
        onUpdate: (self) => {
          const progress = self.progress * 100;
          if (progress > 0 && progress < 5) {
            gsap.to(
              [...defaultOpacityRefs.current, ...animatedOpacityRefs.current],
              { opacity: 1, duration: 0.5 }
            );
            gsap.to(
              [
                instrument1Ref.current,
                instrument2Ref.current,
                instrument3Ref.current,
              ],
              { opacity: 0, duration: 0.5 }
            );
          } else if (progress > 5 && progress < 30) {
            gsap.to(animatedOpacityRefs.current[0], {
              opacity: 1,
              duration: 0.5,
            });
            gsap.to(
              [
                ...defaultOpacityRefs.current,
                animatedOpacityRefs.current[1],
                animatedOpacityRefs.current[2],
              ],
              { opacity: 0.3, duration: 0.5 }
            );
            gsap.to(instrument1Ref.current, { opacity: 1, duration: 0.5 });
            gsap.to(instrument2Ref.current, { opacity: 0, duration: 0.5 });
            gsap.to(instrument3Ref.current, { opacity: 0, duration: 0.5 });
          } else if (progress > 30 && progress < 66) {
            gsap.to(animatedOpacityRefs.current[1], {
              opacity: 1,
              duration: 0.5,
            });
            gsap.to(
              [
                ...defaultOpacityRefs.current,
                animatedOpacityRefs.current[0],
                animatedOpacityRefs.current[2],
              ],
              { opacity: 0.3, duration: 0.5 }
            );
            gsap.to(instrument2Ref.current, { opacity: 1, duration: 0.5 });
            gsap.to(instrument1Ref.current, { opacity: 0, duration: 0.5 });
            gsap.to(instrument3Ref.current, { opacity: 0, duration: 0.5 });
          } else if (progress > 66 && progress < 98) {
            gsap.to(animatedOpacityRefs.current[2], {
              opacity: 1,
              duration: 0.5,
            });
            gsap.to(
              [
                ...defaultOpacityRefs.current,
                animatedOpacityRefs.current[1],
                animatedOpacityRefs.current[0],
              ],
              { opacity: 0.3, duration: 0.5 }
            );
            gsap.to(instrument3Ref.current, { opacity: 1, duration: 0.5 });
            gsap.to(instrument2Ref.current, { opacity: 0, duration: 0.5 });
            gsap.to(instrument1Ref.current, { opacity: 0, duration: 0.5 });
          } else if (progress == 100) {
            gsap.to(
              [...defaultOpacityRefs.current, ...animatedOpacityRefs.current],
              { opacity: 1, duration: 0.5 }
            );
            gsap.to(instrument3Ref.current, { opacity: 0, duration: 0.5 });
          }
        },
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(animatedOpacityRefs.current);
      gsap.killTweensOf(defaultOpacityRefs.current);
    };
  }
}, [mounted, editionData]);
  if (!editionData) {
    return null; // Render null or a loading indicator while fetching data
  }

  return (
    <div ref={editionContainerRef}>
      <div className="flex items-center h-screen edition text-28px ">
        <div className="relative backgroundLine text-soft-white ESFace grid grid-cols-6 gap-6 px-6">
          {editionData[0].editionText.map((block, index) => (
            <div className="col-start-2 col-end-7" key={block._key}>
              {renderText(block.children, index)}
            </div>
          ))}
          <div className="instruments-slider absolute top-0 left-0 h-full w-full col-start-1 col-end-2">
            <Image
              ref={instrument1Ref}
              className="absolute w-full object-contain h-full instrument1 opacity-0"
              priority
              src={legende}
              alt="Logo Buffet Crampon"
            />
            <Image
              ref={instrument2Ref}
              className="absolute w-full object-contain h-full instrument2 opacity-0"
              priority
              src={divine}
              alt="Logo Buffet Crampon"
            />
            <Image
              ref={instrument3Ref}
              className="absolute h-full w-full object-contain instrument3 opacity-0"
              priority
              src={r13}
              alt="Logo Buffet Crampon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
