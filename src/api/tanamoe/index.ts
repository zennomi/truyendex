import { TanamoeTitle, TanamoeUpcomingBook } from "@/types";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://pb.tana.moe");

export const getUpcomingBooks = async (params: {
  page: number;
  perPage?: number;
}) => {
  const response = await pb
    .collection("books")
    .getList<TanamoeUpcomingBook>(params.page, params.perPage || 12, {
      filter: `publication.release.title.format = 'tt6995wq46wqxkr'`,
      sort: "-publishDate, +publication.release.title.name, +publication.volume, +edition",
      expand:
        "publication.release.title, assets_via_book, publication.defaultBook.assets_via_book",
    });
  return response;
};

export const getTitle = async (titleId: string) => {
  return await pb.collection("titles").getOne<TanamoeTitle>(titleId, {
    expand:
      "defaultRelease, defaultRelease.front, demographic, defaultRelease.publisher, genres",
  });
};
