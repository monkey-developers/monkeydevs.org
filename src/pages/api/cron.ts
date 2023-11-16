import { createClient } from "@vercel/kv";
import { getDevs } from "../../utils";
import Parser from "rss-parser";
import ogs from "open-graph-scraper";
import type { APIRoute } from "astro";
import { z } from "zod";
import { generateFeed } from "../../utils/rss";

export const prerender = false;

const kv = createClient({
  url: import.meta.env.KV_REST_API_URL,
  token: import.meta.env.KV_REST_API_TOKEN,
});

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();

  const result = z
    .object({
      secret: z.string().min(1),
    })
    .safeParse(body);

  if (!result.success) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (result.data.secret !== import.meta.env.CRON_SECRET) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const feed = await generateFeed();

  const response = await kv.set("posts", feed);

  const now = Date.now();
  return new Response(JSON.stringify({ response, now }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
