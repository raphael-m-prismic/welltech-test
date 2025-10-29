"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ArticleHit = {
  objectID: string;
  title: string;
  slug: string;
  image?: { url: string; alt?: string };
  text: string;
};

interface ResultsProps {
  title?: string;
}

export default function Results({ title }: ResultsProps) {
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
    <div className="max-w-3xl mx-auto p-4">
      {/* Hero */}
      {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}

      {/* Résultats Algolia */}
      {query && (
        <div className="mt-6">
          {loading && <p>Loading...</p>}
          {!loading && hits.length === 0 && <p>No results found.</p>}
          <ul className="space-y-4">
            {hits.map((hit) => (
              <li key={hit.objectID} className="border p-4 rounded-lg flex gap-4">
                {hit.image?.url && (
                  <img
                    src={hit.image.url}
                    alt={hit.image.alt || ""}
                    className="w-24 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <a href={`/articles/${hit.slug}`} className="text-blue-600 font-semibold">
                    {hit.title}
                  </a>
                  <p className="text-gray-600">{hit.text.slice(0, 150)}...</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
