import { createClient } from "@vercel/kv";
import { getDevs } from "../../utils";
import Parser from "rss-parser";
import ogs from "open-graph-scraper";
import type { APIRoute } from "astro";

export type Post = {
  title: string | undefined;
  description: string | undefined;
  link: string | undefined;
  cover: string | undefined;
  date: string | undefined;
  author: {
    name: string;
    image: string;
  };
};

export const prerender = false;

const kv = createClient({
  url: import.meta.env.KV_REST_API_URL,
  token: import.meta.env.KV_REST_API_TOKEN,
});

export const GET: APIRoute = async ({ params, request }) => {
  if (
    request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let parser = new Parser();
  const devs = getDevs();
  const posts: Post[] = (
    await Promise.all(
      devs.map(async (dev) => {
        if (dev.rss) {
          let feed = await parser.parseURL(dev.rss);

          return await Promise.all(
            feed.items.map(async (item) => {
              const imageUrl = item.enclosure
                ? item.enclosure.url
                : (await ogs({ url: item.link })).result.ogImage?.at(0)?.url;
              return {
                title: item.title,
                description: item.content,
                link: item.link,
                cover: imageUrl,
                date: item.pubDate,
                author: {
                  name: dev.name,
                  image: dev.image,
                },
              };
            })
          );
        }
        return [];
      })
    )
  )
    .flat()
    .sort(
      (a, b) =>
        (new Date(b.date as string) as unknown as number) -
        (new Date(a.date as string) as unknown as number)
    );

  const response = await kv.set("posts", posts);

  const now = Date.now();
  return new Response(JSON.stringify({ response, now }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
