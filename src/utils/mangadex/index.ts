import { LocalizedString } from "@/types/mangadex";

export * from "./attribute";
export * from "./translate";
export * from "./relationship";
export * from "./params";

export function transLocalizedStr(localizedString: LocalizedString) {
  if (!localizedString) return "";
  return localizedString.vi || localizedString.en || "";
}

export const formatViews = (views: number) => {
  if (views < 1e3) return views;
  if (views < 1e6) return `${(views / 1e3).toFixed(1)}k`;
  return `${(views / 1e6).toFixed(1)}m`;
};
