/*******************
 * ENUM DEFINITIONS
 *******************/

/** Enum for manga reading status */
export enum MangaReadingStatus {
  READING = "reading",
  ON_HOLD = "on_hold",
  PLAN_TO_READ = "plan_to_read",
  DROPPED = "dropped",
  RE_READING = "re_reading",
  COMPLETED = "completed",
}

/** Enum for manga content rating */
export enum MangaContentRating {
  SAFE = "safe",
  SUGGESTIVE = "suggestive",
  EROTICA = "erotica",
  PORNOGRAPHIC = "pornographic",
}

/** Enum for manga publication demographic */
export enum MangaPublicationDemographic {
  NONE = "none",
  SHOUNEN = "shounen",
  SHOUJO = "shoujo",
  JOSEI = "josei",
  SEINEN = "seinen",
}

/** Enum for manga publication status */
export enum MangaPublicationStatus {
  COMPLETED = "completed",
  ONGOING = "ongoing",
  CANCELLED = "cancelled",
  HIATUS = "hiatus",
}

/** Enum for Mangadex manga state */
export enum MangadexMangaState {
  DRAFT = "draft",
  SUBMITTED = "submitted",
  PUBLISHED = "published",
  REJECTED = "rejected",
}

/** Enum for related manga type */
export enum RelatedMangaType {
  MONOCHROME = "monochrome",
  MAIN_STORY = "main_story",
  ADAPTED_FROM = "adapted_from",
  BASED_ON = "based_on",
  PREQUEL = "prequel",
  SIDE_STORY = "side_story",
  DOUJINSHI = "doujinshi",
  SAME_FRANCHISE = "same_franchise",
  SHARED_UNIVERSE = "shared_universe",
  SEQUEL = "sequel",
  SPIN_OFF = "spin_off",
  ALTERNATE_STORY = "alternate_story",
  ALTERNATE_VERSION = "alternate_version",
  PRESERIALIZATION = "preserialization",
  COLORED = "colored",
  SERIALIZATION = "serialization",
}

/** Enum for order to return items in */
export enum Order {
  ASC = "asc",
  DESC = "desc",
}

/** Enum for what relationship info to include in a search */
export enum Includes {
  MANGA = "manga",
  CHAPTER = "chapter",
  COVER_ART = "cover_art",
  AUTHOR = "author",
  ARTIST = "artist",
  SCANLATION_GROUP = "scanlation_group",
  TAG = "tag",
  USER = "user",
  CUSTOM_LIST = "custom_list",
  LEADER = "leader",
  MEMBER = "member",
}

/*******************
 * TYPE DEFINITIONS
 *******************/

/** Links object for manga object */
export type Links = {
  /**
   * anilist
   * ```console
   * https://anilist.co/manga/`{id}`
   * ```
   */
  al: string;

  /**
   * animeplanet
   * ```console
   * https://www.anime-planet.com/manga/`{slug}`
   * ```
   */
  ap: string;

  /**
   * bookwalker.jp
   * ```console
   * https://bookwalker.jp/`{slug}`
   * ```
   */
  bw: string;

  /**
   * mangaupdates
   * ```console
   * https://www.mangaupdates.com/series.html?id=`{id}`
   * ```
   */
  mu: string;

  /**
   * novelupdates
   * ```console
   * https://www.novelupdates.com/series/`{slug}`
   * ```
   */
  nu: string;

  /**
   * kitsu.io
   *
   * If integer, use id version of the URL, otherwise use slug one
   *
   * ```console
   * https://kitsu.io/api/edge/manga/`{id}` or
   * https://kitsu.io/api/edge/manga?filter[slug]=`{slug}`
   * ```
   */
  kt: string;
  /** amazon */
  amz: string;
  /** ebookjapan */
  ebj: string;

  /**
   * myanimelist
   * ```console
   * https://myanimelist.net/manga/{id}
   * ```
   */
  mal: string;
  /** CDJapan */
  cdj: string;
  /** Stored as full URL, untranslated stuff URL (original language) */
  raw: string;
  /** Stored as full URL, official english licenced URL */
  engtl: string;
};
