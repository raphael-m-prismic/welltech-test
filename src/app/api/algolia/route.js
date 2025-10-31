import algoliasearch from "algoliasearch";
import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client";

// Transform Prismic slices to indexable text for Algolia
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
  // Check environment variables exist
  if (!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_ADMIN_API_KEY) {
    return new Response("Algolia credentials are not set", { status: 500 });
  }

  try {
    console.log("1️⃣ Start POST");

    // Init Prismic et Algolia clients
    const prismicClient = createClient();
    const algoliaClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_ADMIN_API_KEY
    );
    console.log("2️⃣ Algolia Client created");

    // Get 'articles' index or create it
    const index = algoliaClient.initIndex("articles");
    console.log("3️⃣ Index retrieved");

    // Retrieve all articles from Prismic
    const articles = await prismicClient.getAllByType("article");
    console.log(`4️⃣ ${articles.length} articles retrieved from Prismic`);

    // Transform articles into objects in Algolia
    const articleRecords = articles.map((post) => ({
      objectID: post.id,
      title: asText(post.data.title),
      slug: post.uid,
      description: post.data.description[0].text,
      text: transformSlices(post.data.slices),
    }));

    console.log("5️⃣ Articles transformed for Algolia");

    // Send objects to the index in Algolia
    await index.saveObjects(articleRecords);
    console.log("6️⃣ Articles sent to Algolia");

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
