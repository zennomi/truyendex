import { MangadexApi } from "@/api";
import { LocalizedString } from "@/types/mangadex";
import { Chapter, ExtendManga, Relationship } from "@/types/mangadex";
import axios from "axios";
import { ReadonlyURLSearchParams } from "next/navigation";

const defaultImage = "/images/truyendex-loading.jpg";

export class MangaDexUtils {
  axiosInstance = axios.create({
    baseURL: "https://api.mangadex.org",
    timeout: 10000,
  });

  transLocalizedStr(localizedString: LocalizedString) {
    if (!localizedString) return "";
    return localizedString.vi || localizedString.en || "";
  }

  getMangaTitle(manga: ExtendManga | null | undefined) {
    if (!manga) return "";
    return (
      manga.attributes.altTitles.find((t) => t["vi"])?.["vi"] ||
      manga.attributes.title?.["en"] ||
      Object.values(manga.attributes.title)?.[0] ||
      "No title"
    );
  }

  getMangaAltTitles(manga: ExtendManga | null | undefined) {
    if (!manga) return [];
    return manga.attributes.altTitles
      .filter((aT) => aT["ja"] || aT["ja-ro"] || aT["en"])
      .map((aT) => Object.values(aT)[0]);
  }

  getOriginalMangaTitle(manga: ExtendManga | null | undefined) {
    if (!manga) return "";
    const originalLanguage = manga.attributes.originalLanguage || "ja";
    return (
      manga.attributes.altTitles.find((t) => t[originalLanguage])?.[
        originalLanguage
      ] ||
      manga.attributes.title?.["ja-ro"] ||
      ""
    );
  }

  getChapterTitle(chapter: Chapter | null) {
    if (!chapter) return "";
    if (chapter.attributes.title)
      return (
        (chapter.attributes.volume !== null
          ? `T${chapter.attributes.volume} `
          : "") +
        (chapter.attributes.chapter !== null
          ? `C${chapter.attributes.chapter} `
          : "") +
        chapter.attributes.title
      );
    if (chapter.attributes.volume) {
      if (chapter.attributes.chapter) {
        return `Chương ${chapter.attributes.chapter} Tập ${chapter.attributes.volume}`;
      }
      return `Oneshot Tập ${chapter.attributes.volume}`;
    }
    if (chapter.attributes.chapter)
      return `Chương ${chapter.attributes.chapter}`;
    return "Oneshot";
  }

  normalizeParams(
    params: ReadonlyURLSearchParams,
  ): MangadexApi.Manga.GetSearchMangaRequestOptions {
    const result: MangadexApi.Manga.GetSearchMangaRequestOptions = {};
    const limit = params.get("limit");
    result.limit = limit ? parseInt(limit) : 24;

    const offset = params.get("offset");
    result.offset = offset ? parseInt(offset) : 0;

    if (params.getAll("authors").length > 0) {
      result.authors = params.getAll("authors");
    }
    if (params.getAll("artists").length > 0) {
      result.artists = params.getAll("artists");
    }
    if (params.getAll("includedTags").length > 0) {
      result.includedTags = params.getAll("includedTags");
    }
    if (params.getAll("excludedTags").length > 0) {
      result.excludedTags = params.getAll("excludedTags");
    }
    if (params.getAll("excludedTags").length > 0) {
      result.excludedTags = params.getAll("excludedTags");
    }
    if (params.getAll("originalLanguage").length > 0) {
      result.originalLanguage = params.getAll("originalLanguage");
    }
    if (params.getAll("publicationDemographic").length > 0) {
      result.publicationDemographic = params.getAll(
        "publicationDemographic",
      ) as MangadexApi.Static.MangaPublicationDemographic[];
    } else {
      result.publicationDemographic = [];
    }
    if (params.getAll("contentRating").length > 0) {
      result.contentRating = params.getAll(
        "contentRating",
      ) as MangadexApi.Static.MangaContentRating[];
    } else {
      result.contentRating = [];
    }
    if (params.getAll("status").length > 0) {
      result.status = params.getAll(
        "status",
      ) as MangadexApi.Static.MangaPublicationStatus[];
    } else {
      result.status = [];
    }
    if (params.get("title")) {
      result.title = params.get("title")!;
    }
    const availableTranslatedLanguage = params.getAll(
      "availableTranslatedLanguage",
    );
    result.availableTranslatedLanguage =
      availableTranslatedLanguage.length > 0
        ? availableTranslatedLanguage
        : ["vi"];
    const includedTagsMode = params.get("includedTagsMode");
    if (includedTagsMode) {
      result.includedTagsMode = includedTagsMode === "AND" ? "AND" : "OR";
    }
    const excludedTagsMode = params.get("excludedTagsMode");
    if (excludedTagsMode) {
      result.excludedTagsMode = excludedTagsMode === "AND" ? "AND" : "OR";
    }
    // order
    result.order = {};
    if (params.get("order[latestUploadedChapter]")) {
      result.order.latestUploadedChapter = params.get(
        "order[latestUploadedChapter]",
      ) as MangadexApi.Static.Order;
    }
    if (params.get("order[title]")) {
      result.order.title = params.get(
        "order[title]",
      ) as MangadexApi.Static.Order;
    }
    if (params.get("order[createdAt]")) {
      result.order.createdAt = params.get(
        "order[createdAt]",
      ) as MangadexApi.Static.Order;
    }
    if (params.get("order[followedCount]")) {
      result.order.followedCount = params.get(
        "order[followedCount]",
      ) as MangadexApi.Static.Order;
    }
    if (params.get("order[relevance]")) {
      result.order.relevance = params.get(
        "order[relevance]",
      ) as MangadexApi.Static.Order;
    }
    if (params.get("order[rating]")) {
      result.order.rating = params.get(
        "order[rating]",
      ) as MangadexApi.Static.Order;
    }

    return result;
  }

  getCoverArt(manga: ExtendManga | undefined) {
    if (!manga) return defaultImage;
    if (manga.cover_art?.attributes) {
      return `https://mangadex.org/covers/${manga.id}/${manga.cover_art.attributes.fileName}.256.jpg`;
    }
    return defaultImage;
  }

  extendRelationship(
    object: Record<string, any> & { relationships: Relationship[] },
  ) {
    for (const rela of object.relationships) {
      object[rela.type] = rela;
    }
    return object;
  }

  extractRelationship(relationships: Relationship[], type: string) {
    return relationships.find((r) => r.type === type) || null;
  }

  translateStatus(status: string) {
    switch (status) {
      case "cancelled":
        return "Bị huỷ";
      case "completed":
        return "Đã kết thúc";
      case "hiatus":
        return "Tạm ngưng";
      default:
        return "Đang tiến hành";
    }
  }

  translateContentRating(rating: string) {
    switch (rating) {
      case "suggestive":
        return "Hơi hơi";
      case "erotica":
        return "Yesss";
      case "pornographic":
        return "Bùng lổ";
      default:
        return "Không";
    }
  }
}
