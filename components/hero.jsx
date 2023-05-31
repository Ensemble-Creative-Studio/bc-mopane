"use client";
import { useState, useEffect, useRef } from "react";
import { getHero } from "../sanity/sanity-util";

export function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progresses, setProgresses] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    async function fetchHeroData() {
      const data = await getHero();
      setHeroData(data);
      setMounted(true);
    }
    fetchHeroData();
  }, []);

  useEffect(() => {
    if (mounted) {
      const videoElement = videoRefs.current[currentVideoIndex];
      if (videoElement) {
        videoElement.play();
        console.log("mounted");
      }
    }
  }, []); // Empty dependency array to play the first video on load

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
    const currentVideoElement = videoRefs.current[currentVideoIndex];
    if (currentVideoElement) {
      currentVideoElement.pause();
      currentVideoElement.currentTime = 0;
    }

    setProgresses((prevProgresses) => {
      const newProgresses = [...prevProgresses];
      newProgresses[currentVideoIndex] = 0;
      return newProgresses;
    });

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

  if (!heroData) {
    return null; // Render null or a loading indicator while fetching data
  }

  return (
    <div>
      <div className="h-screen relative">
        <>
          <h1 className="text-white text-36px absolute bottom-48 px-6">
            {heroData[0].herotext}
          </h1>
          {heroData[0].instruments.map((instrument, index) => (
            <video
              className="object-cover h-full absolute top-0 left-0 -z-10 videoHero"
              key={instrument._key}
              src={instrument.url}
              muted
              onEnded={handleVideoEnded}
              onTimeUpdate={() => handleTimeUpdate(index)}
              ref={(el) => (videoRefs.current[index] = el)}
              style={{
                opacity: index === currentVideoIndex ? 1 : 0,
                pointerEvents: index === currentVideoIndex ? "auto" : "none",
              }}
            />
          ))}
          <div className="h-28 text-11px uppercase absolute bottom-0 grid grid-cols-6 gap-6 justify-between w-full px-6 text-white">
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
      </div>
    </div>
  );
}

export default Hero;