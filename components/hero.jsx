"use client";

import { useState, useEffect, useRef, useContext } from "react";

import { AnimationContext } from "./AnimationContext";
export default function Hero({ heroData }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progresses, setProgresses] = useState([]);
  const videoRefs = useRef([]);
  const { isAnimating } = useContext(AnimationContext);
  const handleVideoEnded = () => {
    setTimeout(() => {
      setProgresses((prevProgresses) => {
        const newProgresses = [...prevProgresses];
        newProgresses[currentVideoIndex] = 0;
        return newProgresses;
      });
    }, 100);
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex + 1) % heroData[0].instruments.length
    );
  };

  const handleInstrumentClick = (index) => {
    // Do nothing if the same video is clicked
    if (currentVideoIndex === index) {
      return;
    }

    // Stop the current video and reset its time
    const currentVideoElement = videoRefs.current[currentVideoIndex];
    if (currentVideoElement) {
      currentVideoElement.pause();
      currentVideoElement.currentTime = 0;
    }

    // Reset the progress bar for the current video
    setProgresses((prevProgresses) => {
      const newProgresses = [...prevProgresses];
      newProgresses[currentVideoIndex] = 0;
      return newProgresses;
    });

    // Start playing the new video
    setCurrentVideoIndex(index);
  };

  const handleTimeUpdate = (index) => {
    const videoElement = videoRefs.current[index];
    if (videoElement) {
      setProgresses((prevProgresses) => {
        const newProgresses = [...prevProgresses];
        newProgresses[index] =
          (videoElement.currentTime / videoElement.duration) * 100;
        return newProgresses;
      });
    }
  };

  useEffect(() => {

    const videoElement = videoRefs.current[currentVideoIndex];
    if (videoElement) {
      videoElement.play();
    }
  }, [currentVideoIndex]);

  return (
    <div>
      <div className="h-screen relative">
        {heroData && (
          <>
            <h1
              className={`hero-component font-extralight  text-soft-white text-36px absolute bottom-48 px-6 md:text-96px md:px-36 md:bottom-64 opacity-0 ${
                isAnimating ? "enter-downAnimDelay" : ""
              }`}
            >
              {heroData[0].herotext}
            </h1>
            {heroData[0].instruments.map((instrument, index) => (
              <video
                className={`object-cover w-full h-full absolute top-0 left-0 -z-10 videoHero scaled ${
                  isAnimating ? "unscaled" : ""
                }`}
                key={instrument._key}
                src={instrument.url}
                muted
                playsInline
                onEnded={handleVideoEnded}
                onTimeUpdate={() => handleTimeUpdate(index)}
                ref={(el) => (videoRefs.current[index] = el)}
                style={{
                  opacity: index === currentVideoIndex ? 1 : 0,
                  pointerEvents: index === currentVideoIndex ? "auto" : "none",
                }}
              />
            ))}
            <div className="h-28 text-11px uppercase absolute bottom-0 grid grid-cols-6 gap-6 justify-between w-full px-6 text-white md:px-36 md:gap-12">
              {heroData[0].instruments.map((instrument, index) => (
                <div
                  className="transitionVideoInstrumentText col-span-2"
                  key={instrument._key}
                  style={{ opacity: index === currentVideoIndex ? 1 : 0.5 }}
                >
                  <p
                    className="pb-2"
                    onClick={() => handleInstrumentClick(index)}
                  >
                    {instrument.instrument}
                  </p>
                  <div className="progress-bar" style={{ width: "100%" }}>
                    <div
                      className="progress"
                      style={{
                        width: `${progresses[index] || 0}%`,
                        transition:
                          progresses[index] === 100 || progresses[index] === 0
                            ? "none"
                            : "width 0.5s",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
