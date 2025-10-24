import React from 'react'
import {
  ArticleDocument,
  ArticleTypesDocument,
  PlatformsDocument,
} from "../../prismicio-types";
import { asText, isFilled } from '@prismicio/client';

type RelatedArticlesProps = {
    page: ArticleDocument;
    articles: ArticleDocument[];
    platforms: PlatformsDocument[];
    articleTypes: ArticleTypesDocument[];
}

export default function RelatedArticles({page, articles, platforms, articleTypes}:RelatedArticlesProps) {
    console.log(page.data.platform)
    
    console.log("---")
    return (
    <div>
        <div>RelatedArticles</div>
        {articles.map((article) => {
            if (
                !isFilled.contentRelationship(article.data.article_type) ||
                !isFilled.contentRelationship(article.data.platform) ||
                article.data.platform.uid !== page.data.platform.uid ||
                article.data.article_type.uid !== page.data.article_type.uid ||
                article.uid === page.uid
            ) {
                return null;
            } 


            return (
                <li key={article.id}>
                    {asText(article.data.title)}
                </li>
            )
        })}   
    </div>
  )
}
