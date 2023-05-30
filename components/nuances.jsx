import React, { useState } from "react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { urlForImage } from "../sanity/lib/image";

export default function Nuances({ nuancesData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true);
      },
    
  });

  return (
    <div>
    <div className="h-screen bg-soft-black pt-32 flex flex-col justify-between ">
      <div>
        <h3 className="text-28px text-soft-white w-1/2 px-6 pb-10">
          {nuancesData[0].titre}
        </h3>
        <h5 className="text-16pxCustomline text-white px-6">
          {nuancesData[0].texte}
        </h5>
      </div>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {nuancesData[0].slider.map((slide, index) => (
            <div key={slide._key} className="keen-slider__slide">
              {slide.mediaType === "image" && slide.image && (
                <Image
                  src={urlForImage(slide.image.asset._ref)}
                  alt="Details instruments"
                  width={960}
                  height={600}
                />
              )}
              {slide.mediaType === "video" && slide.video && (
                <video
                  src={slide.video}
                  className="object-cover h-full w-full"
                  muted
                  autoPlay
                  loop
                />
              )}
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <div className="navigation-controls flex items-center justify-center pt-6 pb-8">
            <Arrow
              left
              onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={currentSlide === 0}
            />
            <div className="slide-index text-12px text-soft-grey px-8">
              {currentSlide + 1} — {nuancesData[0].slider.length}
            </div>
            <Arrow
              onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
              disabled={currentSlide === nuancesData[0].slider.length - 1}
            />
          </div>
        )}
      </div>
    </div>
    <div className="h-24 bg-soft-black "></div>
    </div>
  );
}

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow h-10 w-10 ${props.left ? "arrow--left relative top-1" : "arrow--right relative -right-2"} ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left ? (
        <path fillRule ="evenodd" clipRule ="evenodd" d="M0.875 9C0.875 8.90055 0.914509 8.80516 0.984835 8.73484L9.23483 0.48484C9.38128 0.338395 9.61872 0.338395 9.76517 0.48484C9.91161 0.631288 9.91161 0.868724 9.76517 1.01517L1.78033 9L9.76517 16.9848C9.91162 17.1313 9.91162 17.3687 9.76517 17.5152C9.61873 17.6616 9.38129 17.6616 9.23484 17.5152L0.984835 9.26517C0.914509 9.19484 0.875 9.09946 0.875 9Z" fill="#FCFBF8"/>
      ) : (
        <path fillRule ="evenodd" clipRule ="evenodd" d="M16.875 12C16.875 12.0995 16.8355 12.1948 16.7652 12.2652L8.51517 20.5152C8.36872 20.6616 8.13128 20.6616 7.98483 20.5152C7.83839 20.3687 7.83839 20.1313 7.98483 19.9848L15.9697 12L7.98483 4.01516C7.83838 3.86872 7.83838 3.63128 7.98483 3.48483C8.13127 3.33839 8.36871 3.33839 8.51516 3.48483L16.7652 11.7348C16.8355 11.8052 16.875 11.9005 16.875 12Z" fill="#FCFBF8"/>
      )}
    </svg>
  );
}
