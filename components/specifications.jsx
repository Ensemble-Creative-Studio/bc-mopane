"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { urlForImage } from "../sanity/lib/image";
import tosca from "../public/instruments/tosca90.png";
import legende from "../public/instruments/legende90.png";
import r13 from "../public/instruments/R1390.png";

function ThumbnailPlugin(mainRef, detailsRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
          if (detailsRef.current) detailsRef.current.moveToIdx(idx); // also move the details slides
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
        if (detailsRef.current) detailsRef.current.moveToIdx(next); // also move the details slides
      });
    });
  };
}

export default function Specifications({ specificationData }) {
  const [detailsOpacities, setDetailsOpacities] = useState([]);
  const [detailsDisplay, setDetailsDisplay] = useState([]);
  const [opacities, setOpacities] = React.useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [details, setDetails] = useState(null);
  const [sliderRefHorizontal, instanceRef] = useKeenSlider({
    initial: 0,
    detailsChanged(s) {
      setDetails(s.track.details);
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  const [detailsSliderRef, detailsInstanceRef] = useKeenSlider({
    initial: 0,
    slides: 3,
    drag: false,
    detailsChanged(s) {
      const newOpacities = s.track.details.slides.map((slide) => slide.portion);
      setDetailsOpacities(newOpacities);
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      const newOpacities = slider.track.details.slides.map(
        (slide) => slide.portion
      );
      setDetailsOpacities(newOpacities);
    },
    created() {
      setLoaded(true);
    },
  });
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: "auto",
      },
    },
    [ThumbnailPlugin(instanceRef, detailsInstanceRef)]
  );

  function scaleStyle(idx) {
    if (!details || !details.slides[idx]) return {};
    const slide = details.slides[idx];
    const scale_size = 0.7;
    const scale = 1 - (scale_size - scale_size * slide.portion);
    return {
      transform: `scale(${scale})`,
      WebkitTransform: `scale(${scale})`,
    };
  }

  function displayStyle(idx) {
    if (!details || !details.slides[idx]) return {};
    const slide = details.slides[idx];
    const portion = slide.portion;
    return {
      opacity: portion,
      display: portion === 0 ? "none" : "block",
      // height: portion === 0 ? '0%' : '100%'
    };
  }
  const contentRefs = useRef([]);

  // Existing renderText function
  const renderText = (textArray, index) => {
    if (!textArray) {
      return null; // or return an appropriate fallback JSX
    }

    return (
      <div
        className="flex flex-col justify-center pb-4"
        ref={(ref) => (contentRefs.current[index] = ref)}
        key={index}
      >
        {textArray.map((textItem, i) => {
          if (
            textItem._type === "block" &&
            textItem.children &&
            textItem.children.length > 0
          ) {
            return textItem.children.map((child, j) => {
              if (child._type === "span") {
                if (child.marks && child.marks.includes("strong")) {
                  return (
                    <span className="animatedOpacity font" key={child._key}>
                      {child.text}
                    </span>
                  );
                }
                return (
                  <p
                    className="text-center text-14px text-soft-black pb-1"
                    key={child._key}
                  >
                    {child.text}
                  </p>
                );
              }
              return null;
            });
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="h-auto bg-opacity-white ">
      <div className=" padding-vh-mobile items-center justify-between  ">
        <h3 className="text-28px text-soft-black-text text-center px-6 font-extralight md:px-36 md:text-64px max-width-desktop md:m-auto ">
          {specificationData[0].titre}
        </h3>

        <div className="navigation-wrapper pb-10 md:px-72 2xl:px-96 md:pb-16">
          <div ref={sliderRefHorizontal} className="keen-slider ">
            <div className="keen-slider__slide px-6 number-slide1">
              <div style={scaleStyle(0)}>
                <Image
                  className="object-cover h-full w-full"
                  src={tosca}
                  alt="Instruments"
                  width={960}
                />
              </div>
            </div>
            <div className="keen-slider__slide px-6 number-slide2">
              <div style={scaleStyle(1)}>
                <Image
                  className="object-cover h-full w-full"
                  src={legende}
                  alt="Instruments"
                  width={960}
                />
              </div>
            </div>
            <div className="keen-slider__slide px-6 number-slide3">
              <div style={scaleStyle(2)}>
                <Image
                  className="object-cover h-full w-full"
                  src={r13}
                  alt="Instruments"
                  width={960}
                />
              </div>
            </div>
          </div>

          <div
            ref={thumbnailRef}
            className="keen-slider thumbnail text-21px text-soft-black  px-6 gap-6 justify-center md:text-32px md:font-normal md:gap-28"
          >
            <div className="keen-slider__slide number-slide1 uppercase flex justify-center width-auto opacity-30 cursor-pointer">
              <p>TOSCA</p>
            </div>
            <div className="keen-slider__slide number-slide2 uppercase flex justify-center width-auto opacity-30 cursor-pointer">
              <p>Légende</p>
            </div>
            <div className="keen-slider__slide number-slide3 uppercase flex justify-center width-auto opacity-30 cursor-pointer">
              <p>R13</p>
            </div>
          </div>
        </div>
        <div
          ref={detailsSliderRef}
          className="fader relative grid details-bloc"
        >
          <div
            style={displayStyle(0)}
            className="techniques px-6  fader__slide number-slide1"
          >
            {/* Slice the array to the first two elements or all depending on showMore */}
            {(showMore
              ? specificationData[0].specificationsTosca
              : specificationData[0].specificationsTosca.slice(0, 2)
            ).map((specification, index) => (
              <div
                className="details-technique md:pb-6"
                key={specification._key}
              >
                <p className=" text-mobile-10px-spec uppercase text-spec-black text-center pb-2 md:text-11px md:text-mid-grey md:pb-4">
                  {specification.titre}
                </p>
                {renderText(specification.text, index)}
              </div>
            ))}
            {/* Add button to toggle showMore state */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-14px text-mid-grey text-center"
              >
                {showMore
                  ? specificationData[0].moins
                  : specificationData[0].suite}{" "}
              </button>
            </div>
          </div>
          <div
            style={displayStyle(1)}
            className="techniques px-6 fader__slide number-slide2"
          >
            {/* Slice the array to the first two elements or all depending on showMore */}
            {(showMore
              ? specificationData[0].specificationsLegende
              : specificationData[0].specificationsLegende.slice(0, 2)
            ).map((specification, index) => (
              <div
                className="details-technique md:pb-6"
                key={specification._key}
              >
                <p className=" text-mobile-10px-spec uppercase text-spec-black text-center pb-2 md:text-11px md:text-mid-grey md:pb-4">
                  {specification.titre}
                </p>
                {renderText(specification.text, index)}
              </div>
            ))}
            {/* Add button to toggle showMore state */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-14px text-mid-grey text-center"
              >
                {showMore
                  ? specificationData[0].moins
                  : specificationData[0].suite}{" "}
              </button>
            </div>
          </div>
          <div
            style={displayStyle(2)}
            className="techniques px-6 fader__slide number-slide3"
          >
            {/* Slice the array to the first two elements or all depending on showMore */}
            {(showMore
              ? specificationData[0].specificationsR13
              : specificationData[0].specificationsR13.slice(0, 2)
            ).map((specification, index) => (
              <div
                className="details-technique md:pb-6"
                key={specification._key}
              >
                <p className=" text-mobile-10px-spec uppercase text-spec-black text-center pb-2 md:text-11px md:text-mid-grey md:pb-4">
                  {specification.titre}
                </p>
                {renderText(specification.text, index)}
              </div>
            ))}
            {/* Add button to toggle showMore state */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-14px text-mid-grey text-center"
              >
                {showMore
                  ? specificationData[0].moins
                  : specificationData[0].suite}{" "}
              </button>
            </div>
          </div>
        </div>
        <div className=" md:px-36 md:grid md:grid-cols-12 md:gap-12 ">
          <Link
            href={specificationData[0].buttonUrl}
            className="flex-1 mt-8  flex  mx-6 text-center h-20 bg-soft-black-text  items-center justify-center uppercase md:col-start-6 col-end-8"
          >
            <p className="text-12px text-soft-white ">
              {specificationData[0].button}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
