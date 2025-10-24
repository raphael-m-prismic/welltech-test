import { FC, JSX } from "react";
import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { SliceComponentProps } from "@prismicio/react";
import ArticleList from "./ArticleList";

export type TestProps = SliceComponentProps<Content.TestSlice> & {
  context?: {
    allArticles?: any[];
  };
};

const Test: FC<TestProps> = async ({ slice }) => {
  const client = createClient();
  const allArticles = await client.getAllByType("article");
  const allPlatforms = await client.getAllByType("platforms");
  const allTypes = await client.getAllByType("article_types");

  return (
    <ArticleList
      articles={allArticles}
      platforms={allPlatforms}
      articleTypes={allTypes}
      slice={slice}
    />
  );
};

export default Test;
