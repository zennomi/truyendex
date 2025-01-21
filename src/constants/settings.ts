import { SettingsState } from "@/types";

export class SettingsConstants {
  readonly COOKIE_KEY = "truyendex-settings";
  readonly DEFAULT_SETTINGS: SettingsState = {
    filteredLanguages: ["vi"],
    originLanguages: [],
    filteredContent: ["safe", "suggestive", "erotica"],
    dataSaver: false,
  };
}
