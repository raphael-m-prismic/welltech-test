"use client";

import { FC, JSX, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";

import Container from "@/components/Container";

import styles from "./index.module.css";

import Web from "@/components/icons/Web";
import Android from "@/components/icons/Android";
import Ios from "@/components/icons/Ios";
import { PrismicNextLink } from "@prismicio/next";

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

const Test: FC<TestProps> = ({ slice, context }) => {
  const allArticles = context?.allArticles ?? [];
  const [activePlatform, setActivePlatform] = useState<string>("web");

  const categorizedArticles: Record<string, Record<string, any[]>> = {};

  for (const platform of platforms) {
    categorizedArticles[platform] = {};
    for (const type of articleTypes) {
      categorizedArticles[platform][type] = allArticles.filter(
        (article) =>
          article.tags.includes(platform) && article.tags.includes(type)
      );
    }
  }

  // Check if the selected platform has articles
  const activePlatformData = categorizedArticles[activePlatform];
  const hasArticles = Object.values(activePlatformData).some(
    (articles) => articles.length > 0
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        <div className={styles.platform_tabs}>
          {/* Tabs */}
          <div className={styles.tabs}>
            {/* Title */}
            <div className={styles.title}>
              <PrismicRichText field={slice.primary.title} />
            </div>
            {/* Platforms */}
            <div className={styles.platforms}>
              {platforms.map((platform) => {
                // Check if there are articles for this platform
                const hasArticlesForPlatform = Object.values(
                  categorizedArticles[platform]
                ).some((articles) => articles.length > 0);
                if (!hasArticlesForPlatform) return null;

                return (
                  <button
                    key={platform}
                    onClick={() => setActivePlatform(platform)}
                    className={`${styles.platform_button} ${ activePlatform === platform ? styles.active : ""}`}
                  >
                    <div className={styles.icon}>{platformIcons[platform]}</div>
                    <span className={styles.text}>{platform}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          {hasArticles ? (
            <div className={styles.articles}>
              {Object.entries(activePlatformData).map(([type, articles]) =>
                articles.length > 0 ? (
                  <div key={type} className={styles.articles_section}>
                    <h3 className={styles.type_title}>
                      {type.replace("-", " ")}
                    </h3>
                    <div className={styles.articles_list}>
                      {articles.map((article) => (
                        <div key={article.id} className={styles.article}>
                          <PrismicNextLink field={article} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <PrismicText field={article.data.title} />
                          </PrismicNextLink>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <p>
              No articles available for this platform.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Test;
