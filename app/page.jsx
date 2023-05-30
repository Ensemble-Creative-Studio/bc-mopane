"use client";

import Image from "next/image";
import Header from "../components/header";
import Hero from "../components/hero";
import Edition from "../components/edition";
import Bois from "../components/bois";
import Son from "../components/son"
import Video from "../components/video360";
import Nuances from "../components/nuances";
import Specifications from "../components/specifications";


import { getHero } from "../sanity/sanity-util";
import { getEdition } from "../sanity/sanity-util";
import { getBois } from "../sanity/sanity-util";
import { getSon } from "../sanity/sanity-util";
import { getVideo } from "../sanity/sanity-util";
import { getNuances } from "../sanity/sanity-util";
import { getSpecification } from "../sanity/sanity-util";
export default async function Home() {

  // const lang = "fr"; // Set lang variable based on browser language, default to "fr" if not available
  const heroData = await getHero();
  const editionData = await getEdition();
  const boisData = await getBois();
  const sonData = await getSon();
  const video360Data = await getVideo();
  const nuancesData = await getNuances();
  const specificationData = await getSpecification();

  return (
    <div >
      <Header />
      <Hero heroData={heroData} />
      <Edition editionData={editionData} />
      <Bois boisData={boisData} />
      <Son sonData={sonData} />
      <Video video360Data={video360Data} />
      <Nuances nuancesData={nuancesData} />
      <Specifications specificationData={specificationData} />
    </div>
  );
}
