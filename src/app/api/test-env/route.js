export async function GET() {
  return new Response(JSON.stringify({
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID || null,
    ALGOLIA_ADMIN_API_KEY: process.env.ALGOLIA_ADMIN_API_KEY ? "SET" : null,
  }), { status: 200 });
}