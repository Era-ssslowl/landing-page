import { put } from "@vercel/blob";

export const config = {
  runtime: "edge", // Blob requires Edge Runtime
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { filename, contentType } = await req.json();

  // Generate a direct upload URL
  const { url, uploadUrl } = await put(filename, "", {
    access: "public",
    contentType,
    multipart: true,
  });

  return new Response(JSON.stringify({ url, uploadUrl }), {
    headers: { "Content-Type": "application/json" },
  });
}
