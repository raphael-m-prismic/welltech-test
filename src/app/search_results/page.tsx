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
