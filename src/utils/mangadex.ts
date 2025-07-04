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

  getCoverArt(manga: ExtendManga | undefined, size: 256 | 512 = 256) {
    if (!manga) return defaultImage;
    if (manga.cover_art?.attributes) {
      return `https://resizer.f-ck.me/?url=https://mangadex.org/covers/${manga.id}/${manga.cover_art.attributes.fileName}.${size}.jpg`;
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
      case "safe":
        return "An toàn";
      case "suggestive":
        return "16+";
      case "erotica":
        return "18+";
      case "pornographic":
        return "18+++";
      default:
        return "Không";
    }
  }

  translateISOLanguage(isoLanguage: string) {
    switch (isoLanguage) {
      case "ja":
        return "Nhật Bản";
      case "en":
        return "Tiếng Anh";
      case "vi":
        return "Việt Nam";
      case "ko":
        return "Hàn Quốc";
      case "zh":
        return "Trung Quốc";
      case "fr":
        return "Pháp";
      case "de":
        return "Đức";
      case "es":
        return "Tây Ban Nha";
      case "it":
        return "Ý";
      case "ru":
        return "Nga";
      case "pt":
        return "Bồ Đào Nha";
      case "id":
        return "Indonesia";
      case "th":
        return "Thái Lan";
      case "ms":
        return "Mã Lai";
      case "hi":
        return "Hindi";
      case "ar":
        return "Ả Rập";
      case "bn":
        return "Bengali";
      case "pa":
        return "Punjabi";
      case "jv":
        return "Javanese";
      case "te":
        return "Telugu";
      case "mr":
        return "Marathi";
      case "ta":
        return "Tamil";
      case "ur":
        return "Urdu";
      case "gu":
        return "Gujarati";
      case "kn":
        return "Kannada";
      case "ml":
        return "Malayalam";
      case "or":
        return "Odia";
      case "fa":
        return "Persian";
      case "tr":
        return "Turkish";
      case "pl":
        return "Polish";
      case "uk":
        return "Ukrainian";
      case "ro":
        return "Romanian";
      case "nl":
        return "Dutch";
      case "sv":
        return "Swedish";
      case "fi":
        return "Finnish";
      case "no":
        return "Norwegian";
      case "da":
        return "Danish";
      case "hu":
        return "Hungarian";
      case "cs":
        return "Czech";
      case "sk":
        return "Slovak";
      case "bg":
        return "Bulgarian";
      case "sr":
        return "Serbian";
      case "hr":
        return "Croatian";
      case "lt":
        return "Lithuanian";
      case "lv":
        return "Latvian";
      case "et":
        return "Estonian";
      case "sl":
        return "Slovenian";
      case "he":
        return "Hebrew";
      case "el":
        return "Greek";
      case "hy":
        return "Armenian";
      case "ka":
        return "Georgian";
      case "az":
        return "Azerbaijani";
      case "kk":
        return "Kazakh";
      case "uz":
        return "Uzbek";
      case "mn":
        return "Mongolian";
      case "ne":
        return "Nepali";
      case "si":
        return "Sinhala";
      case "my":
        return "Burmese";
      case "km":
        return "Khmer";
      case "lo":
        return "Lao";
      case "am":
        return "Amharic";
      case "sw":
        return "Swahili";
      case "yo":
        return "Yoruba";
      case "ig":
        return "Igbo";
      case "zu":
        return "Zulu";
      case "xh":
        return "Xhosa";
      case "af":
        return "Afrikaans";
      case "st":
        return "Sesotho";
      case "tn":
        return "Tswana";
      case "ts":
        return "Tsonga";
      case "ve":
        return "Venda";
      case "nr":
        return "Ndebele";
      case "ss":
        return "Swati";
      case "tn":
        return "Tswana";
      case "ts":
        return "Tsonga";
      case "ve":
        return "Venda";
      case "nr":
        return "Ndebele";
      case "ss":
        return "Swati";
      default:
        return isoLanguage;
    }
  }

  translateTagGroup(format: string) {
    // "content" | "format" | "genre" | "theme"
    switch (format) {
      case "content":
        return "Cảnh báo nội dung";
      case "format":
        return "Định dạng";
      case "genre":
        return "Thể loại";
      case "theme":
        return "Chủ đề";
      default:
        return format;
    }
  }
}
