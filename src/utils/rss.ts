import Parser from "rss-parser";
import ogs from "open-graph-scraper";
import { getDevs } from "../utils/devsInfo";

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

let parser = new Parser();
const devs = getDevs();

export const generateFeed: () => Promise<Post[]> = async () =>
  (
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
