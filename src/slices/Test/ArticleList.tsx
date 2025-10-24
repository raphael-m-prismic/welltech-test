    "use client";

    import React, { useState } from "react";
    import {
    ArticleDocument,
    ArticleTypesDocument,
    PlatformsDocument,
    } from "../../../prismicio-types";
    import { asText, Content, isFilled } from "@prismicio/client";
    import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

    import styles from "./index.module.css"
import Container from "@/components/Container";

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
            // .filter creates a shallow copy of a portion of articlesTypes array, filtered down to just the elements from the given array that pass the test implemented by the provided function: here, we test if there are articles are associated with each article type
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
                <Container>
                    <div className={styles.platform_tabs}>

                        <div className={styles.tabs}>

                            <h2 className={styles.title}>Choose your platform</h2>

                            <div className={styles.platforms}>
                                {platforms.map((platform) => (
                                <button
                                    className={`${styles.platform_button} ${platform.uid === activePlatform ? styles.active : ""}`}
                                    key={platform.id}
                                    onClick={() => setActivePlatform(platform.uid)}
                                >
                                    <PrismicNextImage field={platform.data.icon} width={44} height={44} alt=""/>
                                    <p className={styles.platform_name}>
                                        {asText(platform.data.title)}
                                    </p>
                                </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.articles}>
                            {filteredArticleTypes.map((articleType) => (
                            <div
                                key={articleType.id}
                                className={styles.articles_section}
                            >
                                <h2 className={styles.type_title}>{asText(articleType.data.title)}</h2>

                                <div className={styles.articles_list}>
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
                                    <div key={article.id}>
                                        <PrismicNextLink href={`/articles/${article.uid}`} className={styles.article}>
                                            {asText(article.data.title)}
                                        </PrismicNextLink>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        );
    }
