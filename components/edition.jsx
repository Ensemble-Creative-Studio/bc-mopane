"use client"
import React, { useLayoutEffect, useRef, useContext } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import divine from "../public/instruments/DIVINE.png";
import legende from "../public/instruments/LEGENDE.png";
import  r13 from "../public/instruments/R13.png";
import { AnimationContext } from "./AnimationContext";
import { useLocomotiveScroll } from "react-locomotive-scroll";
export default function Edition({ editionData }) {
  const { scroll } = useLocomotiveScroll()
  const { language, setLanguage } = useContext(AnimationContext);
  const editionContainerRef = useRef(null);
  const contentRefs = useRef([]);
  const animatedOpacityRefs = useRef([]);
  const defaultOpacityRefs = useRef([]);
  const instrument1Ref = useRef(null);
  const instrument2Ref = useRef(null);
  const instrument3Ref = useRef(null);

  const overlayDataObj = {};
  for (let i = 0; i < editionData.length; i++) {
    const entry = editionData[i];
    overlayDataObj[entry.__i18n_lang] = entry;

  }
  const renderText = (textArray, index) => {
    return (
      <div data-aos="fade-in-right"  data-aos-duration='1000' data-aos-easing="new-easing"  data-aos-offset="350"  data-aos-once="true"  ref={(ref) => (contentRefs.current[index] = ref)} key={index}>
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
    AOS.init();
    gsap.registerPlugin(ScrollTrigger);

    const editionContainer = editionContainerRef.current;

    // Setting initial opacity
    // gsap.set(animatedOpacityRefs.current, {opacity: 1});
    // gsap.set(defaultOpacityRefs.current, {opacity: 1});

    // Creating the scroll trigger for pinning
    const pinTrigger = ScrollTrigger.create({
      trigger: editionContainer,
      start: "top top",
      // scroller:'.smooth-scroller',
      pin: true,
      end: "bottom+=800px",
      pinSpacing: true,
    });

  

    gsap.to(animatedOpacityRefs.current, {
      scrollTrigger: {
        trigger: editionContainer,
        scrub: false,
        // scroller:'.smooth-scroller',
        start: "top top",
        end: "bottom+=800px", // Use the same "end" as the pinning ScrollTrigger        markers: true,
        onUpdate: (self) => {
          const progress = self.progress * 100;
          if (progress > 0 && progress < 5) {
            gsap.to(
              [...defaultOpacityRefs.current, ...animatedOpacityRefs.current],
              { color: '  #FCFBF8', duration: 0.5 }
            );
            gsap.to(
              [
                instrument1Ref.current,
                instrument2Ref.current,
                instrument3Ref.current,
              ],
              { opacity:'0', duration: 0.5 }
            );
          } else if (progress > 5 && progress < 30) {
            gsap.to([animatedOpacityRefs.current[0]], {
              color: '  #FCFBF8',
              duration: 0.5,
            });
            gsap.to(
              [
                ...defaultOpacityRefs.current,
                animatedOpacityRefs.current[1],
                animatedOpacityRefs.current[2],
               
              ],
              { color: '    #726F6A', duration: 0.5 }
            );
            gsap.to(instrument1Ref.current, {  opacity:'1',duration: 0.5 });
            gsap.to(instrument2Ref.current, {  opacity:'0', duration: 0.5 });
            gsap.to(instrument3Ref.current, {  opacity:'0',duration: 0.5 });
          } else if (progress > 30 && progress < 66) {
            gsap.to(animatedOpacityRefs.current[1], {
              color: '  #FCFBF8',
              duration: 0.5,
            });
            gsap.to(
              [
                ...defaultOpacityRefs.current,
                animatedOpacityRefs.current[0],
                animatedOpacityRefs.current[2],
              ],
              {color: '    #726F6A', duration: 0.5 }
            );
            gsap.to(instrument2Ref.current, {    opacity:'1', duration: 0.5 });
            gsap.to(instrument1Ref.current, {  opacity:'0', duration: 0.5 });
            gsap.to(instrument3Ref.current, { opacity:'0', duration: 0.5 });
          } else if (progress > 66 && progress < 98) {
            gsap.to(animatedOpacityRefs.current[2], {
              color: '  #FCFBF8',
              duration: 0.5,
            });
            gsap.to(
              [
                ...defaultOpacityRefs.current,
                animatedOpacityRefs.current[1],
                animatedOpacityRefs.current[0],
              ],
              { color: '    #726F6A', duration: 0.5 }
            );
            gsap.to(instrument3Ref.current, {    opacity:'1', duration: 0.5 });
            gsap.to(instrument2Ref.current, { opacity:'0',duration: 0.5 });
            gsap.to(instrument1Ref.current, {  opacity:'0', duration: 0.5 });
          } else if (progress == 100) {
            gsap.to(
              [...defaultOpacityRefs.current, ...animatedOpacityRefs.current],
              { color: '  #FCFBF8', duration: 0.5 }
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
      animatedOpacityRefs.current = [];  // Resetting the references
      defaultOpacityRefs.current = [];  // Resetting the references
    };
  }, [editionData, language]);

  return (
    <div ref={editionContainerRef}>
      <div className="flex items-center h-screen edition text-28px md:text-64px big:text-96px-edition-big">
        <div className="relative  text-soft-white ESFace font-extralight grid grid-cols-6 gap-6 px-6 md:grid-cols-12 md:px-36 md:gap-12">
          {  overlayDataObj[language]?.editionText.map((block, index) => (
            <div className="col-start-3 col-end-7 md:col-start-5 md:col-end-12" key={block._key}>
              {renderText(block.children, index)}
            </div>
          ))}
          <div className="instruments-slider absolute top-0 left-0 h-full w-full col-start-1 col-end-3 md:col-end-5">
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
