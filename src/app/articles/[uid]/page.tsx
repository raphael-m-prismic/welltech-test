import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

import Hero from "@/components/Hero/Hero";
import RelatedArticles from "@/components/RelatedArticles/RelatedArticles";

import styles from "./page.module.css";
import Container from "@/components/Container/Container";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("article", uid).catch(() => notFound());
  
  const allArticles = await client.getAllByType("article");
  const allPlatforms = await client.getAllByType("platforms");
  const allTypes = await client.getAllByType("article_types");

  return (
    <div className={styles.page}>
        <Hero title={page.data.title} description={page.data.description}></Hero>
        <Container>
          <div className={styles.page_content}>
            <RelatedArticles page={page} articles={allArticles} platforms={allPlatforms} articleTypes={allTypes}/>
            <div className={styles.article_content}>
              <SliceZone slices={page.data.slices} context={"article"} components={components} />
            </div>
          </div>
        </Container>
    </div>
)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("article", uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("article");

  return pages.map((page) => ({ uid: page.uid }));
}