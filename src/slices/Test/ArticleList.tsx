"use client";

import React, { useState } from "react";
import {
  ArticleDocument,
  ArticleTypesDocument,
  PlatformsDocument,
} from "../../../prismicio-types";
import { asText, Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

export default function ArticleList({
  articles,
  platforms,
  articleTypes,
  slice,
}: {
  articles: ArticleDocument[];
  platforms: PlatformsDocument[];
  articleTypes: ArticleTypesDocument[];
  slice: Content.TestSlice;
}) {
  const [activePlatform, setActivePlatform] = useState<string>("web");

  const filteredArticleTypes = articleTypes.filter((articleType) => {
    return articles.some(
      (article) =>
        isFilled.contentRelationship(article.data.article_type) &&
        isFilled.contentRelationship(article.data.platform) &&
        article.data.platform.uid === activePlatform &&
        article.data.article_type.uid === articleType.uid
    );
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        {platforms.map((platform) => (
          <button
            style={{
              padding: "1rem",
              border: "2px solid #fff",
              backgroundColor:
                activePlatform === platform.uid ? "#63656A" : "#36373A",
              cursor: "pointer",
            }}
            key={platform.id}
            onClick={() => setActivePlatform(platform.uid)}
          >
            {asText(platform.data.title)}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        {filteredArticleTypes.map((articleType) => (
          <div
            key={articleType.id}
            style={{ border: "2px solid #fff", padding: "1rem" }}
          >
            <h2>{asText(articleType.data.title)}</h2>
            <ul>
              {articles.map((article) => {
                if (
                  !isFilled.contentRelationship(article.data.article_type) ||
                  !isFilled.contentRelationship(article.data.platform) ||
                  article.data.platform.uid !== activePlatform ||
                  article.data.article_type.uid !== articleType.uid
                ) {
                  return null;
                }

                return (
                  <li key={article.id}>
                    <PrismicNextLink href={`/articles/${article.uid}`}>
                      {asText(article.data.title)}
                    </PrismicNextLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
