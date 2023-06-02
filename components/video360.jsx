"use client"

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


export default function Video({ video360Data }) {
  const editionContainerRef = useRef(null);
  const contentRefs = useRef([]);
  const animatedOpacityRefs = useRef([]);
  const defaultOpacityRefs = useRef([]);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const instrument1Ref = useRef(null);
  const instrument2Ref = useRef(null);
  const instrument3Ref = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const editionContainer = editionContainerRef.current;
    const videoContainer = videoContainerRef.current;
    const videoElement = videoRef.current;
    // Setting initial opacity
    // gsap.set(animatedOpacityRefs.current, {opacity: 1});
    // gsap.set(defaultOpacityRefs.current, {opacity: 1});

    // Creating the scroll trigger for pinning
    const pinTrigger = ScrollTrigger.create({
      trigger: editionContainer,
      start: "top top",
      pin: true,
      end: "bottom+=800px",
      pinSpacing: true,
    });

    gsap.to(videoContainer, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: editionContainer,
        scrub: true,
        start: "top top",
        end: "bottom+=800px",
      },
    });
    gsap.to(animatedOpacityRefs.current, {
      scrollTrigger: {
        trigger: editionContainer,
        scrub: false,
        start: "top top",
        end: "bottom+=800px", // Use the same "end" as the pinning ScrollTrigger        markers: true,
        onUpdate: (self) => {
          const progress = self.progress * 100;
          if (progress > 0 && progress < 5) {
            gsap.to([...contentRefs.current, ...animatedOpacityRefs.current], {
              opacity: 0,
              duration: 0.5,
            });
          } else if (progress > 5 && progress < 25) {
            gsap.to(contentRefs.current[0], {
              opacity: 1,
              duration: 0.5,
            });
            gsap.to(
              [
                contentRefs.current[1],
                contentRefs.current[2],
                contentRefs.current[3],
              ],
              { opacity: 0, duration: 0.5 }
            );
          } else if (progress > 25 && progress < 50) {
            gsap.to(contentRefs.current[1], {
              opacity: 1,
              duration: 0.5,
            });
            gsap.to(
              [
                // contentRefs.current[0],
                contentRefs.current[2],
                contentRefs.current[3],
              ],
              { opacity: 0, duration: 0.5 }
            );
          } else if (progress > 50 && progress < 75) {
            gsap.to(contentRefs.current[2], {
              opacity: 1,
              duration: 0.5,
            });
            gsap.to(
              [
                // contentRefs.current[0],
                // contentRefs.current[1],
                contentRefs.current[3],
              ],
              { opacity: 0, duration: 0.5 }
            );
          } else if (progress > 75 && progress < 98) {
            gsap.to(contentRefs.current[3], {
              opacity: 1,
              duration: 0.5,
            });
            gsap.to(
              [
                // contentRefs.current[0],
                // contentRefs.current[1],
                // contentRefs.current[2],
              ],
              { opacity: 0, duration: 0.5 }
            );
          } else if (progress == 100) {
            // gsap.to(
            //   [...defaultOpacityRefs.current, ...animatedOpacityRefs.current],
            //   { opacity: 1, duration: 0.5 }
            // );
            // gsap.to(instrument3Ref.current, { opacity: 0, duration: 0.5 });
          }
        },
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(contentRefs.current);
      gsap.killTweensOf(defaultOpacityRefs.current);
    };
  }, [video360Data]);

  return (
    <div ref={editionContainerRef}>
      <div className="flex items-center h-screen bg-soft-black text-28px px-6 pb-32 md:px-36 md:grid md:grid-cols-12 md:gap-12  ">
        <div className="relative flex-1 -left-52 top-32 z-10 w-full h-full md:col-start-3 md:col-end-5 ">
          <div ref={videoContainerRef} className="video__container h-full">
            <video
              ref={videoRef}
              className="object-cover heightCustom absolute top-0 left-0 -z-10 videoHero"
              src="/videos/3D.mp4"
              muted
              autoPlay
              loop
              // onTimeUpdate={() => handleTimeUpdate(index)}
              // ref={video3DRef}
            />
          </div>
        </div>
        <div className="relative z-10 pt-16  flex-1 font-extralight  ESFace text-28px md:text-64px md:col-start-8 md:col-end-13">
          <h2 className="text-soft-white pb-6 pr-8 md:pb-12">{video360Data[0].titre}</h2>
          <div id="ed-face">
            {video360Data[0].bulletPoint.map((bullet, index) => (
              <p
                className=" opacity-0 pb-3 uppercase text-12px text-soft-grey font-normal md:text-21px md:pb-8"
                key={bullet._key}
                ref={(ref) => (contentRefs.current[index] = ref)}
              >
                {bullet.point}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
