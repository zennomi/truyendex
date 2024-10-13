import { LocalizedString } from "../types/mangadex";

export default function transLocalizedStr(localizedString: LocalizedString) {
    if (!localizedString) return ""
    return localizedString.vi || localizedString.en || ""
}