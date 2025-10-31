"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "../Container/Container";

import styles from "./results.module.css"

type ArticleHit = {
  objectID: string;
  title: string;
  slug: string;
  description: string,
  text: string;
};

export default function Results() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  console.log(query)

  const [hits, setHits] = useState<ArticleHit[]>([]);
  const [loading, setLoading] = useState(false);

  // Algolia search côté client
  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
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
            body: JSON.stringify({ query }),
          }
        );
        const data = await res.json();
        setHits(data.hits);
      } catch (err) {
        console.error("Algolia search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <Container>
        {/* Résultats Algolia */}
        {query && (
          <div className={styles.results} >
            {loading && <p>Loading...</p>}
            {!loading && hits.length === 0 && <p>No results found.</p>}
              {hits.map((hit) => (
                <a key={hit.objectID} href={`/articles/${hit.slug}`} className={styles.hit}>
                  <span className={styles.title}>{hit.title}</span>
                  <span className={styles.desc}>{hit.description}</span>
                </a>
              ))}
          </div>
        )}
    </Container>
  );
}
