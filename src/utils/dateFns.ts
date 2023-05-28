import { format, formatDistance as dateFnsFormatDistance } from "date-fns"
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

export function formatDateTime(date: Date | number, options?: { locale?: Locale }) {
    return format(date, "dd/MM/yyyy HH:mm", options)
}