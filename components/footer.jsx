import Link from "next/link";
import { getFooter, getPage } from "../sanity/sanity-util"; // Assuming you have a function to fetch page data from Sanity

export default async function Footer() {
  const footerData = await getFooter();

  // Get the pageFooters array from the footerData
  const pageData = await getPage();

  // Fetch page data for each referenced page


  return (
    <div className="bg-soft-black w-full flex flex-col justify-center h-52 fixed bottom-0 z-10">
      <div className="page__link flex flex-col justify-center">
        {/* Render each page with its name and URL */}
        {pageData.map((page) => (
          <div className="text-center pb-4 " key={page._id}>
            <Link className="text-mid-grey text-14px  " href={page.slug.current}>
            {page.titre}
            </Link>
          </div>
        ))}
      </div>
      <p className="text-mid-grey text-14px text-center pt-8">© 2023 Groupe Buffet Crampon</p>
    </div>
  );
}
