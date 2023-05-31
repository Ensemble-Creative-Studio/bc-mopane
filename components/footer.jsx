import Link from "next/link";
import { getFooter, getPage } from "../sanity/sanity-util"; // Assuming you have a function to fetch page data from Sanity

export default async function Footer() {
  const footerData = await getFooter();

  // Get the pageFooters array from the footerData
  const pageData = await getPage();

  // Fetch page data for each referenced page


  return (
    <div className="bg-soft-black ">
      <div className="page__link">
        {/* Render each page with its name and URL */}
        {pageData.map((page) => (
          <div key={page._id}>
            <Link className="text-mid-grey text-14px" href={page.slug.current}>
            {page.titre}
            </Link>
          </div>
        ))}
      </div>
      <p className="text-mid-grey text-14px">© 2023 Groupe Buffet Crampon</p>
    </div>
  );
}
