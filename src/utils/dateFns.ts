import dateFnsFormatDistance from "date-fns/formatDistance"
import vi from "date-fns/locale/vi"

export function formatNowDistance(date: Date | number,
    options?: {
        addSuffix?: boolean
        unit?: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'
        roundingMethod?: 'floor' | 'ceil' | 'round'
        locale?: Locale
    }
): string {
    return dateFnsFormatDistance(date, new Date(), { locale: vi, ...options })
}