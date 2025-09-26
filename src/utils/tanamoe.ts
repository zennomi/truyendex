import { TanamoeUpcomingBook } from "@/types";

export class TanamoeUtils {
  getCoverImage = (path: string | undefined) => {
    return path
      ? `https://image.tana.moe/${path}`
      : "/images/truyendex-loading.jpg";
  };

  getOriginalTitleUrl = (title: TanamoeUpcomingBook) => {
    return `https://tana.moe/title/${title.expand.publication.expand.release.expand.title.slug}/${title.expand.publication.expand.release.id}/${title.id}`;
  };
}
