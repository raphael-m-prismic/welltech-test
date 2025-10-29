// import { type Metadata } from "next";
// import { notFound } from "next/navigation";
// import { asImageSrc } from "@prismicio/client";
// import { SliceZone } from "@prismicio/react";

// import { createClient } from "@/prismicio";
// import { components } from "@/slices";

// export default async function Page() {
//   const client = createClient();
//   const page = await client.getSingle("search_results").catch(() => notFound());

//   return <SliceZone slices={page.data.slices} components={components} />;
// }

// export async function generateMetadata(): Promise<Metadata> {
//   const client = createClient();
//   const page = await client.getSingle("search_results").catch(() => notFound());

//   return {
//     title: page.data.meta_title,
//     description: page.data.meta_description,
//     openGraph: {
//       images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
//     },
//   };
// }

// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { SliceZone } from "@prismicio/react";
// import { asImageSrc } from "@prismicio/client";
// import { createClient } from "@/prismicio";
// import { components } from "@/slices";


// type ArticleHit = {
//   objectID: string;
//   title: string;
//   slug: string;
//   image?: { url: string; alt?: string };
//   text: string;
// };

// interface PageProps {
//   slices: any[];
// }

// export default function SearchResultsPage({ slices }: PageProps) {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("query") || "";

//   const [hits, setHits] = useState<ArticleHit[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Algolia search
//   useEffect(() => {
//     if (!query) return;

//     const fetchResults = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `https://${process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/articles/query`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "X-Algolia-API-Key": process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!,
//               "X-Algolia-Application-Id": process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
//             },
//             body: JSON.stringify({ query }),
//           }
//         );
//         const data = await res.json();
//         setHits(data.hits);
//       } catch (err) {
//         console.error("Algolia search error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, [query]);

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">
//         {query ? `Search results for "${query}"` : "Search page"}
//       </h1>

//       {/* Contenu Prismic */}
//       <SliceZone slices={slices} components={components} />

//       {/* Résultats Algolia */}
//       {query && (
//         <div className="mt-6">
//           {loading && <p>Loading...</p>}
//           {!loading && hits.length === 0 && <p>No results found.</p>}
//           <ul className="space-y-4">
//             {hits.map((hit) => (
//               <li key={hit.objectID} className="border p-4 rounded-lg flex gap-4">
//                 {hit.image?.url && (
//                   <img
//                     src={hit.image.url}
//                     alt={hit.image.alt || ""}
//                     className="w-24 h-16 object-cover rounded"
//                   />
//                 )}
//                 <div>
//                   <a href={`/articles/${hit.slug}`} className="text-blue-600 font-semibold">
//                     {hit.title}
//                   </a>
//                   <p className="text-gray-600">{hit.text.slice(0, 150)}...</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, asText } from "@prismicio/client";
import { Suspense } from "react"; 

import { createClient } from "@/prismicio";
// import { components } from "@/slices";
import Results from "@/components/Results/Results";
import { SliceZone } from "@prismicio/react";


export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("search_results").catch(() => notFound());

  // ici tu peux passer toutes les données que tu veux
  const title = page.data.title;
  const slices = page.data.slices;

  return (
    <div>
         <Suspense fallback={<div>Loading search results...</div>}>
            <Results title={asText(title)}/>
        </Suspense>
        <SliceZone slices={slices} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("search_results").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
