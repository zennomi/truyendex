import { DateUtils } from "./date";
import { ErrorHandlerUtils } from "./error";
import { MangaDexUtils } from "./mangadex";
import { NumberUtils } from "./number";
import { TanamoeUtils } from "./tanamoe";
import { UrlUtils } from "./url";

export class Utils {
  static Mangadex = new MangaDexUtils();
  static Date = new DateUtils();
  static Url = new UrlUtils();
  static Number = new NumberUtils();
  static Error = new ErrorHandlerUtils();
  static Tanamoe = new TanamoeUtils();
}
