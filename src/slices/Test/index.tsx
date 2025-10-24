

import { FC, JSX } from "react";
import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";

import Container from "@/components/Container";

import styles from "./index.module.css";

import Web from "@/components/icons/Web";
import Android from "@/components/icons/Android";
import Ios from "@/components/icons/Ios";
import { PrismicNextLink } from "@prismicio/next";
import ArticleList from "./ArticleList";

const platformIcons: Record<string, JSX.Element> = {
  web: <Web />,
  android: <Android />,
  ios: <Ios />,
};

export type TestProps = SliceComponentProps<Content.TestSlice> & {
  context?: {
    allArticles?: any[];
  };
};

const platforms = ["web", "android", "ios"];
const articleTypes = ["first-steps", "tutorials", "other"];

const Test: FC<TestProps> =  async ({ slice }) => {
  const client = createClient();
  const allArticles = await client.getAllByType("article");
  const allPlatforms = await client.getAllByType("platforms");
  const allTypes = await client.getAllByType("article_types");


  return (
    <ArticleList articles={allArticles} platforms={allPlatforms}  articleTypes={allTypes} slice={slice}/>
  );
};

export default Test;
