"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import img0 from "../public/bois/img-0.png";
import img1 from "../public/bois/img-1.png";
import img2 from "../public/bois/img-2.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Bois({ boisData }) {
  const images = [img0, img1, img2];
  const editionContainerRef = useRef(null);
  const contentRefs = useRef([]);
  const opacityRefs = useRef([]);
  const imageOpacityRefs  = useRef([]);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const editionContainer = editionContainerRef.current;

    // Creating the scroll trigger for pinning
    const pinTrigger = ScrollTrigger.create({
      trigger: editionContainer,
      start: "top top",
      pin: false,
      end: "bottom",
      pinSpacing: true,
    });

    const animateTranslate = (ref) => {
      gsap.to(ref, { x: 0, duration: 0.5 });
    };

    const removeTranslate = (ref) => {
      gsap.to(ref, { x: "-5rem", duration: 0.5 });
    };

    const animatedOpacity = (ref) => {
      gsap.to(ref, { opacity: 1, duration: 0.5 });
    };

    const removeOpacity = (ref) => {
      gsap.to(ref, { opacity: 0.2, duration: 0.5 });
    };

    const animatedImageOpacity = (ref) => {
      gsap.to(ref, { opacity: 1, duration: 0.5 });
    };

    const removeImageOpacity = (ref) => {
      gsap.to(ref, { opacity: 0, duration: 0.5 });
    };

    // Animate content opacity based on its position in the viewport
    contentRefs.current.forEach((ref, index) => {
      ScrollTrigger.create({
        trigger: ref,
        start: "top center",
        end: "bottom center",
  
        onEnter: () => {
          animateTranslate(ref);
        },
        onLeave: () => {
          removeTranslate(ref);
        },
        onEnterBack: () => {
          animateTranslate(ref);
        },
        onLeaveBack: () => {
          removeTranslate(ref);
        },
      });
    });

    // Animate opacity of md:opacity-20 elements when entering contentRefs
    opacityRefs.current.forEach((ref) => {
      ScrollTrigger.create({
        trigger: ref,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          animatedOpacity(ref);
        },
        onLeave: () => {
          removeOpacity(ref);
        },
        onEnterBack: () => {
          animatedOpacity(ref);
        },
        onLeaveBack: () => {
          removeOpacity(ref);
        },
      });
    });
    imageOpacityRefs.current.forEach((ref) => {
      ScrollTrigger.create({
        trigger: ref,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          animatedImageOpacity(ref);
        },
        onLeave: () => {
          removeImageOpacity(ref);
        },
        onEnterBack: () => {
          animatedImageOpacity(ref);
        },
        onLeaveBack: () => {
          removeImageOpacity(ref);
        },
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(contentRefs.current);
    };
  }, [boisData]);

  return (
    <div ref={editionContainerRef} className="h-screen bg-soft-black md:min-h-screen md:h-auto md:pb-40">
      <div className="pt-36 text-soft-white px-6 pb-16 md:px-36 md:grid md:grid-cols-12 md:gap-12 md:pb-64 ">
        <div className="flex flex-col md:col-start-2 md:col-end-8 ">
          <p className="text-12px md:text-21px pb-3 uppercase">
            {boisData[0].boisTitre}
          </p>
          <h3 className="text-24px md:text-64px">{boisData[0].boisPhrase}</h3>
        </div>
      </div>
      <div className="px-6 flex gap-14 flex-col md:gap-32">
        {boisData[0].bois.map((bois, index) => (
          <div
            ref={(ref) => {
              contentRefs.current[index] = ref;
            }}
            className="md:grid md:grid-cols-12 md:gap-12  md:pl-36 -translate-x-20"
            key={index}
          >
            <div className="flex items-center gap-6 md:col-start-2 col-end-13 md:gap-56 " key={index}>
              <div className="image-container w-20 h-20 md:h-72 md:w-72 ">
                <Image
                ref={(ref) => {
                  imageOpacityRefs.current[index] = ref;
                }}
                  className="flex-1 h-full w-full object-cover md:opacity-0"
                  priority
                  src={images[index]}
                  alt="Logo Buffet Crampon"
                />
              </div>
              <div ref={(ref) => {
                  opacityRefs.current[index] = ref;
                }} className="flex flex-col text-opacity-white md:opacity-20">
                <p className="text-16px font-light md:text-32px">{bois.type}</p>
                <div className="block md:flex md:items-end">
                  <h4 className="text-40px font-thin md:text-132px">
                    {bois.densite}
                  </h4>
                  <h5 className="text-24px -top-1 relative font-thin md:text-36px">
                    {bois.unite}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
