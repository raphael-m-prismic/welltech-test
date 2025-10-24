"use client"

import React, { useState } from 'react'
import { ArticleDocument, PlatformsDocument } from '../../../prismicio-types';
import { asText, Content } from '@prismicio/client';

export default function ArticleList({ articles, platforms, articleTypes, slice }: { 
    articles: ArticleDocument[]; 
    platforms: PlatformsDocument[]; 
    articleTypes: ArticleDocument[]; 
    slice: Content.TestSlice 
}) {

    const [activePlatform, setActivePlatform] = useState<string>("web");



    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            {articleTypes.map((articleType) => (
                <div>
                    <h2>
                        {asText(articleType.data.title)}
                    </h2>
                    <ul>
                        {articles.map((article) => {

                            const articleType = article.data.article_type.data.title
                            console.log(articleType)

                            return (
                                <li key={article.id}></li>
                            )
                        })}
                    </ul>
                </div>
            ))}
        </section>
    )
}
