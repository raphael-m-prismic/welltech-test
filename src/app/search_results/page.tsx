import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { Suspense } from "react"; 

import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";

import Results from "@/components/Results/Results";
import Hero from "@/components/Hero/Hero";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("search_results").catch(() => notFound());

  const title = page.data.title;
  const slices = page.data.slices;

  return (
    <div>
        <Hero title={title} description={null}/>
         <Suspense fallback={<div>Loading search results...</div>}>
            <Results/>
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
