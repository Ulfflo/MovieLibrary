import { SitemapStream, streamToPromise } from "sitemap"; 
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url"; 

const BASE_URL = "https://movie-library-roan-three.vercel.app/";

// Statiska URL:er
const staticPaths = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/favorites", changefreq: "weekly", priority: 0.8 },
];

// Funktion för att hämta dynamiska sidor
async function fetchDynamicPaths() {
  try {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWEzYmM1YTQ5MzFlYjA0ZDVlMjA5ODEwMzRiMDVjOSIsIm5iZiI6MTcyODM3OTUxMi45Mzk1NTcsInN1YiI6IjY3MDRkN2MwNWMwMGEyZDQ0ZWMwMDgwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qLp5JPdCrw9SQMZElEecH13adx0Uq4nfYf9Qc7fKOkQ",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results.map((movie) => ({
      url: `/movies/${movie.id}`, // Dynamisk URL baserad på film-ID
      changefreq: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching dynamic paths:", error);
    return [];
  }
}

// Hämta nuvarande filens namn och konvertera till en filväg
const __filename = fileURLToPath(import.meta.url); // Konvertera modulens URL till en filväg
const __dirname = path.dirname(__filename); // Hämta katalogen där filen finns

(async () => {
  // Skapa en sitemap-ström med bas-URL som grund
  const sitemapStream = new SitemapStream({ hostname: BASE_URL });
  // Skapa en skrivström till sitemap.xml-filen i public-katalogen
  const writeStream = createWriteStream(
    path.join(__dirname, "../..", "public", "sitemap.xml")
  );

  // Koppla ihop sitemap-strömmen med skrivströmmen (så att datan skrivs till fil)
  sitemapStream.pipe(writeStream);

  // Skriv statiska URL:er till sitemap
  staticPaths.forEach((path) => sitemapStream.write(path));

  // Hämta dynamiska sidor och skriv dem till sitemap
  const dynamicPaths = await fetchDynamicPaths();
  dynamicPaths.forEach((path) => sitemapStream.write(path));

  // Stäng strömmen när alla URL:er har skrivits
  sitemapStream.end();

  // Vänta tills sitemap-strömmen är klar och löftet fullbordat
  await streamToPromise(sitemapStream);
  console.log("Sitemap generated successfully with dynamic paths!");
})();