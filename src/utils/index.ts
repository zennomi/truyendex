import { DateUtils } from "./date";
import { MangaDexUtils } from "./mangadex";
import { NumberUtils } from "./number";
import { UrlUtils } from "./url";

export class Utils {
  static Mangadex = new MangaDexUtils();
  static Date = new DateUtils();
  static Url = new UrlUtils();
  static Number = new NumberUtils();
}
