import React from 'react'
import {
  ArticleDocument,
  ArticleTypesDocument,
  PlatformsDocument,
} from "../../../prismicio-types";
import { asText, isFilled } from '@prismicio/client';
import Container from "@/components/Container/Container";

import styles from "./related-articles.module.css";


type RelatedArticlesProps = {
    page: ArticleDocument;
    articles: ArticleDocument[];
    platforms: PlatformsDocument[];
    articleTypes: ArticleTypesDocument[];
}

export default function RelatedArticles({page, articles}:RelatedArticlesProps) {
    return (
    <div>
        <Container>
            <h3 className={styles.title}>Articles in this section</h3>
            <div className={styles.articles}>
                {articles.map((article) => {
                    if (
                        !isFilled.contentRelationship(article.data.article_type) ||
                        !isFilled.contentRelationship(article.data.platform) ||
                        !isFilled.contentRelationship(page.data.platform) ||
                        !isFilled.contentRelationship(page.data.article_type) ||
                        article.data.platform.id !== page.data.platform.id ||
                        article.data.article_type.id !== page.data.article_type.id
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
