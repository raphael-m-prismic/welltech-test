// ./app/api/algolia/route.js
import algoliasearch from "algoliasearch";
import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client";

// Transforme les slices Prismic en texte indexable pour Algolia
const transformSlices = (slices) => {
  const textStrings = slices.map((slice) => {
    if (!slice) return "";
    switch (slice.slice_type) {
      case "text":
        return asText(slice.primary.text);
      case "image":
        return asText(slice.primary.caption);
      case "quote":
        return `${asText(slice.primary.quote)} ${slice.primary.source || ""}`;
      default:
        return "";
    }
  });

  return textStrings.join(" ");
};

export async function POST() {
  // Vérifie que les variables d'environnement sont présentes

  console.log("ALGOLIA_APP_ID:", process.env.ALGOLIA_APP_ID);
  console.log("ALGOLIA_ADMIN_API_KEY:", process.env.ALGOLIA_ADMIN_API_KEY ? "SET" : "MISSING");

  if (!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_ADMIN_API_KEY) {
    return new Response("Algolia credentials are not set", { status: 500 });
  }

  try {
    console.log("1️⃣ Début POST");

    // Init clients Prismic et Algolia
    const prismicClient = createClient();
    const algoliaClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_ADMIN_API_KEY
    );
    console.log("2️⃣ Client Algolia créé");

    // Récupère l'index 'articles' ou le crée si nécessaire
    const index = algoliaClient.initIndex("articles");
    console.log("3️⃣ Index récupéré");

    // Récupère tous les articles depuis Prismic
    const articles = await prismicClient.getAllByType("article");
    console.log(`4️⃣ ${articles.length} articles récupérés depuis Prismic`);

    // Transforme les articles en objets Algolia
    const articleRecords = articles.map((post) => ({
      objectID: post.id,
      title: asText(post.data.title),
      slug: post.uid,
      image: post.data.featuredImage,
      text: transformSlices(post.data.slices),
    }));

    console.log("5️⃣ Articles transformés pour Algolia");

    // Envoie les objets dans l'index Algolia
    await index.saveObjects(articleRecords);
    console.log("6️⃣ Articles envoyés à Algolia");

    return new Response(
      "Content successfully synchronized with Algolia search",
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Algolia sync error:", error);
    return new Response(
      "An error occurred while synchronizing content",
      { status: 500 }
    );
  }
}
