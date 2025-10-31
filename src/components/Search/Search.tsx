"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./search.module.css"

type ArticleHit = {
  objectID: string;
  title: string;
  slug: string;
  description: string,
  text: string;
};

export function Search() {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<ArticleHit[]>([]);
  const router = useRouter();

  const searchAlgolia = async (q: string) => {
    if (!q) {
      setHits([]);
      return;
    }

    try {
      const res = await fetch(
        `https://${process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/articles/query`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Algolia-API-Key": process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!,
            "X-Algolia-Application-Id": process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
          },
          body: JSON.stringify({ query: q }),
        }
      );

      const data = await res.json();
      setHits(data.hits);
    } catch (err) {
      console.error("Algolia search error:", err);
    } 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      router.push(`/search_results/?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={styles.navbar_container}>
      <div className={styles.search_bar}>
        <input
          className={styles.input}
          type="search"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            searchAlgolia(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />

        {hits.length > 0 && (
          <div className={styles.hits}>
            {hits.map((hit) => (
              <a key={hit.objectID} href={`/articles/${hit.slug}`} className={styles.hit}>
                <span className={styles.title}>{hit.title}</span>
                <span className={styles.desc}>{hit.description}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
