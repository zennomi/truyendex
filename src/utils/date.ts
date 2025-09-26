import { format, formatDistance as dateFnsFormatDistance } from "date-fns";
import vi from "date-fns/locale/vi";

export class DateUtils {
  formatNowDistance(
    date: Date | number,
    options?: {
      addSuffix?: boolean;
      unit?: "second" | "minute" | "hour" | "day" | "month" | "year";
      roundingMethod?: "floor" | "ceil" | "round";
      locale?: Locale;
    },
  ): string {
    return dateFnsFormatDistance(date, new Date(), { locale: vi, ...options });
  }

  formatDateTime(date: Date | number, options?: { locale?: Locale }) {
    return format(date, "dd/MM/yyyy HH:mm", options);
  }

  formatDate(date: Date | number, options?: { locale?: Locale }) {
    return format(date, "dd/MM/yyyy", options);
  }
}
