import { MangadexApi } from "@/api";

export default function ExternalLinks({
  links,
  mangaId,
}: {
  links: MangadexApi.Static.Links | null;
  mangaId: string;
}) {
  let parsedLinks = links
    ? Object.entries(links).map(([type, id]) => {
        switch (type) {
          case "al":
            return {
              url: `https://anilist.co/manga/${id}`,
              name: `Anilist`,
            };
          case "ap":
            return {
              url: `https://www.anime-planet.com/manga/${id}`,
              name: `AnimePlanet`,
            };
          case "bw":
            return {
              url: `https://bookwalker.jp/${id}`,
              name: `Bookwalker`,
            };
          case "mu":
            return {
              url: `https://www.mangaupdates.com/series.html?id=${id}`,
              name: `MangaUpdates`,
            };
          case "kt":
            if (typeof id === "number")
              return {
                url: `https://kitsu.io/api/edge/manga/${id}`,
                name: `Kitsu`,
              };
            else
              return {
                url: `https://kitsu.io/api/edge/manga?filter[slug]=${id}`,
                name: `Kitsu`,
              };
          case "nu":
            return {
              url: `https://www.novelupdates.com/series/${id}`,
              name: `NovelUpdates`,
            };
          case "amz":
            return {
              url: `${id}`,
              name: `Amazon`,
            };
          case "ebj":
            return {
              url: `${id}`,
              name: `EbookJapan`,
            };
          case "mal":
            return {
              url: `https://myanimelist.net/manga/${id}`,
              name: `MyAnimeList`,
            };
          case "cdj":
            return {
              url: `${id}`,
              name: `CDJapan`,
            };
          case "raw":
            return {
              url: `${id}`,
              name: `Raw`,
            };
          case "engtl":
            return {
              url: `${id}`,
              name: `Eng Offcial`,
            };
        }
      })
    : [];

  parsedLinks = [
    { name: "MangaDex", url: `https://mangadex.org/title/${mangaId}` },
    ...parsedLinks.filter((l) => !!l),
  ];
  return (
    <p className="pl-10 lg:pl-0">
      {parsedLinks.map((i, idx) => {
        if (!i) return null;
        return (
          <>
            {idx !== 0 && ", "}
            <a
              key={idx}
              href={i.url}
              target="_blank"
              className="text-web-title transition hover:text-web-titleLighter"
            >
              {i.name}
            </a>
          </>
        );
      })}
    </p>
  );
}
