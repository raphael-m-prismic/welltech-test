"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ArticleHit = {
  objectID: string;
  title: string;
  slug: string;
  image?: { url: string; alt?: string };
  text: string;
};

export function Search() {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<ArticleHit[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchAlgolia = async (q: string) => {
    if (!q) {
      setHits([]);
      return;
    }

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
          body: JSON.stringify({ query: q }),
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      router.push(`/search_results/?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto relative">
      <input
        type="search"
        className="w-full border rounded-full px-4 py-2 mb-2"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          searchAlgolia(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />

      {loading && <div className="p-2">Loading...</div>}

      {hits.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border rounded-lg shadow-lg">
          {hits.map((hit) => (
            <li key={hit.objectID} className="p-2 border-b last:border-b-0">
              <a href={`/articles/${hit.slug}`} className="flex items-center gap-2 text-blue-600">
                {hit.image?.url && (
                  <img src={hit.image.url} alt={hit.image.alt || ""} className="w-16 h-10 object-cover rounded" />
                )}
                <span>{hit.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
