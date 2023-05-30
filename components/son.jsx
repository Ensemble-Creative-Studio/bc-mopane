import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Edition({ sonData }) {
  const sonContainerRef = useRef(null);
  const contentRefs = useRef([]);
  const animatedOpacityRefs = useRef([]);
  const defaultOpacityRefs = useRef([]);
  const videoRefs = useRef([]);
  const playVideo = (video) => {
    // video.currentTime = 0;
    video.play();
    console.log('started')
  };
  const resetVideo = (video) => {
    video.currentTime = 0;
    video.pause();
  };
  
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
    gsap.registerPlugin(ScrollTrigger);

    const editionContainer = sonContainerRef.current;

    // Setting initial opacity
    // gsap.set(animatedOpacityRefs.current, {opacity: 1});
    // gsap.set(defaultOpacityRefs.current, {opacity: 1});

    // Creating the scroll trigger for pinning
    const pinTrigger = ScrollTrigger.create({
      trigger: editionContainer,
      start: "top top",
      pin: true,
      end: "bottom+=2400px",
      pinSpacing: true,
    });

    gsap.to(animatedOpacityRefs.current, {
      scrollTrigger: {
        trigger: editionContainer,
        scrub: false,
        start: "top top",
        end: "bottom+=2400px", // Use the same "end" as the pinning ScrollTrigger        markers: true,
        onUpdate: (self) => { 
            const progress = self.progress * 100;
            if (progress > 0 && progress < 5) {
              gsap.to(
                [...defaultOpacityRefs.current, ...animatedOpacityRefs.current],
                { opacity: 1, duration: 0.5, color: "#CDC9C1" }
              );
              gsap.to([...videoRefs.current], { opacity: 0, duration: 0.5 });
              gsap.set(videoRefs.current, { opacity: 0 });
              videoRefs.current.forEach(resetVideo);
            } else if (progress > 5 && progress < 25) {
              gsap.to(animatedOpacityRefs.current[0], {
                opacity: 1,
                duration: 0.5,
                color: "#FCFBF8",
              });
              gsap.to(videoRefs.current[0], {
                opacity: 1,
                duration: 0.5,
                onStart: () => playVideo(videoRefs.current[0]),
              });
              gsap.to(
                [
                  ...defaultOpacityRefs.current,
                  animatedOpacityRefs.current[1],
                  animatedOpacityRefs.current[2],
                  animatedOpacityRefs.current[3],
                ],
                { opacity: 0.3, duration: 0.5, color: "#FCFBF8" }
              );
              gsap.to(videoRefs.current[1], { opacity: 0, duration: 0.5 });
              gsap.to(videoRefs.current[2], { opacity: 0, duration: 0.5 });
              gsap.to(videoRefs.current[3], { opacity: 0, duration: 0.5 });
              videoRefs.current.forEach((video, index) => {
                if (index !== 0) resetVideo(video);
              });
            } else if (progress > 25 && progress < 50) {
              gsap.to(animatedOpacityRefs.current[1], {
                opacity: 1,
                duration: 0.5,
                color: "#FCFBF8",
              });
              gsap.to(videoRefs.current[1], {
                opacity: 1,
                duration: 0.5,
                onStart: () => playVideo(videoRefs.current[1]),
              });
              gsap.to(videoRefs.current[0], {
                opacity: 0,
                duration: 0.5,
              });
              gsap.to(
                [
                  ...defaultOpacityRefs.current,
                  animatedOpacityRefs.current[0],
                  animatedOpacityRefs.current[2],
                  animatedOpacityRefs.current[3],
                ],
                { opacity: 0.3, duration: 0.5, color: "#FCFBF8" }
              );
              gsap.to(videoRefs.current[2], { opacity: 0, duration: 0.5 });
              gsap.to(videoRefs.current[3], { opacity: 0, duration: 0.5 });
              videoRefs.current.forEach((video, index) => {
                if (index !== 1) resetVideo(video);
              });
            } else if (progress > 50 && progress < 75) {
              gsap.to(animatedOpacityRefs.current[2], {
                opacity: 1,
                duration: 0.5,
                color: "#FCFBF8",
              });
              gsap.to(videoRefs.current[2], {
                opacity: 1,
                duration: 0.5,
                onStart: () => playVideo(videoRefs.current[2]),
              });
              gsap.to(
                [
                  ...defaultOpacityRefs.current,
                  animatedOpacityRefs.current[0],
                  animatedOpacityRefs.current[1],
                  animatedOpacityRefs.current[3],
                ],
                { opacity: 0.3, duration: 0.5, color: "#FCFBF8" }
              );
              gsap.to(videoRefs.current[1], { opacity: 0, duration: 0.5 });
              gsap.to(videoRefs.current[3], { opacity: 0, duration: 0.5 });
              videoRefs.current.forEach((video, index) => {
                if (index !== 2) resetVideo(video);
              });
            } else if (progress > 75 && progress < 98) {
              gsap.to(animatedOpacityRefs.current[3], {
                opacity: 1,
                duration: 0.5,
                color: "#FCFBF8",
              });
              gsap.to(videoRefs.current[3], {
                opacity: 1,
                duration: 0.5,
                onStart: () => playVideo(videoRefs.current[3]),
              });
              gsap.to(
                [
                  ...defaultOpacityRefs.current,
                  animatedOpacityRefs.current[0],
                  animatedOpacityRefs.current[1],
                  animatedOpacityRefs.current[2],
                ],
                { opacity: 0.3, duration: 0.5, color: "#FCFBF8" }
              );
              gsap.to(videoRefs.current[2], { opacity: 0, duration: 0.5 });
              videoRefs.current.forEach((video, index) => {
                if (index !== 3) resetVideo(video);
              });
            } else if (progress === 100) {
              gsap.to(
                [...defaultOpacityRefs.current, ...animatedOpacityRefs.current],
                { opacity: 1, duration: 0.5, color: "#FCFBF8" }
              );
              gsap.to(videoRefs.current[3], { opacity: 0, duration: 0.5 });
              videoRefs.current.forEach((video, index) => {
                if (index !== 3) resetVideo(video);
              });
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
  }, [sonData]);

  return (
    <div ref={sonContainerRef}>
      <div className="flex relative items-end h-screen text-36px bg-soft-black pr-12">
        <div className="relative  text-opacity-white ESFace pb-16 px-6 z-10">
          {sonData[0].sonText.map((block, index) => (
            <div className="col-start-2 col-end-7" key={block._key}>
              {renderText(block.children, index)}
            </div>
          ))}
        </div>
        <div className="absolute top-0 h-full w-full">
          {sonData[0].videoSon.map((video, index) => (
            <video
              ref={(ref) => (videoRefs.current[index] = ref)}
              className="object-cover h-full absolute top-0 left-0 opacity-0 z-0  "
              key={video._key}
              src={video.url}
              muted
              loop
              autoPlay={false}
              controls={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
