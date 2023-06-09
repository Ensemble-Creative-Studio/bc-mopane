// import Image from "next/image";
import Header from "../components/header";
import Overlay from "../components/overlay";
import Hero from "../components/hero";
import Edition from "../components/edition";
import Bois from "../components/bois";
import Son from "../components/son";
import Video from "../components/video360";
import Nuances from "../components/nuances";
import Specifications from "../components/specifications";
import Pedigre from "../components/pedigre";
import Showroom from "../components/showroom";
import Footer from "../components/footer";
import { AnimationProvider } from "../components/AnimationContext";
import { getHeader } from "../sanity/sanity-util";
import { getHero } from "../sanity/sanity-util";
import { getEdition } from "../sanity/sanity-util";
import { getBois } from "../sanity/sanity-util";
import { getSon } from "../sanity/sanity-util";
import { getVideo } from "../sanity/sanity-util";
import { getNuances } from "../sanity/sanity-util";
import { getSpecification } from "../sanity/sanity-util";
import { getPedigre } from "../sanity/sanity-util";
import { getShowroom } from "../sanity/sanity-util";
import { getOverlay } from "../sanity/sanity-util";
import { getFooter, getPage } from "../sanity/sanity-util"; // Assuming you have a function to fetch page data from Sanity

export default async function Home() {
  const lang = "fr"; // Set lang variable based on browser language, default to "fr" if not available
  const headerData = await getHeader();

  const heroData = await getHero();
  const editionData = await getEdition();
  const boisData = await getBois();
  const sonData = await getSon();
  const video360Data = await getVideo();
  const nuancesData = await getNuances();
  const specificationData = await getSpecification();
  // const pedigreData = await getPedigre();
  const showroomData = await getShowroom();
  const overlayData = await getOverlay();
  const footerData = await getFooter();

  // Get the pageFooters array from the footerData
  const pageData = await getPage();
  return (
    <div className="smooth-scroller" data-scroll-section>
      <AnimationProvider>
        <div className="relative z-20 mb-52 md:mb-40">
          <div className="background"></div>
          <Header headerData={headerData} />
          <Overlay overlayData={overlayData} />
          <Hero heroData={heroData} />
          <Edition editionData={editionData} />
          <Bois boisData={boisData} />
          <Son sonData={sonData} />
          <Video video360Data={video360Data} />
          <Nuances nuancesData={nuancesData} />
          <Specifications specificationData={specificationData} />
          {/* <Pedigre pedigreData={pedigreData}></Pedigre> */}
          <Showroom showroomData={showroomData}></Showroom>
        </div>
        <Footer footerData={footerData} pageData={pageData} />
      </AnimationProvider>
    </div>
  );
}
