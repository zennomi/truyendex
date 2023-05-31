import { LocalizedString } from "../api/schema";

export default function transLocalizedStr(localizedString: LocalizedString) {
    if (!localizedString) return ""
    return localizedString.vi || localizedString.en || ""
}