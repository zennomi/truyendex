import useSWR from "swr/immutable";
import { MangadexApi } from "@/api";
import { Tag, TagResponse } from "@/types/mangadex";

export default function useTags() {
  const { data, isLoading, error } = useSWR("tags", () =>
    MangadexApi.Manga.getMangaTag(),
  );

  let tags: Tag[] = [];
  const successData = data && data.data && (data.data as TagResponse).data;
  if (successData) {
    tags = successData;
  }
  return { tags, isLoading, error };
}
