import { LocalizedString } from "@/types/mangadex"

export * from "./attribute"
export * from "./translate"
export * from "./relationship"
export * from "./params"

export function transLocalizedStr(localizedString: LocalizedString) {
    if (!localizedString) return ""
    return localizedString.vi || localizedString.en || ""
}