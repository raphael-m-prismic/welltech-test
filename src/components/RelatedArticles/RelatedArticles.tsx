import React from 'react'
import {
  ArticleDocument,
  ArticleTypesDocument,
  PlatformsDocument,
} from "../../../prismicio-types";
import { asText, isFilled } from '@prismicio/client';
import Container from "@/components/Container/Container";

import styles from "./related-articles.module.css";
import { PrismicNextLink } from '@prismicio/next';


type RelatedArticlesProps = {
    page: ArticleDocument;
    articles: ArticleDocument[];
    platforms: PlatformsDocument[];
    articleTypes: ArticleTypesDocument[];
}

export default function RelatedArticles({page, articles, platforms, articleTypes}:RelatedArticlesProps) {
    return (
    <div>
        <Container>
            <h3 className={styles.title}>Articles in this section</h3>
            <div className={styles.articles}>
                {articles.map((article) => {
                    if (
                        !isFilled.contentRelationship(article.data.article_type) ||
                        !isFilled.contentRelationship(article.data.platform) ||
                        article.data.platform.uid !== page.data.platform.uid ||
                        article.data.article_type.uid !== page.data.article_type.uid 
                        // article.uid === page.uid
                    ) {
                        return null;
                    } 
                    
                    return (
                        <a key={article.id} href={article.url!} className={`${styles.article_link} ${article.uid === page.uid ? styles.active : ""}`}>
                            {/* <PrismicNextLink field={article!}> */}
                            {asText(article.data.title)}
                            {/* </PrismicNextLink> */}
                        </a>
                    )
                })}  
            </div>
        </Container>
    </div>
  )
}
