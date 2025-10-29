// // ./app/api/algolia/route.js

// import algoliasearch from "algoliasearch";
// import { createClient } from "@/prismicio";
// import { asText } from "@prismicio/client";

// // Function that takes Prismic slices and transforms them into searchable text for Algolia.
// const transformSlices = (slices) => {
//   const textStrings = slices.map((slice) => {
//     if (slice.slice_type === "text") {
//       return asText(slice.primary.text);
//     }
//     if (slice.slice_type === "image") {
//       return asText(slice.primary.caption);
//     }
//     if (slice.slice_type === "quote") {
//       return asText(slice.primary.quote) + " " + slice.primary.source;
//     }
//   });

//   return textStrings.join(" "); // Join items into a single string
// };

// export async function POST(request) {
//   // Check if Algolia credentials exist, return error if not
//   if (
//     !process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID ||
//     !process.env.ALGOLIA_ADMIN_KEY
//   ) {
//     return new Response("Algolia credentials are not set", {
//       status: 500,
//     });
//   }

//   try {
//     // Instantiate Prismic and Algolia clients
//     const prismicClient = createClient();
//     const algoliaClient = algoliasearch(
//       process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
//       process.env.ALGOLIA_ADMIN_KEY
//     );

//     // Initialize an Algolia index named 'blog'
//     const index = algoliaClient.initIndex("articles");

//     // Get all articles from Prismic
//     const articles = await prismicClient.getAllByType("article");

//     // Map articles to Algolia records
//     const articleRecords = articles.map((post) => ({
//       objectID: post.id, // Unique identifier in algolia
//       title: asText(post.data.title), // Post title
//       slug: post.uid, // Post URL slug
//       image: post.data.featuredImage, // Post featured image
//       text: transformSlices(post.data.slices), // Post content transformed to search text
//     }));

//     // Index records to Algolia
//     await index.saveObjects(articleRecords);

//     // Return success response if the process completes without any issue
//     return new Response(
//       "Content successfully synchronized with Algolia search",
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     // Log the error and return error response if any error occurs
//     console.error(error);
//     return new Response("An error occurred while synchronizing content", {
//       status: 500,
//     });
//   }
// }

// import algoliasearch from "algoliasearch";

// export async function POST() {
//   try {
//     console.log("1️⃣ Début POST");

//     const client = algoliasearch(
//       process.env.ALGOLIA_APP_ID,
//       process.env.ALGOLIA_ADMIN_KEY
//     );
//     console.log("2️⃣ Client Algolia créé");

//     const index = client.initIndex("test_index");
//     console.log("3️⃣ Index récupéré");

//     return new Response("✅ Route Algolia prête (v4 stable)", { status: 200 });
//   } catch (err) {
//     console.error("❌ Erreur POST :", err);
//     return new Response("❌ Erreur détectée : " + err.message, { status: 500 });
//   }
// }


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
  if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || !process.env.ALGOLIA_ADMIN_KEY) {
    return new Response("Algolia credentials are not set", { status: 500 });
  }

  try {
    console.log("1️⃣ Début POST");

    // Init clients Prismic et Algolia
    const prismicClient = createClient();
    const algoliaClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_ADMIN_KEY
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
